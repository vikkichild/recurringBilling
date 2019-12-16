'use strict';

require('dotenv').config();
const ApiContracts = require('authorizenet').APIContracts;
const ApiControllers = require('authorizenet').APIControllers;
const utils = require('../utils');

function createSubscription(userData) {
    const merchantAuthenticationType = new ApiContracts.MerchantAuthenticationType();
    merchantAuthenticationType.setName(process.env.API_LOGIN_ID);
    merchantAuthenticationType.setTransactionKey(process.env.TRANSACTION_KEY);

    const interval = new ApiContracts.PaymentScheduleType.Interval();
    interval.setLength(1);
    interval.setUnit(ApiContracts.ARBSubscriptionUnitEnum.MONTHS);

    const paymentScheduleType = new ApiContracts.PaymentScheduleType();
    paymentScheduleType.setInterval(interval);
    paymentScheduleType.setStartDate(utils.getDate());
    paymentScheduleType.setTotalOccurrences(5);
    paymentScheduleType.setTrialOccurrences(0);

    const creditCard = new ApiContracts.CreditCardType();
    creditCard.setExpirationDate(userData.cardExpDate);
    creditCard.setCardNumber(userData.cardNumber);
    creditCard.setCardCode(userData.cardCode);

    const payment = new ApiContracts.PaymentType();
    payment.setCreditCard(creditCard);

    const orderType = new ApiContracts.OrderType();
    orderType.setInvoiceNumber(utils.getRandomString('Inv:'));
    orderType.setDescription(utils.getRandomString('Description'));

    const customer = new ApiContracts.CustomerType();
    customer.setType(ApiContracts.CustomerTypeEnum.INDIVIDUAL);
    customer.setId(utils.getRandomString('Id'));
    customer.setEmail(userData.email);
    customer.setPhoneNumber(userData.phone);
    customer.setFaxNumber(userData.fax);
    customer.setTaxId(userData.taxId);

    const nameAndAddressType = new ApiContracts.NameAndAddressType();
    nameAndAddressType.setFirstName(userData.firstName);
    nameAndAddressType.setLastName(userData.lastName);
    nameAndAddressType.setCompany(userData.company);
    nameAndAddressType.setAddress(userData.address);
    nameAndAddressType.setCity(userData.city);
    nameAndAddressType.setState(userData.state);
    nameAndAddressType.setZip(userData.zip);
    nameAndAddressType.setCountry(userData.country);

    const arbSubscription = new ApiContracts.ARBSubscriptionType();
    arbSubscription.setName(utils.getRandomString('Name'));
    arbSubscription.setPaymentSchedule(paymentScheduleType);
    arbSubscription.setAmount(utils.getRandomAmount());
    arbSubscription.setTrialAmount(utils.getRandomAmount());
    arbSubscription.setPayment(payment);
    arbSubscription.setOrder(orderType);
    arbSubscription.setCustomer(customer);
    arbSubscription.setBillTo(nameAndAddressType);
    arbSubscription.setShipTo(nameAndAddressType);

    const createRequest = new ApiContracts.ARBCreateSubscriptionRequest();
    createRequest.setMerchantAuthentication(merchantAuthenticationType);
    createRequest.setSubscription(arbSubscription);

    const ctrl = new ApiControllers.ARBCreateSubscriptionController(createRequest.getJSON());

    return new Promise((resolve, reject)=>{
        ctrl.execute(function(){

        const apiResponse = ctrl.getResponse();

        const response = new ApiContracts.ARBCreateSubscriptionResponse(apiResponse);

        resolve(response);
      });
    })
}

if (require.main === module) {
    createSubscription(function(){
        console.log('createSubscription call complete.');
    });
}

module.exports.createSubscription = createSubscription;