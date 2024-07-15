const express = require("express");
const SUPPORT_ROUTER = express.Router();

const auth = require("../../../middleware/_auth/jwt.auth.middleware");

const { Validation } = require("../../../middleware/_validator/validator.middleware");
const {
    listing_id,
    EditListingBody
} = require('../../../utils/_helper/validationSchema.helper');
const { EditPropertyListing } = require("../../../controllers/_listings/support/support.listing.controller");

// GET

// POST
SUPPORT_ROUTER.post('/update-listing',
    Validation(listing_id, "query", 'listing_id'),
    Validation(EditListingBody, "body", 'payload'), EditPropertyListing
);

module.exports = SUPPORT_ROUTER;
