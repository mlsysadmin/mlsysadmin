require("dotenv").config();
const jwt = require("jsonwebtoken");
const DayJS = require('dayjs');

module.exports = {
    JwtSign: () => {

        const dateNow = DayJS(new Date).format('DD-MM-YYYY');

        const payload = {
            api_key: process.env.API_KEY,
            date: dateNow
        }

        const token = jwt.sign(payload,
        process.env.SECRET_KEY,
            { 
                expiresIn: Math.floor(Date.now() / 1000) + (5 * 60) // 5 minutes
                // expiresIn: Math.floor(Date.now() / 1000) + 5 // 5 seconds
            }
        )
        return token;
        
    }
}