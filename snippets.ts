import * as jwt from 'jsonwebtoken';
import * as fs from 'fs';
import * as path from 'path';
import * as mockedJwt from './testdata/jwt_plain.json';

let jsonPath = path.join(__dirname, '.', 'testdata', 'keys', 'jwt_private_key.pk');
const privateKey = fs.readFileSync(jsonPath).toString('utf-8');
mockedJwt["exp"] = new Date().getTime() + 3600000; // set it tp expire in one hour
const signedToken = jwt.sign(mockedJwt, privateKey, { algorithm: 'RS256'});
jsonPath = path.join(__dirname, '.', 'testdata', 'keys', 'jwt_public_key.pub');
const publicKey = fs.readFileSync(jsonPath).toString('utf-8');
// verify a token asymmetric
let verified = null;
jwt.verify(signedToken, publicKey, function(err, decoded) {
  verified = decoded;
});
let TOKEN = 'Bearer ' + signedToken;
