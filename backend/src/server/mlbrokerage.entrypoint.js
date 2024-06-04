'use strict'

require('dotenv').config();
const express = require('express');
const log4js = require("log4js");

const Logger = require('../config/_log/mlbrokerage.logger');

const app = express();

const PORT = process.env.PORT

const InfoLogger = Logger.Get_logger("default");

app.use(log4js.connectLogger(InfoLogger, { level: "info", format: ":method :url :status", context: true}));

app.get('/', (req, res) => {
    // console.log(req);
    res.send("ok")
})

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
    // InfoLogger.addContext("context", "ML Brokerage");
    // InfoLogger.info(`Server listening on port ${PORT}`)
})