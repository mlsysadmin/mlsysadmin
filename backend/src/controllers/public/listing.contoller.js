'use strict'
const DayJS = require('dayjs');

const Sequelize = require('../../config/_db/mlbrokerage.db');
const SuccessFormatter = require('../../utils/_helper/SuccessFormatter.helper');
const SuccessLoggerHelper = require('../../utils/_helper/SuccessLogger.helper');
const DataResponseHandler = require('../../utils/_helper/DataResponseHandler.helper');
const { FindAllMasterListingPublic } = require('../../streamline/listing.datastream');

const domain = process.env.COOKIE_DOMAIN;

module.exports = {
    // DONE - LIST OF ACTIVE LISTINGS
    GetAllMasterListings: async (req, res, next) => {
        try {
            
            const GetListings = await Sequelize.transaction(async (transaction) => {

                const getAllListing = await FindAllMasterListingPublic(transaction);

                return getAllListing;

            })
            let listings;
            let listings_log;
            let message;

            if (GetListings.length === 0) {
                listings = DataResponseHandler(
                    GetListings,
                    "NO_LISTING_FOUND",
                    200,
                    true,
                    "SUCCESS"
                );
                listings_log = DataResponseHandler(
                    { listing_count: GetListings.length },
                    "NO_LISTING_FOUND",
                    200,
                    true,
                    "SUCCESS"
                );
                message = "No listing found";
            } else {

                listings = DataResponseHandler(
                    GetListings,
                    "LISTING_RETRIEVED",
                    200,
                    true,
                    "SUCCESS"
                );

                listings_log = DataResponseHandler(
                    { listing_count: GetListings.length },
                    "LISTING_RETRIEVED",
                    200,
                    true,
                    "SUCCESS"
                );
                message = "Retrieved Successfully";

            }

            const success = SuccessFormatter(listings, 200, message);

            SuccessLoggerHelper(req, listings_log);

            // const cookieOptions = {
            //     expires: new Date(Date.now() + 300000),
            //     maxAge: 300000, // 5 min
            //     path: '/',
            //     httOnly: true,
            //     secure: true,
            //     sameSite: true,
            //     domain,
            //     signed:true
            //     // expires: new Date(Date.now() + 900000)
            // }

            // res.cookie('listings', GetListings, cookieOptions)

            res.status(200).send(success);

        } catch (error) {
            console.log("EERRR", error);
            next(error);
        }
    },
}
