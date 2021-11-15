const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
const CognitoUserPool = AmazonCognitoIdentity.CognitoUserPool;
const AWS = require('aws-sdk');
const request = require('request');
const jwkToPem = require('jwk-to-pem');
const jwt = require('jsonwebtoken');
var config = require('../config').config();
//global.fetch = require('node-fetch');

const COGNITO_POOLID = 'us-east-1_OhnX3yEY5';
const COGNITO_CLIENTID = '18b132av2gkfgl3m793qcgjsd3';
const COGNITO_POOLREGION = 'us-east-1';


var authorization = function ValidateToken(req, res, next) {
    let token = req.headers['authorization'];
    request({
        url: `https://cognito-idp.${COGNITO_POOLREGION}.amazonaws.com/${COGNITO_POOLID}/.well-known/jwks.json`,
        json: true
    }, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            pems = {};
            var keys = body['keys'];
            for(var i = 0; i < keys.length; i++) {
                //Convert each key to PEM
                var key_id = keys[i].kid;
                var modulus = keys[i].n;
                var exponent = keys[i].e;
                var key_type = keys[i].kty;
                var jwk = { kty: key_type, n: modulus, e: exponent};
                var pem = jwkToPem(jwk);
                pems[key_id] = pem;
            }
            //validate the token
            var decodedJwt = jwt.decode(token, {complete: true});
            if (!decodedJwt) {
                console.log("Not a valid JWT token");
                return;
            }

            var kid = decodedJwt.header.kid;
            var pem = pems[kid];
            if (!pem) {
                console.log('Invalid token');
                return;
            }

            jwt.verify(token, pem, function(err, payload) {
                if(err) {
                    console.log("Invalid Token.");
                    res.status(500).send('Failed to authenticate token.');
                } else {
                    console.log("Valid Token.");
                    console.log(payload);
                    next();
                }
            });
        } else {
            console.log("Error! Unable to download JWKs");
        }
    });
}

module.exports = authorization;