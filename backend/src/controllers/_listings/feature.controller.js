const FeatureLists = require('../../models/main.model');
const { FindAllFeaturesLists, CreateFeatures, FindCompareFeatureLists, UpdateFeature, DestroyFeature } = require('../../streamline/listing.datastream');
const DataResponseHandler = require('../../utils/_helper/DataResponseHandler.helper');
const SuccessFormatter = require('../../utils/_helper/SuccessFormatter.helper');
const SuccessLoggerHelper = require('../../utils/_helper/SuccessLogger.helper');
const Sequelize = require('../../config/_db/mlbrokerage.db');

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
    },
    AddFeatures: async (req, res, next) => {
        try {

            const AddFeatures = await Sequelize.transaction(async (transaction) => {

                const { features } = req.body.payload;
                // Step 1: Find existing records in the database
                const existingRecordsFeatures = await FindCompareFeatureLists(features, transaction);

                // Step 2: Filter out existing records from newData
                const existingFeatures = existingRecordsFeatures.map((record) => record.feature_name);
                const filteredData = features.filter((item) => !existingFeatures.includes(item.feature_name));

                if (filteredData.length > 0) {

                    const addFeatures = await CreateFeatures(features, transaction);

                    return addFeatures;
                } else {
                    throw DataResponseHandler(
                        { existingFeatures },
                        "DUPLICATE_ENTRIES",
                        400,
                        false,
                        "Seems like your creating an existing feature, make sure to add new features."
                    );
                }

            });

            const features = DataResponseHandler(
                AddFeatures,
                "FEATURES_ADDED",
                200,
                true,
                "SUCCESS"
            );

            const success = SuccessFormatter(features, 200, "Added Successfully");

            SuccessLoggerHelper(req, features);

            res.status(200).send(success);

        } catch (error) {
            next(error);
        }
    },
    EditAddedFeatures: async (req, res, next) => {
        try {

            const EditFeatures = await Sequelize.transaction(async (transaction) => {

                const { features } = req.body.payload;
                // Step 1: Find existing records in the database
                const updatedFeatures =  await Promise.all(
                    features.map(async (updateFeatures) => await UpdateFeature(updateFeatures, transaction))
                );
                console.log("updatedFeatures", updatedFeatures);
                

                return updatedFeatures;

            });

            const updatefeatures = DataResponseHandler(
                EditFeatures,
                "UPDATE_FEATURES",
                200,
                true,
                "SUCCESS"
            );

            const success = SuccessFormatter(updatefeatures, 200, "Successful Query");

            SuccessLoggerHelper(req, updatefeatures);

            res.status(200).send(success);

        } catch (error) {
            next(error);
        }
    },
    DeleteAddedFeatures: async (req, res, next) => {
        try {

            const DeleteFeatures = await Sequelize.transaction(async (transaction) => {

                const { features } = req.body.payload;
                // Step 1: Find existing records in the database
                const deletedFeatures =  await Promise.all(
                    features.map(async (deleteFeatures) => await DestroyFeature(deleteFeatures, transaction))
                );

                return deletedFeatures;

            });

            const deletefeatures = DataResponseHandler(
                DeleteFeatures,
                "DELETE_FEATURES",
                200,
                true,
                "SUCCESS"
            );

            const success = SuccessFormatter(deletefeatures, 200, "Successful Query");

            SuccessLoggerHelper(req, deletefeatures);

            res.status(200).send(success);

        } catch (error) {
            next(error);
        }
    }
}