const express = require('express');
const moment = require('moment');
const bookingController = express.Router();
const booking = require('./bookingModel');
const jwtVerification = require('../authentication/jwtVerification');

bookingController.get('/', (request, response) => {
  booking.find({}, function(error, bookings) {
    if (error) return response.status(500).send('HTTP 500 INTERNAL SERVER ERROR');
    response.status(200).send(bookings);
  });
});

module.exports = bookingController;
