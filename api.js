const express = require('express');
const router = express.Router();

router.get('/', async function(request, response) {
  try {response.sendFile('./home.html',{root: __dirname});}
  catch(error) {
    console.log(error);
    return response.status(400).json({
      error: error.message
    });
  }
});

router.get('/help', async function(request, response) {
  try {
    response.sendFile('./resources/html/api.html', {root: __dirname});
  } catch(error) {
    console.log(error);
    return response.status(400).json({
      error: error.message
    });
  }
});
module.exports = router;
