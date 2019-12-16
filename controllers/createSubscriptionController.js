'use strict';

const routeUtils = require('../utils/routeUtils');
const createSubscriptionService = require('../services/createSubscriptionService');
const statusCode = require('../const/statusCode');

function create(req) {
    const {data} = req.body;
    return createSubscriptionService.create(data);
}

module.exports = {
    create: routeUtils.handleResponse(create, statusCode.CREATED, statusCode.CONFLICT)
};
