'use strict'

const { ML_MONEY_API } = require('./axios.util');
const SuccessLoggerHelper = require('../_helper/SuccessLogger.helper');

module.exports = {
    RegisterUserKyc: async (token, user) => {
        try {
            const endpoint = `/api/register/validated-basic-kyc`;
            const ML_MONEY_X_API_KEY = process.env.ML_MONEY_X_API_KEY;

            const {
                mobileNumber, otpCode, firstName, lastName, middleName,
                email, addressL0Id
            } = user;

            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "x-api-key": ML_MONEY_X_API_KEY,
                },
            };

            const postData = {
                mobileNumber,
                otpCode,
                firstName,
                lastName,
                middleName, // optional
                email,
                address: {
                    addressL0Id
                }
            }

            const register_ckyc = await ML_MONEY_API.post(endpoint, postData, config);

            let data;
            let message;
            let code;

            let request = {
                url: endpoint,
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
            const endpoint = `/api/v3/login/external`;
            const EXTERNAL_LOGIN_SERVICE = process.env.EXTERNAL_LOGIN_SERVICE;

            const postData = {
                mobileNumber,
                otpCode,
                service: EXTERNAL_LOGIN_SERVICE
            }

            const login = await ML_MONEY_API.post(endpoint, postData);

            // if (login) {

            // }
            delete login.data["accessToken"];

            let data;
            let message;
            let code;

            let request = {
                url: endpoint,
                method: 'POST',
                query: {},
                params: {},
                body: postData,
                headers: {}
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
    },
    ExternalSendOtp: async (mobileNumber) => {
        try {

            const endpoint = `/api/auth/external-send-otp`;
            const ML_MONEY_X_API_KEY = process.env.ML_MONEY_X_API_KEY;

            const postData = {
                mobileNumber,
                isMlWalletRequired: false,
            }

            const config = {
                headers: {
                    "x-api-key": ML_MONEY_X_API_KEY
                }
            }

            const userOtp = await ML_MONEY_API.post(endpoint, postData, config);

            let data;
            let message;
            let code;

            let request = {
                url: endpoint,
                method: 'POST',
                query: {},
                params: {},
                body: postData,
                headers: config
            }

            let response = {
                data,
                status: userOtp.status,
                code: userOtp.statusText.toUpperCase(),
                message: userOtp.data.message
            }

            message = userOtp.data.message;
            code = "OTP_SENT"

            SuccessLoggerHelper(request, response);

            return { userOtp, message, code }

        } catch (error) {
            throw error;
        }
    }
}