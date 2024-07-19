const express = require("express");
const SUPPORT_ROUTER = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const auth = require("../../../middleware/_auth/jwt.auth.middleware");

const { Validation } = require("../../../middleware/_validator/validator.middleware");
const {
    listing_id,
    EditListingBody,
    UpdateApprovalBody,
    approver_email,
    ListingByApprover
} = require('../../../utils/_helper/validationSchema.helper');
const { EditPropertyListing, ListingApprovalEscalation, GetForApprovalListingByApprover } = require("../../../controllers/_listings/support/support.listing.controller");

// POST
SUPPORT_ROUTER.post('/update-listing',
    Validation(listing_id, "query", 'listing_id'), upload.none(),
    Validation(EditListingBody, "body", 'payload'), EditPropertyListing
);

SUPPORT_ROUTER.post('/update-approval', 
    Validation(UpdateApprovalBody, 'body', 'payload'), 
    ListingApprovalEscalation
);

// GET
SUPPORT_ROUTER.get('/get/listing/for-approval', Validation(ListingByApprover, 'query', 'payload'), GetForApprovalListingByApprover)

module.exports = SUPPORT_ROUTER;
