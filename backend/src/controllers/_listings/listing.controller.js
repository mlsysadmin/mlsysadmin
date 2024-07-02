'use strict'
const DayJS = require('dayjs');

const Sequelize = require('../../config/_db/mlbrokerage.db');
const { AddPropertyType, FindListingType, AddUnitDetails, AddLocation, AddAmenities, AddCustomAmenities, AddCustomInclusions, AddPhotos, AddPropertyListing, AddMasterPropertyList } = require('../../streamline/listing.datastream');
const ListingIdGeneratorHelper = require("../../utils/_helper/ListingIdGenerator.helper");

module.exports = {
    GetAllListing: (req, res) => {
        // console.log("REQUEST: ", req);
        res.send("HEHE");
    },
    AddPropertyListing: async (req, res, next) => {
        try {

            const upload_date = DayJS(new Date()).format('YYYY-MM-DD HH:mm:ss')

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

                const { property_type_id } = await AddPropertyType(property_details, transaction);
                const listing_type_id = await FindListingType(listing_type, transaction);
                const { unit_detail_id } = await AddUnitDetails(unit_details, transaction);
                const { location_id } = await AddLocation(location, transaction);
                const { custom_amenity_id } = await AddCustomAmenities(amenities, transaction);
                const { custom_inclusion_id } = await AddCustomInclusions(amenities, transaction);

                const add_amenities = {
                    indoor_features, outdoor_features, 
                    custom_amenity_id, custom_inclusion_id
                };

                const { amenity_id } = await AddAmenities(add_amenities, transaction);

                const add_photos = upload_photos.photos.map((photos, i) => {
                    return {
                        listing_id, photo: photos.photo, upload_date
                    }
                })

                await AddPhotos(add_photos, transaction);

                const property_listing_fields = {
                    listing_id, seller_id, property_type_id,
                    listing_type_id, unit_detail_id, location_id,
                    amenity_id, 
                    // property_photos_id, 
                    ...description,
                    listing_status
                };

                console.log(property_listing_fields);

                const { property_listing_id } = await AddPropertyListing(property_listing_fields, transaction);

                const add_master_property_list = await AddMasterPropertyList({
                    property_listing_id, seller_id, property_id, listing_status, property_status
                }, transaction);

                return add_master_property_list;

            })

            res.send(AddListing);

        } catch (error) {
            next(error);
        }
    }
}
