const express = require('express')
const router = express.Router()
const Booking = require('../models/booking');

/** ********************** /open view **************************** */

router.get('/', (request, response) => {
  Booking.find({})
    .then((documents) => {
      response.json(documents);
    });
});

router.get('/:id', (request, response) => {
  const bookingID = request.params.id.toString();
  Booking.find({ bookingID })
    .then((document) => {
      response.json(document);
    });
});

module.exports = router;
