const express = require('express');
const bodyParser = require('body-parser');

const bookingController = express.Router();
const { Booking } = require('./models');
const jwtVerification = require('./authentication/jwtVerification');

bookingController.use(bodyParser.urlencoded({ extended: true }));
bookingController.use(bodyParser.json());

bookingController.route('/')
  .get((request, response) => {
    Booking.find({}, (error, bookings) => {
      if (error) return response.status(500).send('HTTP 500 INTERNAL SERVER ERROR');
      response.status(200).send(bookings);
    });
  })
  .post((request, response) => {
    Booking.create(
      {
        name: request.body.username,
        resourceID: request.body.resourceID,
        startTime: request.body.startTime,
        endTime: request.body.endTime,
      },
      (error, booking) => {
        if (error) return response.status(500).send('HTTP 500 INTERNAL SERVER ERROR');
        return response.status(200).send(booking);
      },
    );
  });

bookingController.delete('/:id', (request, response) => {
  Booking.findByIdAndRemove(request.params.id, (error, resource) => {
    if (error) return response.status(500).send('HTTP 500 INTERNAL SERVER ERROR');
    response.status(200).send(`Booking: ${request.params.id} was deleted.`);
  });
});

module.exports = bookingController;
