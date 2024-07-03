'use strict'

const Sequelize = require('../config/_db/mlbrokerage.db');
const { FeaturesLists, PropertyTypes, ListingTypes, UnitDetails, Location, CustomAmenities, CustomInclusions, Amenities, PropertyPhoto, PropertyListing, MasterPropertyList, Approvals, Approvers, User, Role, Escalations } = require('../models/main.model');

module.exports = {
    FindAllFeaturesLists: async () => {
        try {

            return await Sequelize.transaction(async (transaction) => {

                const findFeaturesLists = await FeaturesLists.findAll({
                    attributes: { exclude: ['createdAt', 'updatedAt'] },
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

            const find_type_id = await ListingTypes.findOne({
                where: { listing_type },
                attributes: ['listing_type_id'],
                transaction
            });

            return find_type_id.listing_type_id

        } catch (error) {
            throw error
        }
    },
    AddPropertyType: async (property, transaction) => {
        try {
            const { type, subtype } = property;

            const add_type = await PropertyTypes.create(
                { type, subtype },
                { transaction }
            );

            return {
                property_type_id: add_type.property_type_id
            }

        } catch (error) {
            throw error
        }
    },
    AddUnitDetails: async (unit_details, transaction) => {
        try {

            const {
                price, discounted_price, price_per_sqm, furnishing,
                classification, no_of_beds, no_of_bathrooms, no_of_floors,
                parking, floor_area, lot_area
            } = unit_details

            const add_unit_details = await UnitDetails.create(
                {
                    price, discounted_price, price_per_sqm, furnishing,
                    classification, no_of_beds, no_of_bathrooms, no_of_floors,
                    parking, floor_area, lot_area
                },
                { transaction },

            );

            return {
                unit_detail_id: add_unit_details.unit_detail_id
            }

        } catch (error) {
            throw error
        }
    },
    AddLocation: async (location, transaction) => {
        try {

            const {
                subdivision, barangay, city, province, map_location
            } = location

            const add_location = await Location.create(
                {
                    subdivision, barangay, city, province, map_location
                },
                { transaction }

            );

            return {
                location_id: add_location.location_id
            }

        } catch (error) {
            throw error
        }
    },
    AddCustomAmenities: async (custom_amenities, transaction) => {
        try {

            const {
                feature_name
            } = custom_amenities

            const add_custom_amenities = await CustomAmenities.create(
                {
                    feature_name
                },
                { transaction }

            );

            return {
                custom_amenity_id: add_custom_amenities.custom_amenity_id
            }

        } catch (error) {
            throw error
        }
    },
    AddCustomInclusions: async (custom_inclusion, transaction) => {
        try {

            const {
                inclusion_name
            } = custom_inclusion

            const add_custom_inclusions = await CustomInclusions.create(
                {
                    inclusion_name
                },
                { transaction }

            );

            return {
                custom_inclusion_id: add_custom_inclusions.custom_inclusion_id
            }

        } catch (error) {
            throw error
        }
    },
    AddAmenities: async (amenities, transaction) => {
        try {

            const {
                indoor_features, outdoor_features,
                custom_amenity_id, custom_inclusion_id
            } = amenities

            const add_amenities = await Amenities.create(
                {
                    indoor_features, outdoor_features,
                    custom_amenity_id, custom_inclusion_id
                },
                { transaction }

            );

            return {
                amenity_id: add_amenities.amenity_id
            }

        } catch (error) {
            throw error
        }
    },
    AddPhotos: async (photos, transaction) => {
        try {

            // const {
            //     listing_id, photo, upload_date
            // } = photos;

            const add_photos = await PropertyPhoto.bulkCreate(
                photos,
                { transaction }

            );

            return add_photos

        } catch (error) {
            throw error
        }
    },
    AddPropertyListing: async (property_fields, transaction) => {
        try {

            const {
                listing_id, seller_id, property_type_id,
                listing_type_id, unit_detail_id, location_id,
                amenity_id,
                // property_photos_id, 
                title, description,
                listing_status
            } = property_fields;

            const add_property_listing = await PropertyListing.create(
                {
                    listing_id, seller_id, property_type_id,
                    listing_type_id, unit_detail_id, location_id,
                    amenity_id, title, description,
                    listing_status
                },
                { transaction }

            );
            console.log(add_property_listing);

            return {
                property_listing_id: add_property_listing.property_listing_id
            };

        } catch (error) {
            throw error
        }
    },
    AddMasterPropertyList: async (master_property_fields, transaction) => {
        try {

            const {
                property_listing_id, seller_id, property_id,
                listing_status, property_status
            } = master_property_fields;

            const add_masterproperty_listing = await MasterPropertyList.create(
                {
                    property_listing_id, seller_id, property_id,
                    listing_status, property_status
                },
                { transaction }

            );

            return add_masterproperty_listing;

        } catch (error) {
            throw error
        }
    },
    AddApproval: async (approvals, transaction) => {
        try {

            const {
                master_property_id, approver_id, approval_status, levels
            } = approvals;

            const add_approval = await Approvals.create(
                {
                    master_property_id, approver_id, approval_status, levels
                },
                { transaction }

            );

            return {
                approval_id: add_approval.approval_id
            }

        } catch (error) {
            throw error
        }
    },
    GetApprover: async (approver_level, transaction) => {
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
    GetAllListingBySeller: async (seller_id, transaction) => {
        try {

            const get_all_listing_byseller = await MasterPropertyList.findAll({
                where: { seller_id },
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
                    {
                        model: User, attributes:
                        {
                            exclude: ['createdAt', 'updatedAt', 'user_id']
                        },
                        include: [
                            {
                                model: Role, attributes:
                                {
                                    exclude: ['createdAt', 'updatedAt', 'role_id']
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
    AddEscalations: async (escalation, transaction) => {
        try {

            const add_escalations = await Escalations.bulkCreate(
                escalation,
                { transaction }
            );

            return add_escalations

        } catch (error) {
            throw error
        }
    },
    GetApprovalsByMasterId: async (master_id, transaction) => {
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
}