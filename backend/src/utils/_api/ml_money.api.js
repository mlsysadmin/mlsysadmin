'use strict'

const { CKYC_API, ML_MONEY_API } = require('./axios.util');
const DataResponseHandler = require('../_helper/DataResponseHandler.helper');
const SuccessLoggerHelper = require('../_helper/SuccessLogger.helper');

const Logger = require('../../config/_log/mlbrokerage.logger');

const ErrLogger = Logger.Get_logger("error");

module.exports = {
    RegisterUserKyc: async (token, user) => {
        try {
            const endpoint = `/api/register/validated-basic-kyc`;
            const X_API_KEY = process.env.X_API_KEY;
            const {
                mobileNumber, otpCode, firstName, lastName, middleName,
                suffix, email, addressL0Id, addressL1Id, addressL2Id,
                otherAddress, zipCode
            } = user;

            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "x-api-key": X_API_KEY,
                },
            };

            const postData = {
                mobileNumber,
                otpCode,
                firstName,
                lastName,
                middleName, // optional
                suffix, // optional
                email,
                address: {
                    addressL0Id,
                    addressL1Id,
                    addressL2Id,
                    otherAddress, // optional
                    zipCode, // optional
                }
            }


            const register_ckyc = await ML_MONEY_API.post(endpoint, postData, config);

            let data;
            let message;
            let code;

            let request = {
                url: URL,
                method: 'POST',
                query: {},
                params: {},
                body: postData,
                headers: config
            }

            let response = {
                data,
                status: register_ckyc.status,
                code: register_ckyc.statusText.toUpperCase(),
                message: "User Registered Successfully"
            }

            message = "User Registered Successfully";
            code = "USER_REGISTERED"

            SuccessLoggerHelper(request, response);

            return { register_ckyc, message, code }

        } catch (error) {
            console.log(error);

            throw (error)
        }
    },
    ExternalLogin: async (mobileNumber, otpCode) => {
        try {
            const endpoint = `${ML_MONEY_API}/api/v3/login/external`

            const postData = {
                mobileNumber: mobileNumber,
                otpCode: otpCode,
                service: "ML_PROPERTIES"
            }

            const login = await ML_MONEY_API.post(endpoint, postData);

            // if (login) {
                
            // }

            let data;
            let message;
            let code;

            let request = {
                url: URL,
                method: 'POST',
                query: {},
                params: {},
                body: postData,
                headers: config
            }

            let response = {
                data,
                status: login.status,
                code: login.statusText.toUpperCase(),
                message: "User Logged in Successfully"
            }

            message = "User Logged in Successfully";
            code = "USER_LOGGED_IN"

            SuccessLoggerHelper(request, response);

            return { login, message, code }

        } catch (error) {
            throw error;
        }
    }
}