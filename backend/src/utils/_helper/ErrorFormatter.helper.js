'use strict'

require("dotenv").config();

const ErrorFormatter = (code, status, message, data) => {
    return {
        data: {
            code,
            status,
            error:{
                data,
                status,
                message
            }
        }
    }
}

module.exports = ErrorFormatter;