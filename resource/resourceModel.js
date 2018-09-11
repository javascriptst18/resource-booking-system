'use strict'
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ResourceSchema = new Schema({
    resourceID: Schema.Types.ObjectId,
    name: String,
    category: String,
    bookings: [{ type: Schema.Types.ObjectId, ref: 'Booking' }],
    tags: Array,
    description: String,
    availableDays: { type: Array, default: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'] },
    availableTimes: Array,
});

module.exports = mongoose.model("Resource", ResourceSchema);

