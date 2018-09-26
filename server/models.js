const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const { Schema } = mongoose;

const UserModel = mongoose.model(
  'User',
  new Schema({
    name: String,
    email: String,
  }).plugin(passportLocalMongoose),
);

const ResourceModel = mongoose.model(
  'Resource',
  new Schema({
    resourceID: Schema.Types.ObjectId,
    identifier: String,
    category: String,
    bookings: [{ type: Schema.Types.ObjectId, ref: 'Booking' }],
    tags: Array,
    description: String,
    availableDays: {
      type: Array,
      default: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    },
    availableTimes: Array,
  }),
);

const BookingModel = mongoose.model(
  'Booking',
  new Schema({
    bookingID: Schema.Types.ObjectId,
    bookingReference: String,
    name: String,
    resourceID: { type: Schema.Types.ObjectId, ref: 'Resource' },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
  }),
);

module.exports = { UserModel, ResourceModel, BookingModel };
