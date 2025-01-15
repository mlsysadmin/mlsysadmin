'use strict'

require('dotenv').config();

const { Op } = require('sequelize');
const { JwtSign } = require("../../services/jwt.auth.service");
const { FindUserOne, FindOneSupportByEmail, InsertUserLoginAttempt } = require("../../streamline/user.datastream");
const SuccessFormatter = require("../../utils/_helper/SuccessFormatter.helper");
const { User, Role } = require("../../models/main.model");
const SuccessLoggerHelper = require('../../utils/_helper/SuccessLogger.helper');
const DataResponseHandler = require('../../utils/_helper/DataResponseHandler.helper');
const { VerifyHash, Hash } = require('../../utils/_helper/hash.helper');
const GenerateToken = require('../../utils/_api/Token.api');
const { SearchUserKyc } = require('../../utils/_api/kyc.api');
const { GenerateURL, GoogleAuth } = require('../../services/google.auth.service');

const { google } = require('googleapis');
const { UpdateTokenVersion } = require('../../utils/_helper/Jwt.helper');
const { SendOtp, ValidateOtp } = require('../../utils/_api/otp.api');
const { RegisterUserKyc, ExternalLogin, ExternalSendOtp } = require('../../utils/_api/ml_money.api');
const { StringToArray } = require('../../utils/_helper/DataFunctions.helper');
const Sequelize = require('../../config/_db/mlbrokerage.db');

const COOKIE_ACCOUNT_DETAILS = process.env.COOKIE_ACCOUNT_DETAILS;
const COOKIE_ACCOUNT_SESSION = process.env.COOKIE_ACCOUNT_SESSION;

module.exports = {
    Login: async (req, res, next) => {
        try {

            const { email } = req.body.payload
            const findUser = await FindUserOne({ email });

            if (findUser) {
                // const verifyPassword = await VerifyHash(findUser.password);

                // if (verifyPassword) {
                //     const user = DataResponseHandler(
                //         findUser,
                //         "VERIFY_SUCCESS",
                //         200,
                //         true,
                //         "SUCCESS"
                //     )

                //     const token = JwtSign();
                //     const domain = process.env.COOKIE_DOMAIN;

                //     const cookieOptions = {
                //         // expires: new Date(Date.now() + 300000),
                //         maxAge: 300000, // 5 min
                //         path: '/',
                //         httOnly: true,
                //         secure: true,
                //         sameSite: true,
                //         domain,
                //         signed:true
                //         // expires: new Date(Date.now() + 900000)
                //     }

                //     res.cookie('access_token', token, cookieOptions)
                //     res.cookie('account_details', JSON.stringify(user), cookieOptions)

                //     // res.append('Set-Cookie',`access_token=${token};MaxAge=${Math.floor(Date.now() / 1000) + (5 * 60)};Path=/;HttOnly=true;Secure=true;SameSite=true;Domain=localhost`)
                //     // res.append('Set-Cookie',`account_details=${JSON.stringify(user.data)};MaxAge=${Math.floor(Date.now() / 1000) + (5 * 60)};Path=/;HttOnly=true;Secure=true;SameSite=true;Domain=localhost`)
                //     const success = SuccessFormatter(user, 200, "Logged In Successfully");

                //     SuccessLoggerHelper(req, user);

                //     res.status(200).send(success);
                // }else{

                //     throw DataResponseHandler(
                //         null,
                //         "AUTHENTICATION_ERROR",
                //         401,
                //         false,
                //         "It looks like the email address or password you entered is incorrect."
                //     );
                // }
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
                    signed: true
                    // expires: new Date(Date.now() + 900000)
                }

                res.cookie('access_token', token, cookieOptions);

                const user = DataResponseHandler(
                    findUser,
                    "VERIFY_SUCCESS",
                    200,
                    true,
                    "SUCCESS"
                )
                const success = SuccessFormatter(user, 200, "Logged In Successfully");

                SuccessLoggerHelper(req, user);

                res.status(200).send(success);

            }
            else {
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
    SearchKyc: async (req, res, next) => {
        try {

            const params = req.body.payload;

            const getToken = await GenerateToken();

            console.log(req.body);
            if ((getToken) && params) {
                const token = getToken.data.token;

                const searchkyc = await SearchUserKyc(token, params);

                const kyc = DataResponseHandler(
                    searchkyc.search_ckyc.data.data,
                    searchkyc.code,
                    200,
                    true,
                    searchkyc.message
                )

                const success = SuccessFormatter(kyc, 200, searchkyc.message);
                SuccessLoggerHelper(req, kyc);

                res.status(200).send(success)

            } else {
                throw DataResponseHandler(
                    { params, getToken },
                    "SERVER_ERROR",
                    500,
                    false,
                    "We're sorry, something went wrong on our end. Please try again later or contact our support team."
                );
            }

        } catch (error) {
            next(error);
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
            } else {
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
    },

    // SUPPORT
    GoogleSignIn: async (req, res, next) => {
        try {

            const api_key = process.env.X_API_KEY;

            const URL = await GenerateURL(api_key);

            console.log("GENERATED URL: ", URL);


            const data = DataResponseHandler(
                { url: URL },
                "GENERATE_GOOGLE_AUTH_URL",
                200,
                true,
                "SUCCESS"
            )
            const success = SuccessFormatter(data, 200, "URL Generated");

            SuccessLoggerHelper(req, data);

            res.status(200).send(success);

        } catch (error) {
            next(error)
        }
    },

    GoogleSignInCallback: async (req, res, next) => {
        try {

            const code = req.query.code;

            const OAuth2Client = await GoogleAuth();

            const getToken = await OAuth2Client.getToken(code);

            OAuth2Client.setCredentials(getToken.tokens);

            let OAuthClient = google.oauth2({
                auth: OAuth2Client,
                version: 'v2'
            })
            const userInfo = await OAuthClient.userinfo.get();
            const email = userInfo.data.email;

            const verifyUser = await FindOneSupportByEmail({ email });

            if (!verifyUser) {
                throw DataResponseHandler(
                    verifyUser,
                    "USER_NOT_FOUND",
                    404,
                    false,
                    "Login Failed."
                );
            } else {

                const generateSessionToken = JwtSign(verifyUser.approver_id);

                const tokenCookieOptions = {
                    expires: new Date(Date.now() + 300000),
                    maxAge: 300000, // 5 min
                    // path: '/',
                    // httOnly: true,
                    // secure: true,
                    // sameSite: true,
                    // domain: process.env.CLIENT_APP_URL,
                    // httOnly: process.env.COOKIE_HTTP_ONLY,
                    // secure: process.env.COOKIE_SECURE,
                    domain: process.env.COOKIE_DOMAIN,
                    signed: true
                    // expires: new Date(Date.now() + 900000)
                }

                const useCookieOptions = {
                    expires: new Date(Date.now() + 300000),
                    maxAge: 300000, // 5 min
                    // path: '/',
                    // httOnly: process.env.COOKIE_HTTP_ONLY,
                    // secure: process.env.COOKIE_SECURE,
                    // sameSite: true,
                    domain: process.env.COOKIE_DOMAIN,
                    // expires: new Date(Date.now() + 900000)
                }

                const login = DataResponseHandler(
                    verifyUser.dataValues,
                    "LOGIN_SUCCESSFULLY",
                    200,
                    true,
                    "SUCCESS"
                );

                SuccessLoggerHelper(req, login);

                res.cookie('access_token', generateSessionToken, tokenCookieOptions);
                res.cookie('user_details', JSON.stringify(verifyUser), useCookieOptions);

                res.redirect(`${process.env.CLIENT_APP_URL}/support/dashboard`);
            }

        } catch (error) {
            next(error)
        }
    },

    UserLogout: async (req, res, next) => {
        try {

            console.log(req.access_token);
            const user_id = req.access_token.sub;

            const updatokenTokenVersion = UpdateTokenVersion(user_id);

            res.clearCookie(COOKIE_ACCOUNT_SESSION, {
                httpOnly: process.env.COOKIE_HTTP_ONLY,
                // secure: process.env.COOKIE_SECURE,
                domain: process.env.COOKIE_DOMAIN,
            });

            res.clearCookie(COOKIE_ACCOUNT_DETAILS, {
                httpOnly: process.env.COOKIE_HTTP_ONLY,
                // secure: process.env.COOKIE_SECURE,
                domain: process.env.COOKIE_DOMAIN,
            });

            res.send(updatokenTokenVersion);

        } catch (error) {
            next(error);
        }
    },
    RegisterKyc: async (req, res, next) => {
        try {

            const {
                mobileNumber, otpCode, firstName, lastName, middleName,
                email
            } = req.body.payload;

            const addressL0Id = 1; // PHILIPPINES

            const user = {
                mobileNumber, otpCode, firstName, lastName, middleName,
                email, addressL0Id
            }

            const getToken = await GenerateToken();

            if (getToken) {
                const token = getToken.data.token;

                const register_kyc = await RegisterUserKyc(token, user);

                const kyc = DataResponseHandler(
                    register_kyc.register_ckyc.data,
                    register_kyc.code,
                    201,
                    true,
                    register_kyc.message
                )

                const success = SuccessFormatter(kyc, 200, register_kyc.message);
                SuccessLoggerHelper(req, kyc);

                res.status(200).send(success);

            } else {
                throw DataResponseHandler(
                    { payload: req.body.payload, getToken },
                    "SERVER_ERROR",
                    500,
                    false,
                    "We're sorry, something went wrong on our end. Please try again later or contact our support team."
                );
            }

        } catch (error) {
            next(error);
        }
    },
    SendOTP: async (req, res, next) => {
        try {

            const { cellphoneNumber } = req.body.payload;

            const otp_request = await SendOtp(cellphoneNumber);

            const otp = DataResponseHandler(
                otp_request.send_otp.data,
                otp_request.code,
                201,
                true,
                otp_request.message
            )

            const success = SuccessFormatter(otp, 200, otp_request.message);
            SuccessLoggerHelper(req, otp);

            res.status(200).send(success);

        } catch (error) {
            console.log("ERROROROR", error.response);

            next(error)
        }
    },
    ValidateOTP: async (req, res, next) => {
        try {

            const { cellphoneNumber, pin } = req.body.payload;

            const otp_request = await ValidateOtp(cellphoneNumber, pin);

            const otp = DataResponseHandler(
                otp_request.validate_otp.data,
                otp_request.code,
                201,
                true,
                otp_request.message
            )

            const success = SuccessFormatter(otp, 200, otp_request.message);
            SuccessLoggerHelper(req, otp);

            res.status(200).send(success);

        } catch (error) {
            next(error)
        }
    },

    UserSendOtp: async (req, res, next) => {
        try {

            const { cellphoneNumber } = req.body.payload;

            const userOtp = await ExternalSendOtp(cellphoneNumber);

            const otp = DataResponseHandler(
                userOtp.userOtp.data,
                userOtp.code,
                200,
                true,
                userOtp.message
            );

            SuccessLoggerHelper(req, otp);

            res.status(200).send(otp);

        } catch (error) {
            next(error);
        }
    },
    UserLogin: async (req, res, next) => {
        try {
            const { cellphoneNumber, pin } = req.body.payload;

            const userLogin = await ExternalLogin(cellphoneNumber, pin);

            if (!userLogin) {
                return res.status(404).send({ message: 'User not found' });
            }

            const uniqId = userLogin.login.data.ckycId;

            const generateSessionToken = JwtSign(uniqId);

            const tokenCookieOptions = {
                // expires: new Date(Date.now() + 300000),
                // maxAge: 300000, // 5 min
                // path: '/',
                // httOnly: true,
                // secure: true,
                // sameSite: true,
                // domain: process.env.CLIENT_APP_URL,
                httpOnly: process.env.COOKIE_HTTP_ONLY,
                // secure: process.env.COOKIE_SECURE,
                domain: process.env.COOKIE_DOMAIN,
                signed: true,
                maxAge: 3600000, // 1 hour in milliseconds
                // expires: new Date(Date.now() + 3600000), // 1 hour from now
            }

            const useCookieOptions = {
                // expires: new Date(Date.now() + 300000),
                // maxAge: 300000, // 5 min
                // path: '/',
                httpOnly: process.env.COOKIE_HTTP_ONLY,
                // secure: process.env.COOKIE_SECURE,
                // sameSite: true,
                domain: process.env.COOKIE_DOMAIN,
                maxAge: 3600000, // 1 hour in milliseconds
                // expires: new Date(Date.now() + 3600000), // 1 hour from now
            }

            const login = DataResponseHandler(
                uniqId,
                userLogin.code,
                200,
                true,
                userLogin.message
            );

            SuccessLoggerHelper(req, login);

            res.cookie(COOKIE_ACCOUNT_SESSION, generateSessionToken, tokenCookieOptions);
            res.cookie(COOKIE_ACCOUNT_DETAILS, userLogin.login.data, useCookieOptions);

            res.status(200).send(login);

        } catch (error) {
            next(error);
        }
    },
    CheckSession: async (req, res, next) => {
        try {

            const sessionCookie = req.signedCookies.access_token;
            const accountDetails = req.cookies.account_details;
            console.log("req", req.cookies);
            console.log("access", req.signedCookies.access_token);

            if (sessionCookie) {

                const isSessionCheck = DataResponseHandler(
                    { isLoggedIn: true, accountDetails },
                    "COOKIE_PRESENT",
                    200,
                    true,
                    "Cookie is still present"
                );

                res.send(isSessionCheck);
            } else {
                const isSessionCheck = DataResponseHandler(
                    { isLoggedIn: false, accountDetails: [] },
                    "COOKIE_EXPIRED",
                    200,
                    true,
                    "Cookie is not present"
                );

                res.send(isSessionCheck);
            }


        } catch (error) {
            next(error);
        }
    },
    FirstAttemptLogin: async (req, res, next) => {
        try {

            const {
                cellphoneNumber
            } = req.body.payload;

            const params = {
                cellphoneNumber
            }

            const getToken = await GenerateToken();

            if ((getToken) && params) {
                const token = getToken.data.token;

                const searchkyc = await SearchUserKyc(token, params);

                const kyc = searchkyc.search_ckyc.data.data;

                let user;
                let message;

                if (kyc) {
                    const tier = kyc.tier.label;
                    const notAllowedTier = StringToArray(process.env.NOT_ALLOWED_SELLER_TIER, "|");
                    const userTier = tier.replace(/\s+/g, "").trim().toUpperCase();
                    
                    if (!notAllowedTier.includes(userTier)) {
                        const role = notAllowedTier.includes(tier.toUpperCase()) ? 2 : 1;

                        const userParams = {
                            ckyc_id: kyc.ckycId,
                            role_id: role
                        }

                        const findUser = await FindUserOne(userParams);
                        if (findUser) {

                            user = {
                                data: searchkyc.search_ckyc.data.data,
                                isFirstAttempt: false
                            };
                            message = "Not First Login Attempt"

                        } else {
                            user = {
                                data: searchkyc.search_ckyc.data.data,
                                isFirstAttempt: true
                            };
                            message = "First Login Attempt"
                        }
                        const userResponse = DataResponseHandler(
                            user,
                            "SEARCH_USER",
                            200,
                            true,
                            message
                        )

                        const success = SuccessFormatter(userResponse, 200, message);
                        SuccessLoggerHelper(req, userResponse);

                        res.status(200).send(success)
                    }
                    else {
                        throw DataResponseHandler(
                            { tier: kyc.tier.label, cellphoneNumber },
                            "USER_NOT_ALLOWED",
                            400,
                            false,
                            "We're sorry, We’re unable to log you in right now. Please consider upgrading your tier."
                        );
                    }
                } else {

                    user = {
                        data: searchkyc.search_ckyc.data.data,
                        isFirstAttempt: false
                    };

                    const userResponse = DataResponseHandler(user,
                        "SEARCH_USER",
                        200,
                        true,
                        "User has no existing kyc"
                    )

                    const success = SuccessFormatter(userResponse, 200, message);
                    SuccessLoggerHelper(req, userResponse);

                    res.status(200).send(success)
                }

            } else {
                throw DataResponseHandler(
                    { params, getToken },
                    "SERVER_ERROR",
                    500,
                    false,
                    "We're sorry, something went wrong on our end. Please try again later or contact our support team."
                );
            }

        } catch (error) {
            next(error);
        }
    },
    CreateLoginAttempt: async (req, res, next) => {
        try {

            const {
                ckycId,
                tier
            } = req.body.payload;

            const notAllowedTier = StringToArray(process.env.NOT_ALLOWED_SELLER_TIER, "|");

            const role = notAllowedTier.includes(tier.toUpperCase()) ? 2 : 1; // 1 == seller, 2 == buyer

            const user = {
                role,
                ckyc_id: ckycId
            }

            await Sequelize.transaction(async (transaction) => {

                const findOrCreateUser = await InsertUserLoginAttempt(user, transaction);
                let userData;
                let message;
                let codeStatus;
                let code;

                userData = {
                    ckycId,
                    isAdded: findOrCreateUser,
                    // isSeller: role == 1 // seller
                    isSeller: true // allow all tiers
                };

                if (findOrCreateUser) {
                    code = "USER_ADDED"
                    codeStatus = 201
                    message = "User added";

                } else {
                    code = "USER_EXIST"
                    codeStatus = 200
                    message = "User already exist";
                }

                const userResponse = DataResponseHandler(
                    userData,
                    code,
                    codeStatus,
                    true,
                    message
                )

                const success = SuccessFormatter(userResponse, codeStatus, message);
                SuccessLoggerHelper(req, userResponse);

                res.status(codeStatus).send(success)

            })

        } catch (error) {
            console.error("CreateLoginAttempt error:", error);
            next(error);
        }
    },
    LoginAfterRegister: async (req, res, next) => {
        try {

            const { ckycId } = req.body.payload;
            const userData = req.body.payload;

            const uniqId = ckycId;

            const generateSessionToken = JwtSign(uniqId);

            const tokenCookieOptions = {
                // expires: new Date(Date.now() + 300000),
                // maxAge: 300000, // 5 min
                // path: '/',
                // httOnly: true,
                // secure: true,
                // sameSite: true,
                // domain: process.env.CLIENT_APP_URL,
                httpOnly: process.env.COOKIE_HTTP_ONLY,
                // secure: process.env.COOKIE_SECURE,
                domain: process.env.COOKIE_DOMAIN,
                signed: true,
                maxAge: 3600000, // 1 hour in milliseconds
                // expires: new Date(Date.now() + 3600000), // 1 hour from now
            }

            const userCookieOptions = {
                // expires: new Date(Date.now() + 300000),
                // maxAge: 300000, // 5 min
                // path: '/',
                httpOnly: process.env.COOKIE_HTTP_ONLY,
                // secure: process.env.COOKIE_SECURE,
                // sameSite: true,
                domain: process.env.COOKIE_DOMAIN,
                maxAge: 3600000, // 1 hour in milliseconds
                // expires: new Date(Date.now() + 3600000), // 1 hour from now
            }

            const login = DataResponseHandler(
                uniqId,
                "USER_LOGGED_IN",
                200,
                true,
                "User Logged in Successfully"
            );

            SuccessLoggerHelper(req, login);

            res.cookie(COOKIE_ACCOUNT_SESSION, generateSessionToken, tokenCookieOptions);
            res.cookie(COOKIE_ACCOUNT_DETAILS, userData, userCookieOptions);

            res.status(200).send(login);

        } catch (error) {
            next(error);
        }
    },

}