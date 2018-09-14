const express = require('express');
const moment = require('moment');
const bodyParser = require('body-parser');
const bookingController = express.Router();
const booking = require('./bookingModel');
const jwtVerification = require('../authentication/jwtVerification');

bookingController.use(bodyParser.urlencoded({ extended: true }));
bookingController.use(bodyParser.json());

bookingController.get('/', (request, response) => {
  booking.find({}, function(error, bookings) {
    if (error) return response.status(500).send('HTTP 500 INTERNAL SERVER ERROR');
    response.status(200).send(bookings);
  });
});

bookingController.post('/', function(request, response) {
  booking.create(
    {
      name: request.body.username,
      resourceID: request.body.resourceID,
      startTime: request.body.startTime,
      endTime: request.body.endTime,
    },
    function(error, booking) {
      if (error) return response.status(500).send('HTTP 500 INTERNAL SERVER ERROR');
      response.status(200).send(booking);
    },
  );
});

bookingController.delete('/:id', (request, response) => {
  booking.findByIdAndRemove(request.params.id, (error, resource) => {
    if (error) return response.status(500).send('HTTP 500 INTERNAL SERVER ERROR');
    response.status(200).send(`Booking: ${request.params.id} was deleted.`);
  });
});

module.exports = bookingController;
