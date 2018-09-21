const JWT = require('jsonwebtoken'); // used to create, sign, and verify tokens

function jwtVerification(request, response, next) {
  const token = request.headers['x-access-token'];
  if (!token) return response.status(403).send({ authentication: false, message: 'No token provided.' });

  JWT.verify(token, process.env.secret, (error, decoded) => {
    if (error) return response.status(500).send({ authentication: false, message: 'Failed to authenticate token.' });

    request.userId = decoded.id;
    next();
  });
}

module.exports = jwtVerification;
