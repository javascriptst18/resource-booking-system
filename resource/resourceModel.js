'use strict'
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ResourceSchema = new Schema({
    resourceID: Schema.Types.ObjectId,
    name: String,
    category: String,
    bookings: [{type: Schema.Types.ObjectId, ref: 'Booking'}]
});

module.exports = mongoose.model("Resource", ResourceSchema);
