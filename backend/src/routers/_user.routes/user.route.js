const express = require("express");
const USER_ROUTER = express.Router();

const auth = require("../../middleware/_auth/jwt.auth.middleware");
const { Login } = require("../../controllers/_users/user.controller");
const { Validation } = require("../../middleware/_validator/validator.middleware");
const ValidationSchema = require("../../utils/_helper/validationSchema.helper");

USER_ROUTER.post('/login', Validation(ValidationSchema.LoginBody, "body"), Login);

module.exports = USER_ROUTER;