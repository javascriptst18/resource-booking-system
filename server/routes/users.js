const express = require('express');
const { UserModel } = require('../models');

const UserRouter = express.Router();

UserRouter.route('/users/')
  .get((request, response) => {
    UserModel.find({}, (error, users) => {
      if (error) return response.status(500).send('HTTP 500 INTERNAL SERVER ERROR');
      response.status(200).send(users);
    });
  })
  .post((request, response) => {
    const newUser = new UserModel(request.body);
    newUser.save((error, user) => {
      if (error) {
        response.status(500).send('HTTP 500 INTERNAL SERVER ERROR');
      } else {
        response.status(200).send(user);
      }
    });
  });

UserRouter.route('/users/:id')
  .get((request, response) => {
    UserModel.findById(request.params.id, (error, user) => {
      if (error) return response.status(500).send('HTTP 500 INTERNAL SERVER ERROR');
      if (!user) return response.status(404).send('HTTP 404 NOT FOUND');
      response.status(200).send(user);
    });
  })
  .delete((request, response) => {
    UserModel.findByIdAndRemove(request.params.id, (error, user) => {
      if (error) return response.status(500).send('HTTP 500 INTERNAL SERVER ERROR');
      response.status(200).send(`User: ${user.name} was deleted.`);
    });
  })
  .put((request, response) => {
    UserModel.findByIdAndUpdate(request.params.id, request.body, { new: true }, (error, user) => {
      if (error) return response.status(500).send('There was a problem updating the user.');
      response.status(200).send(user);
    });
  });

module.exports = UserRouter;
