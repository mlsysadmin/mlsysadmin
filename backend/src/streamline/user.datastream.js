'use strict'

const { User, Role } = require('../models/main.model');
const Sequelize = require('../config/_db/mlbrokerage.db');
const { VerifyHash } = require('../utils/_helper/hash.helper');
const DataResponseHandlerHelper = require('../utils/_helper/DataResponseHandler.helper');

module.exports = {
    FindUserOne: async (user) => {
        try {
        const { email, password } = user;

         return await Sequelize.transaction(async (transaction) => {
           const findUser = await User.findOne({
                where: {
                    email,
                },
                include: Role,
                transaction
           })

            if (findUser) {
               const verifyPassword = await VerifyHash(password, findUser.password);

                if (verifyPassword) {
                    return DataResponseHandlerHelper(
                        findUser,
                        "VERIFY_SUCCESS",
                        200,
                        true,
                        "SUCCESS"
                    )
                }
                return DataResponseHandlerHelper(
                    null, 
                    "AUTHENTICATION_ERROR",
                    401,
                    false,
                    "Email or Password is incorrect"
                );
            
            }
            return DataResponseHandlerHelper(
                null, 
                "AUTHENTICATION_ERROR",
                401,
                false,
                "Email or Password is incorrect"
            );
        })

        } catch (error) {
            console.log("error", error);
            // if (error instanceof TypeError) {
                
            // }
            throw error
        }
    }
}