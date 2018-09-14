const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookingSchema = new Schema({
  bookingID: Schema.Types.ObjectId,
  bookingReference: String,
  name: String,
  resourceID: { type: Schema.Types.ObjectId, ref: 'Resource' },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
});

module.exports = mongoose.model('Booking', BookingSchema);
