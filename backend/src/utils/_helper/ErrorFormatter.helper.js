'use strict'

require("dotenv").config();

const ErrorFormatter = (reqUrl, code, status, message) => {
    return {
        data: {
            code,
            status,
            error:{
                url: reqUrl,
                status,
                message
            }
        }
    }
}

module.exports = ErrorFormatter;