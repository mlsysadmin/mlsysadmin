const FeatureLists = require('../../models/main.model');
const { FindAllFeaturesLists } = require('../../streamline/listing.datastream');
const DataResponseHandler = require('../../utils/_helper/DataResponseHandler.helper');
const SuccessFormatter = require('../../utils/_helper/SuccessFormatter.helper');
const SuccessLoggerHelper = require('../../utils/_helper/SuccessLogger.helper');

module.exports = {
    GetAllAmenities: async (req, res, next) => {
        try {
            
            const getAllAmenities = await FindAllFeaturesLists();

            const indoor = getAllAmenities.filter((amenity, i) => amenity.feature_type === 'indoor');
            const outdoor = getAllAmenities.filter((amenity, i) => amenity.feature_type === 'outdoor');

            const data = {
                amenities: { indoor, outdoor }
            }
            const amenities_data = {
                indoor_count: data.amenities.indoor.length,
                outdoor_count: data.amenities.outdoor.length
            }

            const amenities_log = DataResponseHandler(
                amenities_data,
                "AMENITIES_RETRIEVED",
                200,
                true,
                "SUCCESS"
            );

            const amenities = DataResponseHandler(
                data,
                "AMENITIES_RETRIEVED",
                200,
                true,
                "SUCCESS"
            );

            const success = SuccessFormatter(amenities, 200, "Retrieved Successfully");

            SuccessLoggerHelper(req, amenities_log);

            res.status(200).send(success);


        } catch (error) {
            next(error);
        }
    },
    GetAllFeatures: async (req, res, next) => {
        try {
            
            const getAllAmenities = await FindAllFeaturesLists();

            const indoor = getAllAmenities.filter((amenity, i) => amenity.feature_type === 'indoor');
            const outdoor = getAllAmenities.filter((amenity, i) => amenity.feature_type === 'outdoor');

            const data = {
                features: { indoor, outdoor }
            }
            const amenities_data = {
                indoor_count: data.features.indoor.length,
                outdoor_count: data.features.outdoor.length
            }

            const amenities_log = DataResponseHandler(
                amenities_data,
                "FEATURES_RETRIEVED",
                200,
                true,
                "SUCCESS"
            );

            const amenities = DataResponseHandler(
                data,
                "FEATURES_RETRIEVED",
                200,
                true,
                "SUCCESS"
            );

            const success = SuccessFormatter(amenities, 200, "Retrieved Successfully");

            SuccessLoggerHelper(req, amenities_log);

            res.status(200).send(success);


        } catch (error) {
            next(error);
        }
    }
}