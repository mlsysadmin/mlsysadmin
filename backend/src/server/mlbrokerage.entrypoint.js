'use strict'

require('dotenv').config();
const express = require('express');
const log4js = require("log4js");
const path = require('path');
const cors = require('cors');

const Logger = require('../config/_log/mlbrokerage.logger');
const { USER_ROUTER, LISTING_ROUTER } = require('../routers/router.main');
const { Hash } = require('../utils/_helper/hash.helper');

const app = express();

const PORT = process.env.PORT

const InfoLogger = Logger.Get_logger("default");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(log4js.connectLogger(InfoLogger, { level: "info", format: ":method :url :status", context: true}));
app.use(cors({
    origin: 'http://localhost:3000'
}));

// app.use(express.static(path.join(__dirname, "../../../frontend/public")));

// app.get("/*", (req, res) => {
//   res.sendFile(path.join(__dirname, "../../../frontend/public", "index.html"));
// });

app.use('/api/user', USER_ROUTER);
app.use('/api/listing', LISTING_ROUTER);

app.get('/', (req, res) => {
    // console.log(req);
    res.send("okiieeesss");
})

app.listen(PORT, async () => {
    console.log(`Server listening on port ${PORT}`);
    // InfoLogger.addContext("context", "ML Brokerage");
    // InfoLogger.info(`Server listening on port ${PORT}`)
    console.log(await Hash('password'));
})