'use strict';

const createSubscription = require('../api/createSubscription');

class CreateSubscriptionService {
    constructor({ createSubscription }) {
        this.createSubscription = createSubscription;
    }

    async create(userData) {
        try {
            const data = await this.createSubscription.createSubscription(userData);
            return data;
        } catch (err) {
            throw err;
        }
    }
}

module.exports = new CreateSubscriptionService({createSubscription});
