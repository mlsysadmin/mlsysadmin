'use strict'

const { JwtSign } = require("../../services/jwt.auth.service");
const { FindUserOne } = require("../../streamline/user.datastream");
const SuccessFormatter = require("../../utils/_helper/SuccessFormatter.helper");

module.exports = {
    Login: async (req, res, next) => {
        try {

            const user = await FindUserOne(req.body.payload);
            
            if (user.data) {

                const token = JwtSign();

                // const cookieOptions = {
                //     maxAge: Math.floor(Date.now() / 1000) + (5 * 60), // 5 min
                //     path: '/',
                //     httOnly: true,
                //     secure: true,
                //     sameSite: true,
                //     domain: '.mlhuillier.com'
                // }

                // res.cookie('access_token', token, cookieOptions)
                // res.cookie('user', JSON.stringify(user), cookieOptions)

                res.append('Set-Cookie',`access_token=${token};MaxAge=${Math.floor(Date.now() / 1000) + (5 * 60)};Path=/;HttOnly=true;Secure=true;SameSite=true;Domain=localhost`)
                res.append('Set-Cookie',`account_details=${JSON.stringify(user.data)};MaxAge=${Math.floor(Date.now() / 1000) + (5 * 60)};Path=/;HttOnly=true;Secure=true;SameSite=true;Domain=localhost`)

                const success = SuccessFormatter(user, 200, "Logged In Successfully")
                res.status(200).send(success);

            }
            else{
                throw user
            }

        } catch (error) {
            next(error)
        }
    }
}