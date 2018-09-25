const express = require('express');
const { User, Resource, Booking } = require('./models');
const jwtVerification = require('./authentication/jwtVerification');

const apiRoutes = express.Router();

// User related API routes
apiRoutes
  .route('/users/')
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
  
apiRoutes
  .route('/users/:id')
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
  })
  .put(jwtVerification, (request, response) => {
    User.findByIdAndUpdate(request.params.id, request.body, { new: true }, (error, user) => {
      if (error) return response.status(500).send('There was a problem updating the user.');
      response.status(200).send(user);
    });
  });

// Resource related API routes
apiRoutes
  .route('/resources/')
  .get((request, response) => {
    Resource.find({}, (error, resources) => {
      if (error) return response.status(500).send('HTTP 500 INTERNAL SERVER ERROR');
      response.status(200).send(resources);
    });
  })
  .post((request, response) => {
    console.log(request);
    const newResource = new Resource(request.body);
    newResource.save((error, resource) => {
      if (error) {
        response.status(500).send('HTTP 500 INTERNAL SERVER ERROR');
      } else {
        response.status(200).send(resource);
      }
    });
  });

apiRoutes
  .route('/resources/:id')
  .get((request, response) => {
    Resource.findById(request.params.id, (error, resource) => {
      if (error) return response.status(500).send('HTTP 500 INTERNAL SERVER ERROR');
      if (!resource) return response.status(404).send('HTTP 404 NOT FOUND');
      response.status(200).send(resource);
    });
  })
  .delete((request, response) => {
    Resource.findByIdAndRemove(request.params.id, (error, resource) => {
      if (error) return response.status(500).send('HTTP 500 INTERNAL SERVER ERROR');
      response.status(200).send(`UserModel: ${request.params.id} was deleted.`);
    });
  })
  .put(jwtVerification, (request, response) => {
    Resource.findByIdAndUpdate(
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
apiRoutes
  .route('/bookings/')
  .get((request, response) => {
    Booking.find({}, (error, bookings) => {
      if (error) return response.status(500).send('HTTP 500 INTERNAL SERVER ERROR');
      response.status(200).send(bookings);
    });
  })
  .post((request, response) => {
    Booking.create(
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

apiRoutes.route('/bookings/:id').delete((request, response) => {
  Booking.findByIdAndRemove(request.params.id, (error, resource) => {
    if (error) return response.status(500).send('HTTP 500 INTERNAL SERVER ERROR');
    response.status(200).send(`Booking: ${request.params.id} was deleted.`);
  });
});

module.exports = apiRoutes;
