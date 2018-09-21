const express = require('express');

const resourceController = express();
const bodyParser = require('body-parser');
const jwtVerification = require('./authentication/jwtVerification');
const { Resource } = require('./models');

resourceController.use(bodyParser.urlencoded({ extended: true }));
resourceController.use(bodyParser.json());

resourceController.route('/')
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

resourceController.route('/:id')
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
    Resource.findByIdAndUpdate(request.params.id, request.body, { new: true }, (
      error,
      resource,
    ) => {
      if (error) return response.status(500).send('There was a problem updating the UserModel.');
      response.status(200).send(resource);
    });
  });

module.exports = resourceController;
