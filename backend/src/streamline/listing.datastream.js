'use strict'

const { Op } = require('sequelize');
const Sequelize = require('../config/_db/mlbrokerage.db');
const { FeaturesLists, PropertyTypes, ListingTypes, UnitDetails, Location, CustomAmenities, CustomInclusions, Amenities, PropertyPhoto, PropertyListing, MasterPropertyList, Approvals, Approvers, User, Role } = require('../models/main.model');
const DataResponseHandler = require('../utils/_helper/DataResponseHandler.helper');
const Prefix = require('../models/Prefix');

module.exports = {
    CreatePropertyListing: async (property_fields, transaction) => {
        try {

            const {
                listing_id, seller, property_id, property_type_id,
                listing_type_id, unit_detail_id, location_id,
                amenity_id,
                property_photos_id, 
                title, description,
                listing_status
            } = property_fields;

            const add_property_listing = await PropertyListing.create(
                {
                    listing_id, seller, property_id, property_type_id,
                    listing_type_id, unit_detail_id, location_id,
                    amenity_id, title, description,
                    listing_status
                },
                { transaction }

            );

            return {
                property_listing_id: add_property_listing.property_listing_id
            };

        } catch (error) {
            throw error
        }
    },
    CreateMasterPropertyList: async (master_property_fields, transaction) => {
        try {

            const {
                property_listing_id, seller, property_id,
                listing_status, property_status
            } = master_property_fields;

            const add_masterproperty_listing = await MasterPropertyList.create(
                {
                    property_listing_id, seller, property_id,
                    listing_status, property_status
                },
                { transaction }

            );

            return add_masterproperty_listing;

        } catch (error) {
            throw error
        }
    },
    CreateApproval: async (approvals, transaction) => {
        try {

            const add_approval = await Approvals.bulkCreate(
                approvals,
                { transaction }

            );

            console.log("add_approval", add_approval);

            return add_approval;

        } catch (error) {
            throw error
        }
    },
    CreateListing: async (property_fields, transaction) => {
        try {

            const {
                listing_id,
                property_id,
                seller,
                title,
                description,
                listing_status,
                property_type,
                listing_type_id,
                unit_details,
                location,
                amenities,
                photos
            } = property_fields;

            const add_property_listing = await PropertyListing.findOrCreate(
                {
                    where: {
                        listing_id
                    },
                    defaults: {
                        listing_id,
                        property_id,
                        seller,
                        property_type: {
                            type: property_type.type,
                            subtype: property_type.subtype
                        },
                        listing_type_id,
                        unit_details: {
                            price: unit_details.price,
                            discounted_price: unit_details.discounted_price,
                            price_per_sqm: unit_details.price_per_sqm,
                            furnishing: unit_details.furnishing,
                            classification: unit_details.classification,
                            no_of_beds: unit_details.no_of_beds,
                            no_of_bathrooms: unit_details.no_of_bathrooms,
                            no_of_floors: unit_details.no_of_floors,
                            parking: unit_details.parking,
                            floor_area: unit_details.floor_area,
                            lot_area: unit_details.lot_area
                        },
                        location: {
                            subdivision: location.subdivision,
                            city: location.city,
                            province: location.province,
                            other: location.other,
                            zipcode: location.zipcode,
                            map_location: location.map_location
                        },
                        amenities: {
                            indoor_features: amenities.indoor_features,
                            outdoor_features: amenities.outdoor_features,
                            custom_amenities: amenities.custom_amenities,
                            custom_inclusion: amenities.custom_inclusion
                        },
                        photos: {
                            photo: photos.photo,
                            upload_date: photos.upload_date
                        },
                        title,
                        description,
                        listing_status,
                    },
                    include: [
                        {
                            model: PropertyTypes,
                            as: 'property_type'
                        },
                        {
                            model: UnitDetails,
                            as: 'unit_details'
                        },
                        {
                            model: Location,
                            as: 'location'
                        },
                        {
                            model: Amenities,
                            as: 'amenities',
                            include: [
                                {
                                    model: CustomAmenities,
                                    as: 'custom_amenities'
                                },
                                {
                                    model: CustomInclusions,
                                    as: 'custom_inclusion'
                                }
                            ]
                        },
                        {
                            model: PropertyPhoto,
                            as: 'photos'
                        }

                    ],
                    transaction
                },
                
            );

            return add_property_listing;

        } catch (error) {
            const isInclude = Object.keys(error).includes('original') && Object.keys(error).includes('errors');
            console.log((isInclude) && error.original.code == "ER_DUP_ENTRY" && error.errors[0].path == "property_id");

            if ((isInclude) && error.original.code == "ER_DUP_ENTRY" && error.errors[0].path == "property_id") {
                throw DataResponseHandler(
                    error,
                    "DUPLICATE_PROPERTY_ID",
                    400,
                    false,
                    "Seems like your creating an existing listing, make sure Property ID is unique."
                );
            } else {
                throw error;
            }
        }
    },
    FindApprover: async (approver_level, transaction) => {
        try {

            const get_approver = await Approvers.findAll({
                where: approver_level,
                attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] },
                transaction,
            })

            return get_approver

        } catch (error) {
            throw error
        }
    },
    FindAllListingBySeller: async (seller, transaction) => {
        try {

            const get_all_listing_byseller = await MasterPropertyList.findAll({
                where: { seller },
                attributes: { exclude: ['updatedAt', 'deletedAt'] },
                include: [
                    {
                        model: PropertyListing, attributes:
                        {
                            exclude: ['createdAt', 'updatedAt', 'property_listing_id'],
                        },
                        include: [
                            {
                                model: PropertyTypes, attributes: {
                                    exclude: ["property_type_id"]
                                }
                            },
                            {
                                model: ListingTypes, attributes: ['listing_type']
                            },
                            {
                                model: UnitDetails, attributes:
                                {
                                    exclude: ['createdAt', 'updatedAt', 'unit_detail_id']
                                },
                            },
                            {
                                model: Location, attributes: {
                                    exclude: ["location_id"]
                                }
                            },
                            {
                                model: Amenities, attributes:
                                {
                                    exclude: ['createdAt', 'updatedAt', 'amenity_id', "custom_amenity_id", "custom_inclusion_id"]
                                },
                                include: [
                                    {
                                        model: CustomAmenities, attributes:
                                        {
                                            exclude: ['createdAt', 'updatedAt', "deletedAt", "custom_amenity_id"]
                                        },
                                    },
                                    {
                                        model: CustomInclusions, attributes:
                                        {
                                            exclude: ['createdAt', 'updatedAt', "deletedAt", "custom_inclusion_id"]
                                        },
                                    }
                                ]
                            }
                        ]
                    },
                    // {
                    //     model: User, attributes:
                    //     {
                    //         exclude: ['createdAt', 'updatedAt', 'user_id']
                    //     },
                    //     include: [
                    //         {
                    //             model: Role, attributes:
                    //             {
                    //                 exclude: ['createdAt', 'updatedAt', 'role_id']
                    //             },
                    //         }
                    //     ]
                    // }
                ],
                transaction,
            })

            return get_all_listing_byseller

        } catch (error) {
            throw error
        }
    },
    FindApprovalsByMasterId: async (master_id, transaction) => {
        try {

            const get_approvals = await Approvals.findAll({
                where: master_id,
                transaction,
                attributes: {
                    exclude: ['createdAt', 'updatedAt', 'deletedAt']
                }
            });

            return get_approvals

        } catch (error) {
            throw error
        }
    },
    FindAllFeaturesLists: async () => {
        try {

            return await Sequelize.transaction(async (transaction) => {

                const findFeaturesLists = await FeaturesLists.findAll({
                    attributes: { exclude: ['createdAt', 'updatedAt', 'feature_list_id', 'deletedAt'] },
                    transaction
                });

                return findFeaturesLists;

            })

        } catch (error) {
            throw error
        }
    },
    FindListingType: async (listing_type, transaction) => {
        try {

            console.log(listing_type);

            const find_type_id = await ListingTypes.findOne({
                where: { listing_type },
                attributes: ['listing_type_id'],
                transaction
            });

            return find_type_id

        } catch (error) {
            throw error
        }
    },
    FindApprovalsPropertyListingId: async (property_listing_id, transaction) => {
        try {

            const get_approvals = await Approvals.findAll({
                where: {
                    property_listing_id
                },
                transaction,
                attributes: {
                    exclude: ['createdAt', 'updatedAt', 'deletedAt']
                },
                include: [
                    {
                        model: Approvers,
                        as: 'approver',
                        attributes: {
                            exclude: ['createdAt', 'updatedAt', 'deletedAt']
                        }
                    }
                ]
            });

            return get_approvals

        } catch (error) {
            throw error
        }
    },
    FindListingDetailsById: async (listing_id, transaction) => {
        try {

            const get_listing_by_id = await MasterPropertyList.findOne({
                attributes: { exclude: ['updatedAt', 'deletedAt'] },
                include: [
                    {
                        model: PropertyListing,
                        where: {
                            listing_id
                        },
                        attributes:
                        {
                            exclude: ['createdAt', 'updatedAt', 'property_listing_id'],
                        },
                        include: [
                            {
                                model: PropertyTypes, attributes: {
                                    exclude: ["property_type_id"]
                                }, as: 'property_type'
                            },
                            {
                                model: ListingTypes, attributes: ['listing_type'],
                                as: 'listing_type'
                            },
                            {
                                model: UnitDetails, attributes:
                                {
                                    exclude: ['createdAt', 'updatedAt', 'unit_detail_id']
                                },
                                as: 'unit_details'
                            },
                            {
                                model: Location, attributes: {
                                    exclude: ["location_id"]
                                },
                                as: 'location'
                            },
                            {
                                model: Amenities, attributes:
                                {
                                    exclude: ['createdAt', 'updatedAt', 'amenity_id', "custom_amenity_id", "custom_inclusion_id"]
                                },
                                include: [
                                    {
                                        model: CustomAmenities, attributes:
                                        {
                                            exclude: ['createdAt', 'updatedAt', "deletedAt", "custom_amenity_id"]
                                        },
                                        as: 'custom_amenities'
                                    },
                                    {
                                        model: CustomInclusions, attributes:
                                        {
                                            exclude: ['createdAt', 'updatedAt', "deletedAt", "custom_inclusion_id"]
                                        },
                                        as: 'custom_inclusion'
                                    }
                                ],
                                as: 'amenities'
                            }
                        ]
                    }
                ],
                transaction,
            })

            return get_listing_by_id

        } catch (error) {
            throw error
        }
    },
    FindAllListingByStatusAndUser: async (params_field, transaction) => {
        try {

            const get_all_listing_byseller = await PropertyListing.findAll({
                where: { ...params_field },
                attributes: { exclude: ['updatedAt', 'deletedAt'] },
                include: [
                    {
                        model: PropertyTypes, attributes: {
                            exclude: ["property_type_id"]
                        }
                    },
                    {
                        model: ListingTypes, attributes: ['listing_type']
                    },
                    {
                        model: UnitDetails, attributes:
                        {
                            exclude: ['createdAt', 'updatedAt', 'unit_detail_id']
                        },
                    },
                    {
                        model: Location, attributes: {
                            exclude: ["location_id"]
                        }
                    },
                    {
                        model: Amenities, attributes:
                        {
                            exclude: ['createdAt', 'updatedAt', 'amenity_id', "custom_amenity_id", "custom_inclusion_id"]
                        },
                        include: [
                            {
                                model: CustomAmenities, attributes:
                                {
                                    exclude: ['createdAt', 'updatedAt', "deletedAt", "custom_amenity_id"]
                                },
                            },
                            {
                                model: CustomInclusions, attributes:
                                {
                                    exclude: ['createdAt', 'updatedAt', "deletedAt", "custom_inclusion_id"]
                                },
                            }
                        ]
                    }
                ],
                transaction,
            })

            return get_all_listing_byseller

        } catch (error) {
            throw error
        }
    },
    FindPrefix: async (prefix_name, transaction) => {
        try {

            const get_prefix = await Prefix.findOne({
                where: {
                    prefix_type_name: prefix_name
                },
                attributes: ['prefix', 'prefix_type_name'],
                transaction
            });

            return get_prefix;

        } catch (error) {
            throw error
        }
    },
    FindListingByListingId: async (listing_id, transaction) => {
        try {

            const get_listing_by_id = await PropertyListing.findOne({
                attributes: { exclude: ['updatedAt', 'deletedAt'] },
                where: {
                    listing_id
                },
                include: [
                    {
                        model: PropertyTypes, as: 'property_type'
                    },
                    {
                        model: ListingTypes, attributes: ['listing_type'],
                        as: 'listing_type'
                    },
                    {
                        model: UnitDetails, attributes:
                        {
                            exclude: ['createdAt', 'updatedAt']
                        },
                        as: 'unit_details'
                    },
                    {
                        model: Location,
                        as: 'location'
                    },
                    {
                        model: Amenities, attributes:
                        {
                            exclude: ['createdAt', 'updatedAt']
                        },
                        include: [
                            {
                                model: CustomAmenities, attributes:
                                {
                                    exclude: ['createdAt', 'updatedAt', "deletedAt"]
                                },
                                as: 'custom_amenities'
                            },
                            {
                                model: CustomInclusions, attributes:
                                {
                                    exclude: ['createdAt', 'updatedAt', "deletedAt"]
                                },
                                as: 'custom_inclusion'
                            }
                        ],
                        as: 'amenities'
                    }
                ],
                transaction,
            })

            return get_listing_by_id;

        } catch (error) {
            throw error
        }
    },

    // UPDATE
    UpdatePropertyType: async (property, transaction) => {
        try {
            const { type, subtype, property_type_id } = property;

            const add_type = await PropertyTypes.update(
                { type, subtype },
                {
                    where: {
                        property_type_id
                    }, 
                    transaction
                }
            );

            return {
                property_type_id: add_type.property_type_id
            }

        } catch (error) {
            throw error
        }
    },
    UpdateUnitDetails: async (unit_details, transaction) => {
        try {

            const {
                price, discounted_price, price_per_sqm, furnishing,
                classification, no_of_beds, no_of_bathrooms, no_of_floors,
                parking, floor_area, lot_area, unit_detail_id
            } = unit_details

            const add_unit_details = await UnitDetails.update(
                {
                    price, discounted_price, price_per_sqm, furnishing,
                    classification, no_of_beds, no_of_bathrooms, no_of_floors,
                    parking, floor_area, lot_area
                },
                { 
                    where: {
                        unit_detail_id
                    },
                    transaction 
                },

            );

            return {
                unit_detail_id: add_unit_details.unit_detail_id
            }

        } catch (error) {
            throw error
        }
    },
    UpdateLocation: async (location, transaction) => {
        try {

            const {
                subdivision, city, province, zipcode, other, 
                map_location, location_id
            } = location

            const add_location = await Location.update(
                {
                    subdivision, city, province, zipcode, other, map_location
                },
                { 
                    where: {
                        location_id
                    },
                    transaction 
                }

            );

            return {
                location_id: add_location.location_id
            }

        } catch (error) {
            throw error
        }
    },
    UpdateCustomAmenities: async (custom_amenities, transaction) => {
        try {

            const {
                feature_name, custom_amenity_id
            } = custom_amenities

            const add_custom_amenities = await CustomAmenities.update(
                {
                    feature_name
                },
                { 
                    where: {
                        custom_amenity_id
                    },
                    transaction 
                }

            );

            return {
                custom_amenity_id: add_custom_amenities.custom_amenity_id
            }

        } catch (error) {
            throw error
        }
    },
    UpdateCustomInclusions: async (custom_inclusion, transaction) => {
        try {

            const {
                inclusion_name, custom_inclusion_id
            } = custom_inclusion

            const add_custom_inclusions = await CustomInclusions.update(
                {
                    inclusion_name
                },
                { 
                    where: {
                        custom_inclusion_id
                    },
                    transaction 
                }

            );

            return {
                custom_inclusion_id: add_custom_inclusions.custom_inclusion_id
            }

        } catch (error) {
            throw error
        }
    },
    UpdateAmenities: async (amenities, transaction) => {
        try {

            const {
                indoor_features, outdoor_features, amenity_id
            } = amenities

            const add_amenities = await Amenities.update(
                {
                    indoor_features, outdoor_features,
                },
                { 
                    where: {
                        amenity_id
                    },
                    transaction 
                }

            );

            return {
                amenity_id: add_amenities.amenity_id
            }

        } catch (error) {
            throw error
        }
    },
    UpdatePhotos: async (photos, transaction) => {
        try {

            const {
                property_photos_id, photo
            } = photos;

            const update_photos = await PropertyPhoto.update(
                { photo },
                { 
                    where: {
                        property_photos_id
                    },
                    transaction 
                }

            );

            return {
                property_photos_id: update_photos.property_photos_id
            }

        } catch (error) {
            throw error
        }
    },
    UpdateListing: async (listing, listing_id,transaction) => {
        try {

            const update_listing = await PropertyListing.update(listing, {
                where: {
                    listing_id
                },
                transaction
            });

            return update_listing;

        } catch (error) {
            const isInclude = Object.keys(error).includes('original') && Object.keys(error).includes('errors');

            if ((isInclude) && error.original.code == "ER_DUP_ENTRY" && error.errors[0].path == "property_id") {
                throw DataResponseHandler(
                    error,
                    "DUPLICATE_PROPERTY_ID",
                    400,
                    false,
                    "Seems like your updating a listing that has an existing Property ID, make sure Property ID is unique."
                );
            } else {
                throw error;
            }
        }
    },
}