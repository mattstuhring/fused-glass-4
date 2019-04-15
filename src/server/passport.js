const knex = require('../../knex');
const bcrypt = require('bcrypt');
const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const { ExtractJwt } = require('passport-jwt');


// ************ JSON Web Token Strategy *************
// **************************************************
passport.use(new JwtStrategy({
  jwtFromRequest: ExtractJwt.fromHeader('authorization'), // Token is located in headers
  secretOrKey: process.env.JWT_SECRET
}, (payload, done) => {
  // Find the user specified in token
  knex('users')
    .select('user_id', 'user_email')
    .where('user_id', payload.sub)
    .first()
    .then((user) => {
      // If user doesn't exist handle it
      if (!user) {
        return done(null, false);
      }

      // Otherwise return the user
      done(null, user);
    })
    .catch((err) => {
      done(err, false);
    });
}));


// ***************** Local Strategy *****************
// **************************************************
// Passport default uses username and password
// We are using email & password
passport.use(new LocalStrategy({
  usernameField: 'email'
}, (email, password, done) => {
  // Find user by email
  let user;
  knex('users')
    .select('*')
    .where('user_email', email)
    .first()
    .then((row) => {
      // If user doesn't exist handle it
      if (!row) {
        console.log('User does not exist!');
        return done(null, false);
      } else {
        user = row;
      }

      console.log('User exists! Compare password . . .')
      // Check user's password
      return bcrypt.compare(password, row.user_hashed_password);
    })
    .then((isMatch) => {
      // If password doesn't match handle it
      if (!isMatch) {
        console.log('Password does not match!');
        return done(null, false);
      }

      console.log('Login successful');
      // Otherwise return the user
      done(null, user);
    })
    .catch((err) => {
      done(err, false);
    });
}));
