var jwt = require('jsonwebtoken');

var user = function ValidateToken(req) {
    return jwt.decode(req.headers['authorization']).email;
}

module.exports = user;
