'use strict'


require('dotenv').config();
const DayJS = require('dayjs');

const Sequelize = require('../../../config/_db/mlbrokerage.db');
const {
    FindListingType,
    FindListingByListingId,
    FindApprovalsPropertyListingId,
} = require('../../../streamline/listing.datastream');
const SuccessFormatter = require('../../../utils/_helper/SuccessFormatter.helper');
const SuccessLoggerHelper = require('../../../utils/_helper/SuccessLogger.helper');
const DataResponseHandler = require('../../../utils/_helper/DataResponseHandler.helper');
const { Op } = require('sequelize');
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
                console.log(updated_property_listing.property_listing_id);

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
}