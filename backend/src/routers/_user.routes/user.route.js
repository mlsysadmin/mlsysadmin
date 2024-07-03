const express = require("express");
const USER_ROUTER = express.Router();

const auth = require("../../middleware/_auth/jwt.auth.middleware");
const { Login, Register, SearchUser, SearchKyc } = require("../../controllers/_users/user.controller");
const { Validation } = require("../../middleware/_validator/validator.middleware");
const ValidationSchema = require("../../utils/_helper/validationSchema.helper");
const verifyApiKey = require("../../middleware/_auth/api.auth.middleware");

USER_ROUTER.post('/login', Validation(ValidationSchema.LoginBody, "body"), Login);
// USER_ROUTER.post('/register', Validation(ValidationSchema.RegisterBody, "body"), Register);
USER_ROUTER.post('/register', Register);
USER_ROUTER.post('/search-user', verifyApiKey, SearchUser);
USER_ROUTER.post('/search-kyc', verifyApiKey, SearchKyc);

module.exports = USER_ROUTER;