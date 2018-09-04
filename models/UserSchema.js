const mongoose = require('mongoose'); // Imports mongoose driver for connection to cloud-hosted mongoDB at mlab.com

const UserSchema = new mongoose.Schema({
  username: String,
  password: String
});

module.exports = UserSchema;
