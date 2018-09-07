const express = require('express'); // Imports express middleware for http routing and request handling.
const mongoose = require('mongoose'); // Imports mongoose driver for connection to cloud-hosted mongoDB at mlab.com
const passport = require('passport'); // Imports passport authentication middleware to handle passwords
const session = require('express-session'); // Imports session middleware for handling client sessions with browser
const cookieParser = require('cookie-parser'); // Imports cookie-parser for storing small amount of data about user in browser local storage
const passportLocalMongoose = require('passport-local-mongoose'); // Imports passport-local-mongoose for saving user data to use for authentication against mlab.com
const cors = require('cors');
// Imports cors middleware to allow Cross-origin resource sharing
const app = express(); // Instantiates an object 'app' through express() constructor
const Resource = require('./models/resource');
const Booking = require('./models/booking');
const UserSchema = require('./models/UserSchema');

// Initiates connection to database
mongoose.connect('mongodb://jeremias:password01@ds139722.mlab.com:39722/resource-booking-system', { useNewUrlParser: true });

const bodyParser = require('body-parser');
const url = require('url');
const querystring = require('querystring');

const birds = require('./birds')
app.use('/birds', birds)

app.use(cors()); // Instructs app to use cors for cross-origin requests to mlab database
app.use(express.static('frontend/build')); // Instructs app to use express.static (./public) at initial GET requests and serve this file to user
app.use(express.json()); // Instructs app to use express.json() to handle JSON
app.use(express.urlencoded({ extended: true })); // Instructs app to use express.urlencoded to handle form-data from user
app.use(cookieParser()); // Instructs app to saves cookies to request.cookies
app.use(session({ secret: 'something.super.secret', resave: true, saveUninitialized: false }));

/** ********************** Authentication **************************** */
UserSchema.plugin(passportLocalMongoose);
const User = mongoose.model('User', UserSchema);

app.use(passport.initialize()); // Instructs app to use and initialize passport
app.use(passport.session()); // Instructs app to use and initialize passport session to save information about user
passport.use(User.createStrategy()); // Instructs passport to use an authentication strategy from UserSchema
passport.serializeUser(User.serializeUser()); // Instructs passport to use the cryptographic package serializeUser
passport.deserializeUser(User.deserializeUser()); // -||-

function isLoggedIn(request, response, next) { // IsLoggedIn is used as a parameter in all functions and routes that require the user to be logged in
  if (request.isAuthenticated()) {
    return next();
  }
  response.status(401).json({
    type: 'ERROR',
    message: '401 - Authentication required',
  });
}

app.post('/login', passport.authenticate('local'), (request, response) => {
  response.json({
    username: request.user.username,
    _id: request.user._id,
  });
});

app.get('/logout', (request, response) => {
  request.logout();
  response.json({
    type: 'SUCCESS',
    message: `${request.body.username} successfully logged out`,
  });
});

app.post('/register', (request, response) => {
  User.register(new User({ username: request.body.username }), request.body.password, (err, user) => {
    if (err) {
      response.status(500).json(err);
    }
    passport.authenticate('local')(request, response, () => {
      response.json({
        type: 'SUCCESS',
        message: `User ${request.body.username} successfully registered`,
      });
    });
  });
});

/** ********************** Backend functions **************************** */

function getTimestamp() {
  const date = new Date().toISOString();
  return date;
}

function getBookingsByResourceID(resourceID) {
  const matchArray = [];
  for (const i in Booking) {
    if (Booking[i].resourceID === resourceID) {
      matchArray.push(Booking[i].bookingID);
    }
  }
  return matchArray;
}


function getBookingsByUserID(userID) {
  const matchArray = [];
  for (const i in Booking) {
    if (Booking[i].bookedByUser === userID) {
      matchArray.push(Booking[i].userID);
    }
  }
  return matchArray;
}


/** ********************** Routing **************************** */

app.get('/', (request, response) => {
  response.sendFile('index.html');
});


/** ********************** /open view **************************** */

app.get('/bookings', (request, response) => {
  Booking.find({})
    .then((documents) => {
      response.json(documents);
    });
});

app.get('/bookings/:id', (request, response) => {
  const bookingID = request.params.id.toString();
  Booking.find({ bookingID })
    .then((document) => {
      response.json(document);
    });
});

app.get('/resources', (request, response) => {
  Resource.find({})
    .then((documents) => {
      response.json(documents);
    });
});

app.get('/resources/:id', (request, response) => {
  const resourceID = request.params.id.toString();
  Resource.find({ resourceID })
    .then((document) => {
      response.json(document);
    });
});


/** ********************** /protected view *********************** */

app.get('/bookings/', isLoggedIn, (request, response) => {
  Booking.find({ bookedByUser: request.user.username })
    .then((documents) => {
      response.json(documents);
    });
});

app.post('/bookings', isLoggedIn, (request, response) => {
  const newBooking = new Booking(
    {
      bookingID: request.body.bookingID,
      resourceID: request.body.resourceID,
      bookedByUser: request.user.username,
      dateTimeFrom: request.body.dateTimeFrom,
      dateTimeTo: request.body.dateTimeTo,
      bookingTimestamp: getTimestamp(),
      comment: request.body.comment,
    },
  );
  newBooking.save().then((document) => { response.json(document); });
});

app.patch('/bookings/:id', isLoggedIn, (request, response) => {
  Booking.findByIdAndUpdate(request.params.bookingID, req.body, { new: true },
    (err, Booking) => {
      if (err) return response.status(500).send(err);
      return response.send(Booking);
    });
});

app.delete('/bookings/:id', isLoggedIn, (request, response) => {
  const bookingID = request.params.id.toString();
  Booking.findByIdAndRemove({ bookingID }).then((document) => { response.json(document); });
});

/** ********************** /adminView *********************** */

app.post('/resources', isLoggedIn, (request, response) => {
  const newResource = new Resource(
    {
      resourceID: request.body.resourceID,
      category: request.body.category,
      description: request.body.description.split(''),
      bookings: [],
      created: date.toUTCString(),
    },
  );
  newResource.save()
    .then((document) => {
      response.json(document);
    });
});

app.delete('/resources/:id', isLoggedIn, (request, response) => {
  Resource.findByIdAndRemove(request.params.id).then((document) => { response.json(document); });
});


app.listen(4000);
console.log('Development server successfully started. App running on port 4000');
