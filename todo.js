const mongoose = require('mongoose'); // Imports mongoose driver for connection to cloud-hosted mongoDB at mlab.com

const Todo = mongoose.model('Todo', {
  title: {
    type: String,
    required: true
  },
  completed: {
    type: Boolean,
    default: 'false'
  },
  username: {
    type: String
  },
  timestamp: {
    type: String
  }
});

module.exports = Todo;
