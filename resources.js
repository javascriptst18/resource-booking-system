const express = require('express')
const router = express.Router()
const Resource = require('../models/resource');

router.get('/', (request, response) => {
  Resource.find({})
    .then((documents) => {
      response.json(documents);
    });
});

router.get('/:id', (request, response) => {
  const resourceID = request.params.id.toString();
  Resource.find({ resourceID })
    .then((document) => {
      response.json(document);
    });
});

module.exports = router
