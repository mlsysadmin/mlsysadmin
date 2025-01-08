'use strict'

require('dotenv').config();
const { SendEmail, EmailTemplate } = require('../../../services/email.service.js');
const { StringToArray, ToPascalCase } = require('../../../utils/_helper/DataFunctions.helper.js');
const DataResponseHandler = require('../../../utils/_helper/DataResponseHandler.helper.js');
const SuccessFormatter = require('../../../utils/_helper/SuccessFormatter.helper.js');
const SuccessLoggerHelper = require('../../../utils/_helper/SuccessLogger.helper.js');
const fs = require('fs');
const axios = require('axios');

// Function to encode image as Base64
async function encodeImageUrlToBase64(imageUrl) {
    try {
        // Fetch the image as binary data
        const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });

        // Convert binary data to Base64
        const base64 = Buffer.from(response.data).toString('base64');
console.log(response.headers);

        // Return the Base64 with MIME type
        return `data:${response.headers['content-type']};base64,${base64}`;
    } catch (error) {
        console.error('Error encoding image to Base64:', error.message);
        return null;
    }
}

module.exports = {
    SendInquiry: async (req, res, next) => {
        try {
            const payload = req.body.payload;

            const path = 'inquiry.handlebars';

            const messageContent = {
                name: payload.name,
                email: payload.email,
                phone: payload.phone,
                message: payload.message,
                listingTitle: payload.listingTitle,
                propertyNo: payload.propertyNo,
            }

            const emailTemp = EmailTemplate(path, { ...messageContent });

            const emailTo = StringToArray(process.env.EMAIL_TO, '|');

            const sendInquiry = await SendEmail(emailTemp, 'Brokerage Client: Listing Inquiry', payload.message, emailTo);

            console.log(sendInquiry);

            res.send({ sendInquiry });


        } catch (error) {
            console.log('dsff', error);
            res.send(error)
        }
    },
    SendMessage: async (req, res, next) => {
        try {

            console.log(req.body);

            const payload = req.body.payload;

            const templateName = 'message.handlebars';

            const messageContent = {
                name: payload.name,
                email: payload.email,
                phone: payload.phone,
                message: payload.message,
            }

            const emailTemp = EmailTemplate(templateName, { ...messageContent });

            const emailTo = StringToArray(process.env.EMAIL_TO, '|');

            const sendMessage = await SendEmail(emailTemp, 'Brokerage Client: Customer Inquiry', payload.message, emailTo);

            console.log(sendMessage);

            res.send({ sendMessage });


        } catch (error) {
            console.log('dsff', error);
            next(error);
        }
    },

    SendRefinancing: async (req, res, next) => {
        try {

            const {
                reason, interest, property_type, property_usage,
                estimated_price, loan_balance, cash_take_out,
                employment_status, annual_income,
                declared_bankruptcy, late_mortgage_payments,
                current_credit_score, home_location, mobile_number,
                email, last_name, first_name,
                country, province, city,
                zipcode, others, source_of_income
            } = req.body.payload;

            const customerInfo = {
                name: `${last_name}, ${first_name}`,
                mobile_number, email,
                country, province, city,
                zipcode, others, source_of_income
            }

            const property = {
                reason, interest, property_type,
                property_usage, estimated_price,
            }

            const loan = {
                loan_balance, cash_take_out,
            }

            const details = {
                employment_status, annual_income,
                declared_bankruptcy, late_mortgage_payments,
                current_credit_score, home_location
            }

            const templateName = 'refinance.handlebars';

            const emailTemp = EmailTemplate(templateName, { customerInfo, property, loan, details });

            const reference = new Date();

            const emailTo = StringToArray(process.env.EMAIL_TO, '|');

            const sendMessage = await SendEmail(emailTemp, 'Brokerage Client: Refinancing (Refinance a Home)', reference, emailTo);

            console.log(sendMessage);

            res.send({ sendMessage });


        } catch (error) {
            next(error);
        }
    },
    SendBuyHome: async (req, res, next) => {
        try {

            const {
                estimated_price, property_type, property_usage,
                real_estate_agent, purchase_plan_date,
                current_home_ownership, plan_to_sell_current_home, estimated_downpayment,
                employment_status, declared_bankruptcy, annual_income,
                current_credit_score, home_location, mobile_number,
                email, last_name, first_name,
                country, province, city,
                zipcode, others, source_of_income
            } = req.body.payload;

            const customerInfo = {
                name: `${last_name}, ${first_name}`,
                mobile_number, email,
                country, province, city,
                zipcode, others, source_of_income
            }

            const property = {
                estimated_price, property_type,
                property_usage, real_estate_agent
            }

            const timeline = {
                purchase_plan_date, current_home_ownership,
                plan_to_sell_current_home
            }

            const details = {
                estimated_downpayment, employment_status, annual_income,
                declared_bankruptcy, current_credit_score, home_location
            }

            const templateName = 'buyahome.handlebars';

            const emailTemp = EmailTemplate(templateName, { customerInfo, property, timeline, details });

            const reference = new Date();

            const emailTo = StringToArray(process.env.EMAIL_TO, '|');

            const sendMessage = await SendEmail(emailTemp, 'Brokerage Client: Refinancing (Buy a Home)', reference, emailTo);

            console.log(sendMessage);

            res.send({ sendMessage });


        } catch (error) {
            next(error);
        }
    },
    SendSearchProperty: async (req, res, next) => {
        try {

            const {
                property_type, property_details,
                location_preference, budget_range,
                no_of_bedrooms, no_of_bathrooms, feature_and_amenities,
                mobile_number, email, last_name, first_name, suffix, middle_name
            } = req.body.payload;

            let fullname = `${first_name} ${middle_name} ${last_name} ${suffix}`;

            fullname = fullname.split(" ")
                .filter(f => !["null", null, undefined, "undefined", "", "none"].includes(f.toLowerCase()))
                .map(f => f.trim()).join(" ");

            const customerInfo = {
                name: fullname,
                mobile_number, email,
            }

            const property = {
                property_type, property_details, location_preference,
                budget_range, no_of_bedrooms, no_of_bathrooms,
                feature_and_amenities
            }

            const templateName = 'searchproperty.handlebars';

            const emailTemp = EmailTemplate(templateName, { customerInfo, property });

            const reference = new Date();

            const emailTo = StringToArray(process.env.EMAIL_TO, '|');

            const sendMessage = await SendEmail(emailTemp, 'Brokerage Client: Request for a Search of Property', reference, emailTo);

            console.log(sendMessage);

            res.send({ sendMessage });


        } catch (error) {
            next(error);
        }
    },
    SendListingApproved: async (req, res, next) => {
        try {

            let {
                name, image_path, property_title, email, sale_type, price, property_no, approval_status
            } = req.body.payload;

            price = price.toLocaleString({
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            });

            name = ToPascalCase(name);

            if (sale_type == "rent") {
                price = `${price} / mo.`;
            }

            const image_link = `${process.env.IGOT_SOLUTION_BASE_URL}${image_path}`
            const link = `${process.env.CLIENT_APP_URL}/previewListing/?id=${property_no}`;
            const logo = `${process.env.IGOT_SOLUTION_BASE_URL}/assets/logo.png`;

            // const cardPhoto = await encodeImageUrlToBase64(image_link);
            const logoPhoto = await encodeImageUrlToBase64(logo);
            console.log(logoPhoto);
            

            let templateName;
            let subject;

            if (approval_status.toLowerCase() == "approved") {
                templateName = 'approvedlisting.handlebars'
                subject = 'Great News! Your Listing Is Now Live'
            } else {
                templateName = 'rejectedlisting.handlebars'
                subject = 'Your Listing Needs Attention to Meet Approval Requirements'
            }

            const emailTemp = EmailTemplate(templateName, { name, image_link, property_title, sale_type, price, link, logoPhoto });

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
    }

}