const express = require('express');
const bodyParser = require('body-parser');
const jwtVerification = require('./authentication/jwtVerification');
const { User } = require('./models');

const userController = express();

userController.use(bodyParser.urlencoded({ extended: true }));
userController.use(bodyParser.json());

userController
  .route('/')
  .get((request, response) => {
    User.find({}, (error, users) => {
      if (error) return response.status(500).send('HTTP 500 INTERNAL SERVER ERROR');
      response.status(200).send(users);
    });
  })
  .post((request, response) => {
    const newUser = new User(request.body);
    newUser.save((error, user) => {
      if (error) {
        response.status(500).send('HTTP 500 INTERNAL SERVER ERROR');
      } else {
        response.status(200).send(user);
      }
    });
  });

userController.route('/:id')
  .get((request, response) => {
    User.findById(request.params.id, (error, user) => {
      if (error) return response.status(500).send('HTTP 500 INTERNAL SERVER ERROR');
      if (!user) return response.status(404).send('HTTP 404 NOT FOUND');
      response.status(200).send(user);
    });
  })
  .delete(jwtVerification, (request, response) => {
    User.findByIdAndRemove(request.params.id, (error, user) => {
      if (error) return response.status(500).send('HTTP 500 INTERNAL SERVER ERROR');
      response.status(200).send(`User: ${user.name} was deleted.`);
    });
  }).put(jwtVerification, (request, response) => {
    User.findByIdAndUpdate(request.params.id, request.body, { new: true }, (error, user) => {
      if (error) return response.status(500).send('There was a problem updating the user.');
      response.status(200).send(user);
    });
  });

module.exports = userController;
