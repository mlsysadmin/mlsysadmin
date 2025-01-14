'use strict'
require('dotenv').config();

const { EmailTemplate, SendEmail } = require('../../../services/email.service');
const { encodeImageUrlToBase64, ToPascalCase } = require('../../../utils/_helper/DataFunctions.helper');
const DataResponseHandler = require('../../../utils/_helper/DataResponseHandler.helper');
const SuccessFormatter = require('../../../utils/_helper/SuccessFormatter.helper');
const SuccessLoggerHelper = require('../../../utils/_helper/SuccessLogger.helper');

module.exports = {
    SendEmailAgentRegistration: async (req, res, next) => {
        try {

            let {
                name, email, token, redirect_url
            } = req.body.payload;

            name = ToPascalCase(name);

            const logo = `${process.env.IGOT_SOLUTION_BASE_URL}/assets/logo.png`;

            const logoPhoto = await encodeImageUrlToBase64(logo);
            const link = `${redirect_url}/${token}`;
            // const apiUrl = `${process.env.SERVER_APP_URL}/api/admin/mail/reg-redirect`; // to be removed

            let templateName = 'agentRegistration.handlebars';

            let subject = 'We’re Excited to Have You! Create Your Account Now';

            const emailTemp = EmailTemplate(templateName, { name, logo, link });

            const reference = new Date();

            const sendMessage = await SendEmail(emailTemp, subject, reference, email);

            const mail = DataResponseHandler(
                { response: sendMessage.response, accepted: sendMessage.accepted, rejected: sendMessage.rejected },
                "EMAIL_SENT",
                200,
                true,
                "SUCCESS"
            )
            const success = SuccessFormatter(mail, 200, "Email Sent");

            SuccessLoggerHelper(req, mail);

            res.send(success);

        } catch (error) {
            next(error);
        }
    },
    SendEmailResetPassword: async (req, res, next) => {
        try {

            let {
                name, email, token, redirect_url, expiration_date
            } = req.body.payload;

            name = ToPascalCase(name);
            expiration_date = new Date(expiration_date);
            console.log("expiration_date", expiration_date);

            const year = expiration_date.getFullYear();
            const day = String(expiration_date.getDate()).padStart(2, '0');

            const monthName = expiration_date.toLocaleString('default', { month: 'long' });

            const expireDate = `${monthName} ${day}, ${year}`;
            const expireTime = expiration_date.toLocaleTimeString('en-US', {
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric',
                hour12: true,
            });

            const logo = `${process.env.IGOT_SOLUTION_BASE_URL}/assets/logo.png`;

            const logoPhoto = await encodeImageUrlToBase64(logo);
            const link = `${redirect_url}/${token}`;

            let templateName = 'adminResetPassword.handlebars';

            let subject = 'Let’s Get You Back In – Reset Your Password';

            const emailTemp = EmailTemplate(templateName, { name, logo, link, expireDate, expireTime });

            const reference = new Date();

            const sendMessage = await SendEmail(emailTemp, subject, reference, email);

            const mail = DataResponseHandler(
                { response: sendMessage.response, accepted: sendMessage.accepted, rejected: sendMessage.rejected },
                "EMAIL_SENT",
                200,
                true,
                "SUCCESS"
            )
            const success = SuccessFormatter(mail, 200, "Email Sent");

            SuccessLoggerHelper(req, mail);

            res.send(success);

        } catch (error) {
            next(error);
        }
    },
}