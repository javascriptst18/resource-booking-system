const mongoose = require('mongoose'); // Imports mongoose driver for connection to cloud-hosted mongoDB at mlab.com

const Booking = mongoose.model('Booking', {
  bookingID: {
    type: String
  },
  resource: {
    type: Object
  },
  bookedByUser: {
    type: String
  },
  bookingTimestamp:{
    type: String
  },
  date: {
    type: String
  },
  startTime: {
    type: String
  },
  endTime: {
    type: String
  },
  comment: {
    type: String,
    required: true
  }
});

module.exports = Booking;
