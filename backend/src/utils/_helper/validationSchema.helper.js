'use strict'
require('dotenv').config();
const Joi = require("joi");

const ValidationSchema = {
    
    LoginBody: Joi.object().keys({
        email: Joi.string().required().email(),
        password: Joi.string().required(),
        api_key: Joi.string().required().equal(process.env.API_KEY).error(errors => {
            errors.forEach(err => {
                console.log(err.code);
                if (Object.keys(err).includes('path')) {
                    err.message = "api key is not valid"
                }
            });
            return errors;
        })
    }),
    RegisterBody: Joi.object().keys({
        mobile_number: Joi.string().required(),
        first_name: Joi.string().required(),
        middle_name: Joi.string().required(),
        last_name: Joi.string().required(),
        suffix: Joi.string().optional(),
        birth_date: Joi.string().required(),
        email: Joi.string().required().email(),
        password: Joi.string().required(),
        user_desc: Joi.string().required(),
        license: Joi.string().optional()
    }),
    AddListing: Joi.object().keys({
        seller_id: Joi.number().required(),
        property_id: Joi.string().required(),
        listing_type: Joi.string().required(),
        property_details: Joi.object().keys({
            type: Joi.string().required(),
            subtype: Joi.string().required(),
        }),
        unit_details: Joi.object().keys({
            price: Joi.number().required(),
            discounted_price: Joi.number().required(),
            price_per_sqm: Joi.number().required(),
            furnishing: Joi.string().required(),
            classification: Joi.string().required(),
            no_of_beds: Joi.number().required(),
            no_of_bathrooms: Joi.number().required(),
            no_of_floors: Joi.number().required(),
            parking: Joi.number().required(),
            floor_area: Joi.number().required(),
            lot_area: Joi.number().required(),
        }),
        location: Joi.object().keys({
            subdivision: Joi.string().optional(),
            barangay: Joi.string().required(),
            city: Joi.string().required(),
            province: Joi.string().required(),
            map_location: Joi.string().required()
        }),
        description: Joi.object().keys({
            title: Joi.string().required(),
            description: Joi.string().required(),
        }),
        upload_photos: Joi.object().keys({
            photos: Joi.array().required(),
            // upload_date: Joi.date().required()
        }),
        amenities: Joi.object().keys({
            indoor_features: Joi.array().required(),
            outdoor_features: Joi.array().required(),
            feature_name: Joi.array().required(),
            inclusion_name: Joi.array().required()
        }),
    })
}

module.exports = ValidationSchema;