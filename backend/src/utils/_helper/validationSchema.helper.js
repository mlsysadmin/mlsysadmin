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
}

module.exports = ValidationSchema;