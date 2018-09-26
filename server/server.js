const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const cors = require('cors'); 
const morgan = require('morgan');

const LocalStrategy = require('passport-local').Strategy;

const routes = require('./routes');

const app = express();

app.use(morgan('dev'));

app.use(cors()); 
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
app.use(express.static('../client/build')); 
app.use(passport.initialize());
app.use(passport.session());

const { UserModel } = require('./models');

passport.use(new LocalStrategy(UserModel.authenticate()));

passport.serializeUser(UserModel.serializeUser());
passport.deserializeUser(UserModel.deserializeUser());

app.post('/register', (req, res, next) => {
  console.log('registering user');
  UserModel.register(new UserModel({ username: req.body.username }), req.body.password, (err) => {
    if (err) {
      console.log('error while user register!', err);
      return next(err);
    }
    console.log('user registered!');
    res.redirect('/');
  });
});

app.use(routes);

mongoose.connect(
  process.env.DB_CONN,
  { useNewUrlParser: true },
  (error) => {
    if (error) throw error;
    console.log('Connection to [ds139722.mlab.com] successfully established');
  },
);

app.listen(process.env.PORT);
console.log(`Server listening on port ${process.env.PORT}`);
