'use strict'

require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');

const Logger = require('../config/_log/mlbrokerage.logger');
const { USER_ROUTER, LISTING_ROUTER } = require('../routers/router.main');
const ErrorHandler = require('../utils/_helper/ErrorHandler.helper');

const app = express();

const PORT = process.env.PORT

const InfoLogger = Logger.Get_logger("default");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet({
    maxAge: 31536000
}))
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));

// app.use(express.static(path.join(__dirname, "../../../frontend/public")));

// app.get("/*", (req, res) => {
//   res.sendFile(path.join(__dirname, "../../../frontend/public", "index.html"));
// });

app.use('/api/user', USER_ROUTER);
app.use('/api/listing', LISTING_ROUTER);

app.use(ErrorHandler);

app.listen(PORT, async () => {
    console.log(`Server listening on port ${PORT}`);
    InfoLogger.addContext("context", "ML Brokerage");
    InfoLogger.info(`Server listening on port ${PORT}`)
})