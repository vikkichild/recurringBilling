'use strict';

const express = require('express');

const router = express.Router();

const subscribeRoute = require('./subscribeRoute');

router.use('/subscribe', subscribeRoute);

module.exports = router;
