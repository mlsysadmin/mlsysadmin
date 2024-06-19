'use strict'

const { User, Role } = require('../models/main.model');
const Sequelize = require('../config/_db/mlbrokerage.db');
const { VerifyHash } = require('../utils/_helper/hash.helper');

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
                    
                    return {
                        data: findUser,
                        status: 200,
                        success: true,
                        message: "SUCCESS"
                    };
                }
                return {
                    data: null,
                    code: "AUTHENTICATION_ERROR",
                    status: 401,
                    success: false,
                    message: 'Email or Password is incorrect'
                }
            
            }
            
            return {
                data: null,
                code: "AUTHENTICATION_ERROR",
                status: 401,
                success: false,
                message: 'Email or Password is incorrect'
            }
        })

        } catch (error) {
            console.log("error", error);
            throw error
        }
    }
}