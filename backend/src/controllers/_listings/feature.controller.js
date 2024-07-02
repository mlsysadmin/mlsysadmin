const FeatureLists = require('../../models/main.model');
const { FindAllFeaturesLists } = require('../../streamline/listing.datastream');
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

            const success = SuccessFormatter(data, 200, "Retrieved Successfully");

            SuccessLoggerHelper(req, data);

            res.status(200).send(success);


        } catch (error) {
            next(error);
        }
    }
}