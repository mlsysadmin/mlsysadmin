const express = require("express");
const LISTING_ROUTER = express.Router();

const auth = require("../../middleware/_auth/jwt.auth.middleware");

const { GetAllListing, AddPropertyListing } = require("../../controllers/_listings/listing.controller");
const { GetAllAmenities } = require("../../controllers/_listings/feature.controller");
const { Validation } = require("../../middleware/_validator/validator.middleware");
const { AddListing } = require('../../utils/_helper/validationSchema.helper');


LISTING_ROUTER.get('/all-listings', auth, GetAllListing);
LISTING_ROUTER.get('/all-amenities', GetAllAmenities);
LISTING_ROUTER.post('/add-listing', Validation(AddListing, "body"), AddPropertyListing);

module.exports = LISTING_ROUTER;
