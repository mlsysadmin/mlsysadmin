const express = require("express");
const LISTING_ROUTER = express.Router();

const auth = require("../../middleware/_auth/jwt.auth.middleware");
const { GetAllListing } = require("../../controllers/_listings/listing.controller");

LISTING_ROUTER.get('/all-listings', auth, GetAllListing);

module.exports = LISTING_ROUTER;
