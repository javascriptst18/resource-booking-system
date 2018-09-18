const express = require('express');
const jwtVerification = require('./jwtVerification');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../user/userModel');
const authenticationRouter = express.Router();
const bodyParser = require('body-parser');

authenticationRouter.use(bodyParser.urlencoded({ extended: false }));
authenticationRouter.use(bodyParser.json());

authenticationRouter.post('/login', function(request, response) {
    User.findOne({ email: request.body.email }, function (error, user) {
        if (error) return response.status(500).send('HTTP 500 INTERNAL SERVER ERROR');
        if (!user) return response.status(404).send('HTTP 404 RESOURCE NOT FOUND');
        const passwordIsValid = bcrypt.compareSync(request.body.password, user.password);
        if (!passwordIsValid) return response.status(401).send({ auth: false, token: null });
        const token = jwt.sign({ id: user._id }, process.env.secret, { expiresIn: 86400 });
        response.status(200).send({ auth: true, token: token })});
});

authenticationRouter.get('/logout', function(request, response) { response.status(200).send({ auth: false, token: null })});

authenticationRouter.post('/register', function(request, response) {
    const hashedPassword = bcrypt.hashSync(request.body.password, 8);
    User.create({ name : request.body.name, email : request.body.email, password : hashedPassword }, function (error, user) {
            if (error) return response.status(500).send("HTTP 500 INTERNAL SERVER ERROR");
            const token = jwt.sign({ id: user._id }, process.env.secret, { expiresIn: 86400 });
            response.status(200).send({ auth: true, token: token })})
});

authenticationRouter.get('/me', jwtVerification, function(request, response, next) {
    User.findById(request.userId, { password: 0 }, function (error, user) {
        if (error) return response.status(500).send("HTTP 500 INTERNAL SERVER ERROR");
        if (!user) return response.status(404).send("HTTP 404 RESOURCE NOT FOUND");
        response.status(200).send(user)});
});

module.exports = authenticationRouter;
