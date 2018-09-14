'use strict';
const express = require('express');
const userController = express();
const bodyParser = require('body-parser');
const jwtVerification = require('../authentication/jwtVerification');
const UserModel = require('./userModel');

userController.use(bodyParser.urlencoded({ extended: true }));
userController.use(bodyParser.json());

userController.get('/', function(request, response) {
  UserModel.find({}, function(error, users) {
    if (error) return response.status(500).send('HTTP 500 INTERNAL SERVER ERROR');
    response.status(200).send(users);
  });
});

userController.get('/:id', function(request, response) {
  UserModel.findById(request.params.id, function(error, user) {
    if (error) return response.status(500).send('HTTP 500 INTERNAL SERVER ERROR');
    if (!user) return response.status(404).send('HTTP 404 NOT FOUND');
    response.status(200).send(user);
  });
});

userController.post('/', function(request, response) {
  const newUser = new UserModel(request.body);
  newUser.save((error, user) => {
    if (error) {
      response.status(500).send('HTTP 500 INTERNAL SERVER ERROR');
    } else {
      response.status(200).send(user);
    }
  });
});

userController.delete('/:id', jwtVerification, function(request, response) {
  UserModel.findByIdAndRemove(request.params.id, function(error, user) {
    if (error) return response.status(500).send('HTTP 500 INTERNAL SERVER ERROR');
    response.status(200).send('User: ' + user.name + ' was deleted.');
  });
});

userController.put('/:id', jwtVerification, function(request, response) {
  UserModel.findByIdAndUpdate(request.params.id, request.body, { new: true }, function(error, user) {
    if (error) return response.status(500).send('There was a problem updating the UserModel.');
    response.status(200).send(user);
  });
});

module.exports = userController;
