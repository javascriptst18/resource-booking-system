const express = require('express');
const { BookingModel } = require('../models');

const BookingRouter = express.Router();

BookingRouter.route('/bookings/')
  .get((request, response) => {
    BookingModel.find({}, (error, bookings) => {
      if (error) return response.status(500).send('HTTP 500 INTERNAL SERVER ERROR');
      response.status(200).send(bookings);
    });
  })
  .post((request, response) => {
    BookingModel.create(
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

BookingRouter.route('/bookings/:id').delete((request, response) => {
  BookingModel.findByIdAndRemove(request.params.id, (error, resource) => {
    if (error) return response.status(500).send('HTTP 500 INTERNAL SERVER ERROR');
    response.status(200).send(`Booking: ${request.params.id} was deleted.`);
  });
});

module.exports = BookingRouter;
