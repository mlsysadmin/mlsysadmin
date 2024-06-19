'use strict'

require("dotenv").config();
const Logger = require('../../config/_log/mlbrokerage.logger');
const ErrorFormatter = require("./ErrorFormatter.helper");

const ErrLogger = Logger.Get_logger("error");
const FatalLogger = Logger.Get_logger("fatal");

const ErrorHandler = async (error, request, response, next) => {
    try {
        
        console.log(error);
        let errorContext = {
            REQ: {
                url: request.url,
                method: request.method,
                query: request.query,
                params: request.params,
                body: request.body,
            },
            RES: {
                data: error.data,
                status: error.status,
                code: error.code,
                message: error.message
            }
        }

        ErrLogger.addContext('context', `Logging.. | ML BROKERAGE`);
        ErrLogger.error(JSON.stringify(errorContext));

        const err = ErrorFormatter(request.url, error.code, error.status, error.message)

        response.send(err);

    } catch (error) {
        console.log(error);

        FatalLogger.addContext('context', `Logging.. | ML BROKERAGE`);
        FatalLogger.fatal(error.toString());

        let err = ErrorFormatter(request.url, "SERVER_ERROR", 500, "We're sorry, something went wrong on our end. Please try again later or contact our support team.")
        response.send(err).status(500)
    }
}

module.exports = ErrorHandler;