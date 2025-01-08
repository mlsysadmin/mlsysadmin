'use strict'

const express = require("express");
const ADMIN_EMAIL = express.Router();

const { SendEmailAgentRegistration, SendEmailResetPassword } = require("../../../controllers/email/admin/admin_email.controller");
const { Validation } = require("../../../middleware/_validator/validator.middleware");
const { AgentAccountReg, ResetPassword } = require("../../../utils/_helper/validationSchema.helper");
const verifyApiKey = require("../../../middleware/_auth/api.auth.middleware");


ADMIN_EMAIL.post('/mail/account-registration', Validation(AgentAccountReg, 'body', 'payload'), SendEmailAgentRegistration);
ADMIN_EMAIL.post('/mail/reset-password', Validation(ResetPassword, 'body', 'payload'), SendEmailResetPassword);

module.exports = ADMIN_EMAIL;

