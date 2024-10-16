'use strict'

const { SendEmail, EmailTemplate } = require('../../services/email.service.js');

require('dotenv').config();


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

            const emailTemp = EmailTemplate(path, {...messageContent});

            const sendInquiry = await SendEmail(emailTemp, 'Listing Inquiry', payload.message);

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

            const emailTemp = EmailTemplate(templateName, {...messageContent});

            const sendMessage = await SendEmail(emailTemp, 'Customer Inquiry', payload.message);

            console.log(sendMessage);

            res.send({ sendMessage });
            

        } catch (error) {
            console.log('dsff', error);
            next(error);
        }
    },

}