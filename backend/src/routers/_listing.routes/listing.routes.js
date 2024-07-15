const express = require("express");
const LISTING_ROUTER = express.Router();

const auth = require("../../middleware/_auth/jwt.auth.middleware");

const { 
    AddPropertyListing, 
    GetApproverByLevel, 
    GetListingByMasterId 
} = require("../../controllers/_listings/listing.controller");
const { GetAllAmenities } = require("../../controllers/_listings/feature.controller");
const { Validation } = require("../../middleware/_validator/validator.middleware");
const { 
    AddListing, 
    listing_id
} = require('../../utils/_helper/validationSchema.helper');

// GET
LISTING_ROUTER.get('/get/all-amenities', auth, GetAllAmenities);
LISTING_ROUTER.get('/get/approver', GetApproverByLevel);
LISTING_ROUTER.get('/get/one-listing', auth, Validation(listing_id, "query", "listing_id"), GetListingByMasterId);

// POST
// LISTING_ROUTER.post('/add-listing', Validation(AddListing, "body", 'payload'), AddPropertyListing);

module.exports = LISTING_ROUTER;
