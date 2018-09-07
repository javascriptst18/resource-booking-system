const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookingSchema = new Schema({
  bookingID: String,
  resourceID: String,
  bookedByUser: String,
  dateTimeFrom: Date,
  dateTimeTo: Date,
  bookingTimestamp: Date,
  comment: String,
});

module.exports = mongoose.model('Booking', BookingSchema);
