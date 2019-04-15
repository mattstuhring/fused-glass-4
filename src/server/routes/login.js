const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const { camelizeKeys } = require('humps');
const JWT = require('jsonwebtoken');
const passport = require('passport');
const passportConfig = require('../passport');

const knex = require('../../../knex');
const { validateBody, schemas } = require('../helpers/routeHelpers');
const passportSignIn = passport.authenticate('local', { session: false });
const passportJWT = passport.authenticate('jwt', { session: false });

// Sign a token with 1 day expiration
const signToken = (userId) => {
  return JWT.sign(
    {
      iss: 'fusedglass',
      sub: userId,
      iat: new Date().getTime(), // Current time
      exp: new Date().setDate(new Date().getDate() + 1) // Current time + 1 day ahead
    },
    process.env.JWT_SECRET
  );
};

// *****************  SIGNIN  ****************
// *******************************************
// Validate request body against the Joi schema
// Authenticate user with Passport local strategy
router.post('/login', validateBody(schemas.authSchema), passportSignIn, (req, res, next) => {
  // If authenticated, generate token with user ID
  const token = signToken(req.user.user_id);

  // Respond with token
  res.status(200).send({ token });
});


module.exports = router;
