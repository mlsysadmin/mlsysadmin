require("dotenv").config();
const { JsonWebTokenError, TokenExpiredError, verify, NotBeforeError } = require("jsonwebtoken");
const DayJS = require('dayjs');
const DataResponseHandler = require("../../utils/_helper/DataResponseHandler.helper");

const verifyToken = (req, res, next) => {
    const token =
        req.body.token || req.query.token || req.headers["x-access-token"];

    if (!token) {
        return res.status(403).send("A token is required for authentication");
    }
    try {
        const decoded = verify(token, process.env.SECRET_KEY, {
            maxAge: '5m'
        });
        
        console.log("decoded: ", decoded);
        const payload = decoded;

        const dateNow = DayJS(new Date).format('DD-MM-YYYY');

        const api_key = process.env.API_KEY;

        if (payload.api_key === api_key && payload.date === dateNow) {
            return next(); 
        }else{
            let error = {
                name: "TokenInvalidError",
                message: "Invalid token",
                exp: payload.exp
            };

            throw DataResponseHandler(
                JSON.stringify(error),
                "AUTHENTICATION_FAILED",
                401,
                false,
                "You are not authorized to access the resource"
            )
        }
    } catch (err) {
        // const expiredAt = DayJS(err.expiredAt).format('DD-MM-YYYY');
        const JsonErrors = [JsonWebTokenError, TokenExpiredError, NotBeforeError];
        
        JsonErrors.forEach(e => {
            if (err instanceof e) {
                
                next(
                    DataResponseHandler(
                        JSON.stringify(err),
                        "AUTHENTICATION_FAILED",
                        401,
                        false,
                        "You are not authorized to access the resource"
                    )
                )
            }
        })
        
        next(err);
    }
}

module.exports = verifyToken;
