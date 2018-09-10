const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookingSchema = new Schema({
    bookingID: String,
    username: { type: Schema.Types.ObjectId, ref: 'User'},
    resourceID: { type: Schema.Types.ObjectId, ref: 'Resource'},
    date: { type: Date }
});

module.exports = mongoose.model("Booking", BookingSchema);
