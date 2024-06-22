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
}

module.exports = ValidationSchema;