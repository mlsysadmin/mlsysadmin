const express = require("express");
const USER_ROUTER = express.Router();

const auth = require("../../middleware/_auth/jwt.auth.middleware");
const { Login, Register, SearchUser, SearchKyc } = require("../../controllers/_users/user.controller");
const { Validation } = require("../../middleware/_validator/validator.middleware");
const {
    searchKyc, LoginBody
} = require("../../utils/_helper/validationSchema.helper");
const verifyApiKey = require("../../middleware/_auth/api.auth.middleware");

USER_ROUTER.post('/login', Validation(LoginBody, "body"), Login);
// USER_ROUTER.post('/register', Validation(ValidationSchema.RegisterBody, "body"), Register);
USER_ROUTER.post('/register', Register);
USER_ROUTER.post('/search-user', verifyApiKey, SearchUser);
USER_ROUTER.post('/search-kyc', auth, Validation(searchKyc, 'body', 'payload'), SearchKyc);

module.exports = USER_ROUTER;