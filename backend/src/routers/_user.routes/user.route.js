const express = require("express");
const USER_ROUTER = express.Router();

const auth = require("../../middleware/_auth/jwt.auth.middleware");
const { Login } = require("../../controllers/_users/user.controller");

USER_ROUTER.post('/login', Login);

module.exports = USER_ROUTER;