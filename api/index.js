'use strict';

module.exports = {
    cancelSubscription: require('./cancelSubscription.js').cancelSubscription,
    createSubscription: require('./createSubscription.js').createSubscription,
    getListOfSubscriptions: require('./getListOfSubscriptions.js').getListOfSubscriptions,
    getSubscription: require('./getSubscription.js').getSubscription,
    getSubscriptionStatus: require('./getSubscriptionStatus.js').getSubscriptionStatus,
    updateSubscription: require('./updateSubscription.js').updateSubscription
};