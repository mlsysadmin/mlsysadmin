'use strict'
const DayJS = require('dayjs');

const Sequelize = require('../../../config/_db/mlbrokerage.db');
const { 
    CreatePropertyType, 
    FindListingType, 
    CreateUnitDetails, 
    CreateLocation, 
    CreateAmenities, 
    CreateCustomAmenities, 
    CreateCustomInclusions, 
    CreatePhotos,
    CreateApproval, 
    FindApprover, 
    AddEscalations, 
    FindApprovalsByMasterId, 
    FindAllListingBySeller, 
    CreatePropertyListing,
    CreateMasterPropertyList,
    CreateEscalations
} = require('../../../streamline/listing.datastream');
const ListingIdGeneratorHelper = require("../../../utils/_helper/ListingIdGenerator.helper");
const SuccessFormatter = require('../../../utils/_helper/SuccessFormatter.helper');
const SuccessLoggerHelper = require('../../../utils/_helper/SuccessLogger.helper');
const DataResponseHandler = require('../../../utils/_helper/DataResponseHandler.helper');
const { Op } = require('sequelize');

const domain = process.env.COOKIE_DOMAIN;

module.exports = {
    GetAllSellerListings: async (req, res, next) => {
        try {

            const seller_id = req.params.seller_id;
            let master_ids = [];

            const GetListings = await Sequelize.transaction(async (transaction) => {

                const getAllListing = await FindAllListingBySeller(seller_id, transaction);

                const get_master_id = getAllListing.map((listing, i) => {

                    const master_id = listing.master_property_id;

                    return {
                        master_property_id: master_id
                    }
                    
                });

                const approvals_field = {
                    [Op.or]: get_master_id
                }

                const approvals = await FindApprovalsByMasterId(approvals_field, transaction);
                
                const listings = [];
                
                getAllListing.forEach((g) => {
                    let approval = [];
                    approvals.forEach((a) => {
                        if (a.master_property_id === g.master_property_id) {
                            return approval.push(a)
                        }
                        return;
                    })

                    return listings.push({
                        listing: g, approval
                    })
                })

                master_ids = get_master_id;

                return listings

            })

            const listings = DataResponseHandler(
                GetListings,
                "LISTING_RETRIEVED",
                200,
                true,
                "SUCCESS"
            )



            const listings_log = DataResponseHandler(
                {master_ids, seller_id},
                "LISTING_RETRIEVED",
                200,
                true,
                "SUCCESS"
            )

            const success = SuccessFormatter(listings, 200, "Retrieved Successfully");

            SuccessLoggerHelper(req, listings_log);

            // const cookieOptions = {
            //     expires: new Date(Date.now() + 300000),
            //     maxAge: 300000, // 5 min
            //     path: '/',
            //     httOnly: true,
            //     secure: true,
            //     sameSite: true,
            //     domain,
            //     signed:true
            //     // expires: new Date(Date.now() + 900000)
            // }

            // res.cookie('listings', GetListings, cookieOptions)

            res.status(200).send(success);

        } catch (error) {
            next(error);
        }
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
                listing_type,
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

                const property_listing_fields = {
                    listing_id, seller_id, property_id,property_type_id,
                    listing_type_id, unit_detail_id, location_id,
                    amenity_id, 
                    ...description,
                    listing_status
                };

                const { property_listing_id } = await CreatePropertyListing(property_listing_fields, transaction);

                const add_master_property_list = await CreateMasterPropertyList({
                    property_listing_id, seller_id, property_id, listing_status, property_status
                }, transaction);

                const add_photos = upload_photos.photos.map((photos, i) => {
                    return {
                        listing_id, photo: photos.photo, upload_date, property_listing_id
                    }
                })

                await CreatePhotos(add_photos, transaction);

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
    DraftPropertyListing: async (req, res, next) => {
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
                listing_type,
            } = req.body.payload;

            const {
                indoor_features, outdoor_features, feature_name, inclusion_name
            } = amenities

            const AddListing = await Sequelize.transaction(async (transaction) => {

                const listing_id = ListingIdGeneratorHelper();
                const listing_status = "DRAFT";

                const { property_type_id } = await CreatePropertyType(property_details, transaction);
                console.log(listing_type);
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

                const property_listing_fields = {
                    listing_id, seller_id, property_id, property_type_id,
                    listing_type_id, unit_detail_id, location_id,
                    amenity_id, 
                    ...description,
                    listing_status
                };

                const property_listing = await CreatePropertyListing(property_listing_fields, transaction);

                const property_listing_id = property_listing.property_listing_id

                const add_photos = upload_photos.photos.map((photos, i) => {
                    return {
                        listing_id, photo: photos.photo, upload_date, property_listing_id
                    }
                })

                await CreatePhotos(add_photos, transaction);

                return property_listing;
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
    
}
