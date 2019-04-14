'use strict';

const knex = require('../../../knex');
const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const { camelizeKeys } = require('humps');
const jwt = require('jsonwebtoken');

// Sign a token with 1 day expiration
const signToken = (userId) => {
  return JWT.sign(
    {
      iss: 'test',
      sub: userId,
      iat: new Date().getTime(), // Current time
      exp: new Date().setDate(new Date().getDate() + 1) // Current time + 1 day ahead
    },
    process.env.JWT_SECRET
  );
};


router.post('/login', (req, res, next) => {
  let user;

  knex('users')
    .where('user_email', req.body.email)
    .first()
    .then((row) => {
      console.log(row, '********* row')
      if (!row) {
        console.log(401, 'Invalid username or password');
        res.sendStatus(401);
      }

      user = camelizeKeys(row);

      return bcrypt.compare(req.body.password, user.userHashedPassword);
    })
    .then(() => {
      const token = jwt.sign(
        {
          userId: user.userId,
          email: user.userEmail
        },
        process.env.JWT_SECRET,
        {
          expiresIn: 86400 // expires in 24 hours
        }
      );

      res.status(200).send({ auth: true, token: token });
    })
    .catch(bcrypt.MISMATCH_ERROR, () => {
      console.log(401, 'Invalid username or password.');
    })
    .catch((err) => {
      next(err);
    });
});


module.exports = router;
