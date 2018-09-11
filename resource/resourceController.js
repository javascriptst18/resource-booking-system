const express = require('express');
const resourceController = express();
const bodyParser = require('body-parser');
const jwtVerification = require('../authentication/jwtVerification');
const Resource = require('./resourceModel');

resourceController.use(bodyParser.urlencoded({ extended: true }));
resourceController.use(bodyParser.json());

resourceController.get('/', function(request, response) {
  Resource.find({}, function(error, resources) {
    if (error) return response.status(500).send('HTTP 500 INTERNAL SERVER ERROR');
    response.status(200).send(resources);
  });
});

resourceController.get('/:id', function(request, response) {
  Resource.findById(request.params.id, function(error, resource) {
    if (error) return response.status(500).send('HTTP 500 INTERNAL SERVER ERROR');
    if (!resource) return response.status(404).send('HTTP 404 NOT FOUND');
    response.status(200).send(resource);
  });
});

resourceController.post('/', function(request, response) {
  console.log(request);
  const newResource = new Resource(request.body);
  newResource.save(function(error, resource) {
    if (error) {
      response.status(500).send('HTTP 500 INTERNAL SERVER ERROR');
    } else {
      response.status(200).send(resource);
    }
  });
});

resourceController.delete('/:id', function(request, response) {
  Resource.findByIdAndRemove(request.params.id, function(error, resource) {
    if (error) return response.status(500).send('HTTP 500 INTERNAL SERVER ERROR');
    response.status(200).send('UserModel: ' + resource.name + ' was deleted.');
  });
});

resourceController.put('/:id', jwtVerification, function(request, response) {
  Resource.findByIdAndUpdate(request.params.id, request.body, { new: true }, function(error, resource) {
    if (error) return response.status(500).send('There was a problem updating the UserModel.');
    response.status(200).send(resource);
  });
});

module.exports = resourceController;
