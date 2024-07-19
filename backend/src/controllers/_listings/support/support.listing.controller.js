'use strict'


require('dotenv').config();
const DayJS = require('dayjs');
const { Op } = require('sequelize');

const Sequelize = require('../../../config/_db/mlbrokerage.db');
const {
    FindListingType,
    FindListingByListingId,
    FindApprovalsPropertyListingId,
    FindApprover,
    UpdateApproval,
    FindForApprovalByListingId,
    UpdateApprovalLevel,
    FindOneApprover,
    FindAllListingForApprovalByApprover,
    CreateMasterPropertyList,
} = require('../../../streamline/listing.datastream');
const SuccessFormatter = require('../../../utils/_helper/SuccessFormatter.helper');
const SuccessLoggerHelper = require('../../../utils/_helper/SuccessLogger.helper');
const DataResponseHandler = require('../../../utils/_helper/DataResponseHandler.helper');

const { ModifyListing, AddPhotos } = require('../../helper/listing.helper');

module.exports = {
    EditPropertyListing: async (req, res, next) => {
        try {

            const {
                property_details,
                unit_details,
                location,
                description,
                upload_photos,
                amenities,
                seller_id,
                property_id,
                listing_type,
            } = req.body.payload;

            const {
                indoor_features, outdoor_features, feature_name, inclusion_name
            } = amenities;

            const listing_id = req.query.listing_id;

            const EditListing = await Sequelize.transaction(async (transaction) => {

                const type = await FindListingType(listing_type, transaction);

                const property_listing_fields = {
                    property_id,
                    ...description,
                    property_type: {
                        ...property_details
                    },
                    listing_type_id: type.listing_type_id,
                    unit_details: {
                        ...unit_details
                    },
                    location: {
                        ...location
                    },
                    amenities: {
                        indoor_features: JSON.stringify(indoor_features),
                        outdoor_features: JSON.stringify(outdoor_features),
                        custom_amenities: {
                            feature_name: JSON.stringify(feature_name)
                        },
                        custom_inclusion: {
                            inclusion_name: JSON.stringify(inclusion_name)
                        }
                    },
                    photos: {
                        photo: JSON.stringify(upload_photos),
                    }

                };

                const property_listing = await FindListingByListingId(listing_id, transaction);

                const ids = {
                    listing_id,
                    property_type_id: property_listing.property_type_id,
                    unit_detail_id: property_listing.unit_detail_id,
                    location_id: property_listing.location_id,
                    custom_amenity_id: property_listing.amenities.custom_amenity_id,
                    custom_inclusion_id: property_listing.amenities.custom_inclusion_id,
                    amenity_id: property_listing.amenity_id,
                    property_photos_id: property_listing.property_photos_id,
                }

                await ModifyListing(property_listing_fields, ids, transaction);

                const updated_property_listing = await FindListingByListingId(listing_id, transaction);

                const approvals = await FindApprovalsPropertyListingId(
                    updated_property_listing.property_listing_id, transaction
                )

                return {
                    listing: updated_property_listing,
                    approvals
                };

            })

            const listing = DataResponseHandler(
                EditListing,
                "LISTING_UPDATED",
                200,
                true,
                "SUCCESS"
            );

            const success = SuccessFormatter(listing, 200, "Listing updated successfully");

            SuccessLoggerHelper(req, listing);

            res.status(200).send(success);

        } catch (error) {
            next(error);
        }
    },

    ListingApprovalEscalation: async (req, res, next) => {
        try {

            const listing_update = req.body.payload;

            const Escalation = await Sequelize.transaction(async (transaction) => {

                const bulkUpdateApproval = listing_update.map(async (update, i) => {

                    const get_listing = await FindForApprovalByListingId(update.listing_id, transaction);

                    const get_approver = await FindOneApprover({ email: update.approver_email }, transaction);

                    let current_level = get_listing.current_level;

                    if (current_level <= get_listing.level && get_listing.listing_status === 'PENDING') {

                        if (current_level === get_approver.level) {

                            const approval_date = DayJS(new Date()).format('YYYY-MM-DD HH:mm:ss');

                            const property_listing_id = get_listing.property_listing_id;

                            update.approval_status.toUpperCase();

                            const approval = {
                                property_listing_id,
                                approver_id: get_approver.approver_id,
                                approval_status: update.approval_status,
                                remarks: update.remarks,
                                approval_date
                            }

                            await UpdateApproval(approval, transaction);

                            if (current_level === get_listing.level || update.approval_status === "DENIED") {

                                const listing_fields = {
                                    current_level,
                                    listing_status: update.approval_status,
                                }

                                await UpdateApprovalLevel(update.listing_id, listing_fields, transaction);

                                if (update.approval_status === "APPROVED") {

                                    const master_fields = {
                                        property_listing_id: get_listing.property_listing_id, 
                                        seller: get_listing.seller, 
                                        property_id: get_listing.property_id,
                                        listing_status: update.approval_status, 
                                        property_status: 'ACTIVE'
                                    }
                                    
                                    await CreateMasterPropertyList(master_fields, transaction);
                                }


                            } else {
                                current_level++;

                                const listing_fields = {
                                    current_level,
                                }

                                await UpdateApprovalLevel(update.listing_id, listing_fields, transaction);
                            }

                            const response = {
                                payload: update,
                                current_level,
                                property_listing_id,
                                listing_id: update.listing_id,
                                approval_status: update.approval_status,
                            }

                            return response;

                        }
                        else {
                            const response = {
                                payload: update,
                                current_level,
                                listing_id: update.listing_id,
                                approval_status: update.approval_status,
                                approver_level: get_approver.level
                            }

                            throw DataResponseHandler(
                                response,
                                "APPROVER_LEVEL_NOT_EQUAL_TO_CURRENT_LEVEL",
                                400,
                                false,
                                "Approver's level is not equal to the current level of listing approval."
                            )
                        }

                    } else {
                        throw DataResponseHandler(
                            req.body.payload,
                            "APPROVAL_LIMIT",
                            400,
                            false,
                            "Approval is already at the Highest level."
                        )
                    }

                });

                return await Promise.all(bulkUpdateApproval);
            });

            const response = DataResponseHandler(
                Escalation,
                "SUCCESS_APPROVAL",
                200,
                true,
                "SUCCESS"
            );

            const success = SuccessFormatter(response, 200, `Successful Approval`);
    
            SuccessLoggerHelper(success, response);

            res.send(success);

        } catch (error) {
            next(error);
        }
    },

    GetForApprovalListingByApprover: async (req, res, next) => {
        try {

            const payload = req.query.payload;
            const approval_status = "PENDING";

            const GetAllListing = await Sequelize.transaction(async (transaction) => {

                const get_all_listing = await FindAllListingForApprovalByApprover({ ...payload, approval_status }, transaction);

                return get_all_listing;

            });
            let data;
            let message;

            console.log(GetAllListing);

            if (GetAllListing.length === 0) {

                data = DataResponseHandler(
                    GetAllListing,
                    "NO_LISTING_FOUND_FOR_APPROVER",
                    200,
                    false,
                    "No for approval listing available."
                );
                message = "No for approval listing available.";

            } else {

                data = DataResponseHandler(
                    GetAllListing,
                    "PENDING_LISTINGS_FOUND",
                    200,
                    false,
                    "For approval listing retrieved."
                );

                message = "For approval listing retrieved.";

            }

            const success = SuccessFormatter(data, 200, message);
    
            SuccessLoggerHelper(success, data);

            res.send(success);

        } catch (error) {
            next(error)
        }
    }
}