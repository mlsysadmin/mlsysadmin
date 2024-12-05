'use strict'

const { OTP_API } = require('./axios.util');
const SuccessLoggerHelper = require('../_helper/SuccessLogger.helper');

const Logger = require('../../config/_log/mlbrokerage.logger');

const ErrLogger = Logger.Get_logger("error");

module.exports = {
    SendOtp: async (mobile_number) => {
        try {
            const endpoint = '/sendOTP';
            const opt_username = process.env.OTP_USERNAME;
            const otp_pass = process.env.OTP_PASSWORD;
            const otp_limit = process.env.OTP_LIMIT;
            const otp_message = process.env.OTP_MESSAGE;

            let message = "";
            let code = "";

            const postData = {
                username: opt_username,
                password: otp_pass,
                mobileno: mobile_number,
                otp_msg: otp_message,
                timeLimit: otp_limit,
                service_type: "ML Properties"
            }

            const send_otp = await OTP_API.post(endpoint, postData);

            if (send_otp.data.error) {
                message = send_otp.data.message;
                code = "ERORR_OTP"
            } else {
                message = "Otp Sent Successfully";
                code = "OTP_SENT"
            }

            let request = {
                endpoint: endpoint,
                method: 'POST',
                query: {},
                params: {},
                body: postData,
                headers: {}
            }

            let response = {
                data: send_otp.data,
                status: send_otp.status,
                code: send_otp.code,
                message: message
            }

            SuccessLoggerHelper(request, response);

            return {
                send_otp, message, code
            }

        } catch (error) {

            throw (error)
        }
    },
    ValidateOtp: async (mobile_number, pin) => {
        try {
            const endpoint = '/validateOTP';
            const opt_username = process.env.OTP_USERNAME;
            const otp_pass = process.env.OTP_PASSWORD;
            const otp_limit = process.env.OTP_LIMIT;

            let message = "";
            let code = "";

            const postData = {
                username: opt_username,
                password: otp_pass,
                mobileno: mobile_number,
                pin: pin,
                timeLimit: otp_limit,
            }

            const validate_otp = await OTP_API.post(endpoint, postData);

            if (validate_otp.data.error) {
                const response = {
                    data: validate_otp.data,
                    code: "OTP_INVALID",
                    status: 400,
                    success: false,
                    message: validate_otp.data.message
                }

                throw response;
            } else {
                message = "Otp Validated Successfully";
                code = "OTP_VALIDATED"
            }

            let request = {
                endpoint: endpoint,
                method: 'POST',
                query: {},
                params: {},
                body: postData,
                headers: {}
            }

            let response = {
                data: validate_otp.data,
                status: validate_otp.status,
                code: validate_otp.code,
                message: message
            }

            SuccessLoggerHelper(request, response);

            return {
                validate_otp, message, code
            }

        } catch (error) {

            throw (error)
        }
    }
}