const express = require('express');
const mongoose = require('mongoose'); // Imports mongoose driver for connection to cloud-hosted mongoDB at mlab.com
const cors = require('cors'); // Imports cors middleware to allow Cross-origin resource sharing
const morgan = require('morgan');
const bodyParser = require('body-parser');
const router = require('./router');

const app = express();

app.use(router);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors()); // Instructs app to use cors for cross-origin requests to mlab database
app.use(express.json()); // Instructs app to use express.json() to handle JSON
app.use(express.static('../client/build')); // Instructs app to use express.static (./public) at initial GET requests and serve this file to user
app.use(express.urlencoded({ extended: true })); // Instructs app to use express.urlencoded to handle form-data from user
app.use(morgan('dev'));

mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB_CONN, { useNewUrlParser: true }, (error) => { if(error) throw (error); console.log("Connection to [ds139722.mlab.com] successfully established")});

// console.log(os.networkInterfaces().WiFi[3]);
// This creates an error on non-wifi devices

app.listen(process.env.PORT);
console.log(`Server listening on port ${process.env.PORT}`);
