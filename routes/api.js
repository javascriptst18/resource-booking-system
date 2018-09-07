var express = require('express')
var router = express.Router()


const api = {
  bookings: {
    bookingID: String,
    resourceID: String,
    bookedByUser: String,
    date: Date,
    start: Number,
    end: Number,
    comment: String,
  },
  resources: {
    resourceID: String,
    category: String,
    description: Array,
    bookings: Array,
    created: Date,
  },
  user: {
    username: String,
    password: String,
  }
}

// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next()
})
// define the home page route
router.get('/', function (req, res) {
  res.send(api)
})
// define the about route
router.get('/about', function (req, res) {
  res.send('About birds')
})

module.exports = router
