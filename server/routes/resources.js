const express = require('express');
const { ResourceModel } = require('../models');

const ResourceRouter = express.Router();

ResourceRouter.route('/resources/')
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

ResourceRouter.route('/resources/:id')
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
  .put((request, response) => {
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

module.exports = ResourceRouter;
