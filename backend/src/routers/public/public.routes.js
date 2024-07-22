'use strict'

const express = require("express");
const PUBLIC_ROUTER = express.Router();

const { GetProvince, GetCities, GetCountries } = require("../../controllers/public/location.controller");
const { GetAllMasterListings, GetMasterListingDetails } = require("../../controllers/public/listing.contoller");

PUBLIC_ROUTER.get('/get/provinces', GetProvince);
PUBLIC_ROUTER.get('/get/cities', GetCities);
PUBLIC_ROUTER.get('/get/countries', GetCountries);

PUBLIC_ROUTER.get('/get/listing/all', GetAllMasterListings);
PUBLIC_ROUTER.get('/get/listing/one', GetMasterListingDetails);

module.exports = PUBLIC_ROUTER;

