const mongoose = require('mongoose'); // Imports mongoose driver for connection to cloud-hosted mongoDB at mlab.com

const Resource = mongoose.model('Resource', {

  resourceID: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  bookings: {
    type: Array
  },
  description: {
    type: String,
    required: true
  },
  created: {
    type: String
  }
});

module.exports = Resource;
