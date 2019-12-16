'use strict';

const express = require('express');
const createSubscriptionController = require('../controllers/createSubscriptionController');

const router = express.Router();

router.route('/')
    .post(createSubscriptionController.create);

module.exports = router;
