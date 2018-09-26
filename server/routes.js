const express = require('express');
const UserRouter = require('./routes/users');
const ResourceRouter = require('./routes/resources');
const BookingRouter = require('./routes/bookings');

const routes = express.Router();

routes.use(UserRouter);
routes.use(ResourceRouter);
routes.use(BookingRouter);

module.exports = routes;
