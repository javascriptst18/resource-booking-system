const express = require("express");// Imports express middleware for http routing and request handling.
const app = express();// Instantiates an object 'app' through express() constructor
const cors = require("cors"); // Imports cors middleware to allow Cross-origin resource sharing
app.use(cors()); // Instructs app to use cors for cross-origin requests to mlab database
app.use(express.static("public")); // Instructs app to use express.static (./public) at initial GET requests and serve this file to user
app.use(express.json()); // Instructs app to use express.json() to handle JSON
app.use(express.urlencoded({ extended: true })); // Instructs app to use express.urlencoded to handle form-data from user

const mongoose = require("mongoose"); // Imports mongoose driver for connection to cloud-hosted mongoDB at mlab.com
mongoose.connect('mongodb://jeremias:password01@ds139722.mlab.com:39722/resource-booking-system', { useNewUrlParser: true }); //Initiates connection to database

/*************************** Mongoose Schema Models ***************************/
const Booking = mongoose.model('bookings', {
  bookingID: {
    type: String,
    required: true
  },
  resourceID: {
    type: String,
    required: true
  },
  bookedByUser: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  startTime: {
    type: Number,
    required: true
  },
  endTime: {
    type: Number,
    required: true
  },
  comment: {
    type: String,
    required: false
  }
});

const Resource = mongoose.model('resources', {

  resourceID: String,
  category: {
    type: String,
    required: true
  },
  bookings: {
    type: Array,
    required: false
  },
  description: {
    type: String,
    required: true
  }
});

const User = mongoose.model('users', {
  userID: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  bookings: {
    type: Array,
    required: false
}
});

/***************************Routing***************************/

app.get("/", function(request, response) {
  response.sendFile("index.html");
});

/*************************** /bookings ***************************/

app.get(`/bookings`, function (request, response) {
  Booking.find({})
    .then(documents => {
      response.json(documents);
    });
});

app.get('/bookings/:id', function (request, response) {
  const bookingID = request.params.id.toString();
  Booking.find({ bookingID: bookingID })
    .then((document) => {
      response.json(document);
    });
});

app.post('/bookings', function (request, response) {
  const newBooking = new Booking(
    {
      bookingID: request.body.bookingID,
      resourceID: request.body.resourceID,
      bookedByUser: request.body.bookedByUser,
      date: request.body.date,
      startTime: request.body.startTime, //function that splits the day in 24 or 48 parts
      endTime: request.body.endTime,
      comment: request.body.comment,
    }
  );

  newBooking.save()
    .then(document => {
      response.json(document);
    });
});

app.delete('/bookings/:id', function (request, response) {
  const bookingID = request.params.id.toString();
  Booking.findOneAndDelete({ bookingID: bookingID })
    .then((document) => {
      response.json(document);
    });
});

/*************************** /resources ***************************/
app.get(`/resources`, function (request, response) {
  Resource.find({})
    .then(documents => {
      response.json(documents);
    });
});


/*************************** /users ***************************/
app.get(`/users`, function (request, response) {
  User.find({})
    .then(documents => {
      response.json(documents);
    });
});

app.listen(4000);
console.log('Development server successfully started. Webserver running on port 4000');
