const express = require('express');

const mainRouter = express.Router();

const authenticator = require('./authentication/authenticator');
const bookingController = require('./bookingController');
const resourceController = require('./resourceController');
const userController = require('./userController');

mainRouter.use('/auth', authenticator);
mainRouter.use('/bookings', bookingController);
mainRouter.use('/resources', resourceController);
mainRouter.use('/users', userController);

mainRouter.get('/', (req, res) => {
  res.sendFile('../client/build/public/index.html');
});

module.exports = mainRouter;
