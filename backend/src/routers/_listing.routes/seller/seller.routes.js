const express = require("express");
const SELLER_ROUTER = express.Router();

const api_auth = require("../../../middleware/_auth/api.auth.middleware");


const { Validation } = require("../../../middleware/_validator/validator.middleware");
const { 
    seler_id,
    ListingBody,
    DraftListingBody
} = require('../../../utils/_helper/validationSchema.helper');
const { GetAllSellerListings, AddPropertyListing, DraftPropertyListing } = require("../../../controllers/_listings/seller/seller.listing.controller");

// GET
SELLER_ROUTER.get('/get/all-listings/:seller_id', api_auth, Validation(seler_id, "params", "seller_id"), GetAllSellerListings);

// POST
SELLER_ROUTER.post('/add-listing', api_auth, Validation(ListingBody, "body", 'payload'), AddPropertyListing);
SELLER_ROUTER.post('/save-draft-listing', Validation(DraftListingBody, "body", 'payload'), DraftPropertyListing);

module.exports = SELLER_ROUTER;
