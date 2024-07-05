const express = require("express");
const LISTING_ROUTER = express.Router();

const auth = require("../../middleware/_auth/jwt.auth.middleware");

const { 
    GetAllListing, 
    AddPropertyListing, 
    GetApproverByLevel, 
    GetListingByMasterId 
} = require("../../controllers/_listings/listing.controller");
const { GetAllAmenities } = require("../../controllers/_listings/feature.controller");
const { Validation } = require("../../middleware/_validator/validator.middleware");
const { 
    AddListing, 
    ValidateListingParamMasterId,
    master_id
} = require('../../utils/_helper/validationSchema.helper');

// GET
LISTING_ROUTER.get('/all-listings', auth, GetAllListing);
LISTING_ROUTER.get('/all-amenities', GetAllAmenities);
LISTING_ROUTER.get('/get/approver', GetApproverByLevel);
LISTING_ROUTER.get('/get/one-listing/:master_id', auth, Validation(master_id, "params", "master_id"), GetListingByMasterId);

// POST
LISTING_ROUTER.post('/add-listing', Validation(AddListing, "body", 'payload'), AddPropertyListing);

module.exports = LISTING_ROUTER;
