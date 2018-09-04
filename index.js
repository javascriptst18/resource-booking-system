const express = require('express'); // Imports express middleware for http routing and request handling.
const mongoose = require('mongoose'); // Imports mongoose driver for connection to cloud-hosted mongoDB at mlab.com
const passport = require('passport'); // Imports passport authentication middleware to handle passwords
const session = require('express-session'); // Imports session middleware for handling client sessions with browser
const cookieParser = require('cookie-parser'); // Imports cookie-parser for storing small amount of data about user in browser local storage
const passportLocalMongoose = require('passport-local-mongoose'); // Imports passport-local-mongoose for saving user data to use for authentication against mlab.com
const cors = require('cors'); // Imports cors middleware to allow Cross-origin resource sharing
const app = express(); // Instantiates an object 'app' through express() constructor
const Todo = require('./models/todo');
const Resource = require('./models/booking');
const Booking = require('./models/resource');
const UserSchema = require('./models/UserSchema');

mongoose.connect('mongodb://jeremias:password01@ds139722.mlab.com:39722/resource-booking-system', { useNewUrlParser: true }); //Initiates connection to database

app.use(cors()); // Instructs app to use cors for cross-origin requests to mlab database
app.use(express.static('frontend/build')); // Instructs app to use express.static (./public) at initial GET requests and serve this file to user
app.use(express.json()); // Instructs app to use express.json() to handle JSON
app.use(express.urlencoded({ extended: true })); // Instructs app to use express.urlencoded to handle form-data from user
app.use(cookieParser()); // Instructs app to saves cookies to request.cookies
app.use(session({secret: "very secret message", resave: true, saveUninitialized: false}));

/************************ Authentication *****************************/
UserSchema.plugin(passportLocalMongoose);
const User = mongoose.model('User', UserSchema);

app.use(passport.initialize()); // Instructs app to use and initialize passport
app.use(passport.session()); // Instructs app to use and initialize passport session to save information about user
passport.use(User.createStrategy()); // Instructs passport to use an authentication strategy from UserSchema
passport.serializeUser(User.serializeUser()); // Instructs passport to use the cryptographic package serializeUser
passport.deserializeUser(User.deserializeUser()); // -||-

function isLoggedIn(request, response, next) { // IsLoggedIn is used as a parameter in all functions and routes that require the user to be logged in
  if (request.isAuthenticated()) {
    return next();}
  response.status(401).json({
    type: 'ERROR',
    message: 'Unauthorized'
  });
}

app.post('/login', passport.authenticate('local'), function (request, response) {
  response.json({
    username: request.user.username,
    _id: request.user._id
  });
});

app.get('/logout', (request, response) => {
  request.logout();
  response.json({
    type: 'SUCCESS',
    message: 'Logout successful'
  })
})

app.post('/register', function (request, response) {
  User.register(new User({ username: request.body.username }), request.body.password, (err, user) => {
    if (err) {
      response.status(500).json(err);
    }
    passport.authenticate('local')(request, response, () => {
      response.json({
        type: 'SUCCESS',
        message: 'User registered'
      });
    });
  });
});

/************************ Backend functions *****************************/

function getTimestamp(){
  const date = new Date();
  const utcDate = date.toUTCString();
  return utcDate;
}

/************************ Routing *****************************/

app.get("/", (request, response) => {
  response.sendFile("index");
});


/************************ /bookings *****************************/

app.get(`/bookings`, function (request, response) {
  Booking.find({})
    .then(documents => {
      response.json(documents);
    });
});

app.get('/bookings/mybookings', function (request, response){
  Booking.find({bookedByUser: request.user.username})
    .then(documents => {
      response.json(documents);
    });
})

app.get('/bookings/:id', function (request, response) {
  const bookingID = request.params.id.toString();
  Booking.find({ bookingID: bookingID })
    .then((document) => {
      response.json(document);
    });
});

app.post('/bookings', isLoggedIn, function (request, response) {
  const newBooking = new Booking(
    { bookingID: request.body.bookingID,
      resourceID: request.body.resourceID,
      bookedByUser: request.user.username,
      bookingTimestamp: getTimestamp(),
      date: request.body.date,
      startTime: request.body.startTime,
      endTime: request.body.endTime,
      comment: request.body.comment,}
  );
  newBooking.save().then(document => {response.json(document)})});

/************************ /resources *****************************/
app.get('/resources', isLoggedIn, (request, response) => {
  Resource.find({})
    .then(documents => {
      response.json(documents);
    })
});

app.post('/resources', isLoggedIn, function (request, response) {

  const newResource = new Resource({
    title: request.body.title,
    username: request.user.username,
    timestamp: getTimestamp()
  });
  newResource.save()
    .then(document => {
      response.json(document);
    });
});

app.get('/resources/:id', isLoggedIn, function (request, response) {
  Resource.findById(request.params.id)
    .then(document => {
      response.json(document);
    })
});

app.delete('/resources/:id', isLoggedIn, function (request, response) {
  Resource.findByIdAndRemove(request.params.id).then(document => {response.json(document)})});


app.listen(3000);
console.log('Development server successfully started. App running on port 3000');

