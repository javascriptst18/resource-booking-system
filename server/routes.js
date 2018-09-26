const express = require('express');
const { UserModel, ResourceModel, BookingModel } = require('./models');
const jwtVerification = require('./authentication/jwtVerification');

const routes = express.Router();

// User related API routes
routes
  .route('/users/')
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

routes
  .route('/users/:id')
  .get((request, response) => {
    UserModel.findById(request.params.id, (error, user) => {
      if (error) return response.status(500).send('HTTP 500 INTERNAL SERVER ERROR');
      if (!user) return response.status(404).send('HTTP 404 NOT FOUND');
      response.status(200).send(user);
    });
  })
  .delete(jwtVerification, (request, response) => {
    UserModel.findByIdAndRemove(request.params.id, (error, user) => {
      if (error) return response.status(500).send('HTTP 500 INTERNAL SERVER ERROR');
      response.status(200).send(`User: ${user.name} was deleted.`);
    });
  })
  .put(jwtVerification, (request, response) => {
    UserModel.findByIdAndUpdate(request.params.id, request.body, { new: true }, (error, user) => {
      if (error) return response.status(500).send('There was a problem updating the user.');
      response.status(200).send(user);
    });
  });

// Resource related API routes
routes
  .route('/resources/')
  .get((request, response) => {
    ResourceModel.find({}, (error, resources) => {
      if (error) return response.status(500).send('HTTP 500 INTERNAL SERVER ERROR');
      response.status(200).send(resources);
    });
  })
  .post((request, response) => {
    console.log(request);
    const newResource = new ResourceModel(request.body);
    newResource.save((error, resource) => {
      if (error) {
        response.status(500).send('HTTP 500 INTERNAL SERVER ERROR');
      } else {
        response.status(200).send(resource);
      }
    });
  });

routes
  .route('/resources/:id')
  .get((request, response) => {
    ResourceModel.findById(request.params.id, (error, resource) => {
      if (error) return response.status(500).send('HTTP 500 INTERNAL SERVER ERROR');
      if (!resource) return response.status(404).send('HTTP 404 NOT FOUND');
      response.status(200).send(resource);
    });
  })
  .delete((request, response) => {
    ResourceModel.findByIdAndRemove(request.params.id, (error, resource) => {
      if (error) return response.status(500).send('HTTP 500 INTERNAL SERVER ERROR');
      response.status(200).send(`UserModel: ${request.params.id} was deleted.`);
    });
  })
  .put(jwtVerification, (request, response) => {
    ResourceModel.findByIdAndUpdate(
      request.params.id,
      request.body,
      { new: true },
      (error, resource) => {
        if (error) return response.status(500).send('There was a problem updating the UserModel.');
        response.status(200).send(resource);
      },
    );
  });

// Booking related API routes
routes
  .route('/bookings/')
  .get((request, response) => {
    BookingModel.find({}, (error, bookings) => {
      if (error) return response.status(500).send('HTTP 500 INTERNAL SERVER ERROR');
      response.status(200).send(bookings);
    });
  })
  .post((request, response) => {
    BookingModel.create(
      {
        name: request.body.username,
        resourceID: request.body.resourceID,
        startTime: request.body.startTime,
        endTime: request.body.endTime,
      },
      (error, booking) => {
        if (error) return response.status(500).send('HTTP 500 INTERNAL SERVER ERROR');
        return response.status(200).send(booking);
      },
    );
  });

routes.route('/bookings/:id').delete((request, response) => {
  BookingModel.findByIdAndRemove(request.params.id, (error, resource) => {
    if (error) return response.status(500).send('HTTP 500 INTERNAL SERVER ERROR');
    response.status(200).send(`Booking: ${request.params.id} was deleted.`);
  });
});

// Authentication routes



module.exports = routes;
