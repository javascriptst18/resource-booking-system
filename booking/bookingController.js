const express  = require('express');
const bookingController = express.Router();
const booking = require('./bookingModel');
const jwtVerification = require('../authentication/jwtVerification');

bookingController.get('/:id/:date', jwtVerification, (request, response) => {
    let query = {
        roomId: request.params.id,
        date: {$gte: request.params.date, $lt: moment(request.params.date).add(1, 'day').toISOString() }
    };

    booking.find(query, (error, bookings) => {
        if(error) response.status(500).send(error);
        if(!bookings) response.status(404).send('Booking not found.');
        response.status(200).json(bookings);
    });

});

module.exports = bookingController;
