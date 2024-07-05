'use strict'
const DayJS = require('dayjs');

const Sequelize = require('../../config/_db/mlbrokerage.db');
const { 
    CreatePropertyType, 
    FindListingType, 
    CreateUnitDetails, 
    CreateLocation, 
    CreateAmenities, 
    CreateCustomAmenities, 
    CreateCustomInclusions, 
    CreatePhotos, 
    CreatePropertyListing, 
    CreateMasterPropertyList, 
    CreateApproval, 
    FindApprover, 
    CreateEscalations, 
    FindApprovalsByMasterId, 
    FindListingDetailsById 
} = require('../../streamline/listing.datastream');
const ListingIdGeneratorHelper = require("../../utils/_helper/ListingIdGenerator.helper");
const SuccessFormatter = require('../../utils/_helper/SuccessFormatter.helper');
const SuccessLoggerHelper = require('../../utils/_helper/SuccessLogger.helper');
const DataResponseHandler = require('../../utils/_helper/DataResponseHandler.helper');
const { Op } = require('sequelize');

module.exports = {
    GetAllListing: (req, res) => {
        // console.log("REQUEST: ", req);
        res.send("HEHE");
    },
    AddPropertyListing: async (req, res, next) => {
        try {

            const upload_date = DayJS(new Date()).format('YYYY-MM-DD HH:mm:ss');
            const approval_levels = 2;

            const {
                property_details,
                unit_details,
                location,
                description,
                upload_photos,
                amenities,
                seller_id,
                property_id,
                listing_type
            } = req.body.payload;

            const {
                indoor_features, outdoor_features, feature_name, inclusion_name
            } = amenities

            const AddListing = await Sequelize.transaction(async (transaction) => {

                const listing_id = ListingIdGeneratorHelper();
                const listing_status = "OPEN";
                const property_status = "ACTIVE";

                const { property_type_id } = await CreatePropertyType(property_details, transaction);
                const listing_type_id = await FindListingType(listing_type, transaction);
                const { unit_detail_id } = await CreateUnitDetails(unit_details, transaction);
                const { location_id } = await CreateLocation(location, transaction);
                const { custom_amenity_id } = await CreateCustomAmenities(amenities, transaction);
                const { custom_inclusion_id } = await CreateCustomInclusions(amenities, transaction);

                const add_amenities = {
                    indoor_features, outdoor_features,
                    custom_amenity_id, custom_inclusion_id
                };

                const { amenity_id } = await CreateAmenities(add_amenities, transaction);

                const add_photos = upload_photos.photos.map((photos, i) => {
                    return {
                        listing_id, photo: photos.photo, upload_date
                    }
                })

                await CreatePhotos(add_photos, transaction);

                const property_listing_fields = {
                    listing_id, seller_id, property_type_id,
                    listing_type_id, unit_detail_id, location_id,
                    amenity_id,
                    // property_photos_id, 
                    ...description,
                    listing_status
                };

                const { property_listing_id } = await CreatePropertyListing(property_listing_fields, transaction);

                const add_master_property_list = await CreateMasterPropertyList({
                    property_listing_id, seller_id, property_id, listing_status, property_status
                }, transaction);

                const approval_fields = {
                    master_property_id: add_master_property_list.master_property_id,
                    approval_status: "PENDING",
                    levels: approval_levels
                };

                const level = {
                    [Op.or]: [
                        {
                            level: 1
                        },
                        {
                            level: 2
                        }
                    ]
                }
                const { approval_id } = await CreateApproval(approval_fields, transaction);

                const get_approvers = await FindApprover(level, transaction);

                const escalations = get_approvers.map((approver, i) => {
                    return {
                        approver_id: approver.approver_id,
                        approval_id,
                        approval_status: "PENDING",
                        approved_at: null,
                        remarks: null
                    }
                })

                await CreateEscalations(escalations, transaction);

                return add_master_property_list;
            })

            const listing = DataResponseHandler(
                AddListing,
                "LISTING_CREATED",
                201,
                true,
                "SUCCESS"
            );

            const success = SuccessFormatter(listing, 201, "New listing was added");

            SuccessLoggerHelper(req, listing);

            res.status(201).send(success);

        } catch (error) {
            next(error);
        }
    },
    GetApproverByLevel: async (req, res, next) => {
        try {
            const AddListing = await Sequelize.transaction(async (transaction) => {

                const level = {
                    [Op.or]: [
                        {
                            level: 1
                        },
                        {
                            level: 2
                        }
                    ]
                }

                const GetApproverId = await FindApprover(level, transaction);

                return GetApproverId;
            });

            res.send(AddListing)

        } catch (error) {
            throw error;
        }
    },
    GetApproversByListing: async (req, res, next) => {
        try {

            const master_id = req.params.master_id;

            const AddListing = await Sequelize.transaction(async (transaction) => {

                const GetApproverId = await FindApprovalsByMasterId(master_id, transaction);

                return GetApproverId;
            });

            res.send(AddListing)

        } catch (error) {
            throw error;
        }
    },
    GetListingByMasterId: async (req, res, next) => {
        try {

            const master_id = req.params.payload;

            const GetListingDetails = await Sequelize.transaction(async (transaction) => {

                const get_listing_details = await FindListingDetailsById(master_id, transaction);

                return get_listing_details;
            });

            const listing = DataResponseHandler(
                GetListingDetails,
                "LISTING_RETRIEVED",
                200,
                true,
                "SUCCESS"
            );

            const success = SuccessFormatter(listing, 200, "Retrieved Successfully");

            SuccessLoggerHelper(req, listing);

            res.send(success)

        } catch (error) {
            throw error;
        }
    }
}
