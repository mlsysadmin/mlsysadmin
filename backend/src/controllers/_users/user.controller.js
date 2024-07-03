'use strict'

require('dotenv').config();

const { Op } = require('sequelize');
const { JwtSign } = require("../../services/jwt.auth.service");
const { FindUserOne } = require("../../streamline/user.datastream");
const SuccessFormatter = require("../../utils/_helper/SuccessFormatter.helper");
const { User, Role } = require("../../models/main.model");
const SuccessLoggerHelper = require('../../utils/_helper/SuccessLogger.helper');
const DataResponseHandler = require('../../utils/_helper/DataResponseHandler.helper');
const { VerifyHash, Hash } = require('../../utils/_helper/hash.helper');
const GenerateToken = require('../../utils/_api/token.api');
const { SearchUserKyc } = require('../../utils/_api/kyc.api');

module.exports = {
    Login: async (req, res, next) => {
        try {

            const { email, password } = req.body.payload
            const findUser = await FindUserOne({ email });

            if (findUser) {
                const verifyPassword = await VerifyHash(password, findUser.password);

                if (verifyPassword) {
                    const user = DataResponseHandler(
                        findUser,
                        "VERIFY_SUCCESS",
                        200,
                        true,
                        "SUCCESS"
                    )

                    const token = JwtSign();
                    const domain = process.env.COOKIE_DOMAIN;

                    const cookieOptions = {
                        // expires: new Date(Date.now() + 300000),
                        maxAge: 300000, // 5 min
                        path: '/',
                        httOnly: true,
                        secure: true,
                        sameSite: true,
                        domain,
                        signed:true
                        // expires: new Date(Date.now() + 900000)
                    }

                    res.cookie('access_token', token, cookieOptions)
                    res.cookie('account_details', JSON.stringify(user), cookieOptions)

                    // res.append('Set-Cookie',`access_token=${token};MaxAge=${Math.floor(Date.now() / 1000) + (5 * 60)};Path=/;HttOnly=true;Secure=true;SameSite=true;Domain=localhost`)
                    // res.append('Set-Cookie',`account_details=${JSON.stringify(user.data)};MaxAge=${Math.floor(Date.now() / 1000) + (5 * 60)};Path=/;HttOnly=true;Secure=true;SameSite=true;Domain=localhost`)
                    const success = SuccessFormatter(user, 200, "Logged In Successfully");

                    SuccessLoggerHelper(req, user);

                    res.status(200).send(success);
                }else{

                    throw DataResponseHandler(
                        null,
                        "AUTHENTICATION_ERROR",
                        401,
                        false,
                        "It looks like the email address or password you entered is incorrect."
                    );
                }

            }
            else{
                throw DataResponseHandler(
                    null,
                    "AUTHENTICATION_ERROR",
                    401,
                    false,
                    "We couldn't find an account associated with this email address or mobile number."
                );
            }


        } catch (error) {
            next(error)
        }
    },
    Register: async (req, res, next) => {
        try {


        } catch (error) {
            console.log(error);
            next(error)
        }
    },
    SearchKyc: async (req, res, next) => {
        try {

            const params = req.body.payload;
            const getToken = await GenerateToken();

            if ((getToken) && params) {
                console.log(getToken);
                const token = getToken.data.token;

                const searchkyc = await SearchUserKyc(token, params);

                const kyc = DataResponseHandler(
                    searchkyc.data.data,
                    "ACCOUNT_ALREADY_EXIST",
                    200,
                    true,
                    "SUCCESS"
                )

                const success = SuccessFormatter(kyc, 200, "SUCCESS");
                SuccessLoggerHelper(req, kyc);

                res.status(200).send(success)

            }
        } catch (error) {
            if (Object.keys(error).includes('response')) {

                let response = DataResponseHandler(
                    error.response.data,
                    "SERVER_ERROR",
                    500,
                    false,
                    "We're sorry, something went wrong on our end. Please try again later or contact our support team."
                );
                next(response)
            }
            next(error)
        }
    },
    SearchUser: async (req, res, next) => {
        try {

            const data = req.body.payload;
            const params = {
                [Op.or]: [
                    {
                        email: data.email,
                    },
                    {
                        mobile_number: data.mobile_number
                    }
                ]
            }; // -> required params used in where clause

            const findUser = await FindUserOne(params);

            if (findUser) {

                const user = DataResponseHandler(
                    null,
                    "ACCOUNT_ALREADY_EXIST",
                    200,
                    true,
                    "SUCCESS"
                )

                const success = SuccessFormatter(user, 200, "It looks like there's already an account associated with these email address or mobile number.");

                SuccessLoggerHelper(req, user);

                res.status(200).send(success);
            }else{
                const user = DataResponseHandler(
                    null,
                    "ACCOUNT_DOES_NOT_EXIST",
                    200,
                    true,
                    "SUCCESS"
                )

                const success = SuccessFormatter(user, 200, "");

                SuccessLoggerHelper(req, user);

                res.status(200).send(success);
            }

        } catch (error) {
            next(error)
        }
    }
}