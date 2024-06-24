require("dotenv").config();
const jwt = require("jsonwebtoken");
const DayJS = require('dayjs');

const verifyToken = (req, res, next) => {
    const token =
        req.body.token || req.query.token || req.headers["x-access-token"];

    if (!token) {
        return res.status(403).send("A token is required for authentication");
    }
    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY, {
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

            throw error
        }
    } catch (err) {
        console.log(err);
        // const expiredAt = DayJS(err.expiredAt).format('DD-MM-YYYY');
        
        return res.status(401).send(err);
    }
}

module.exports = verifyToken;
