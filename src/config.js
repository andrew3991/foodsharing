'use strict';

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const knex = require('./db/knex.js');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const uuid = require('uuid/v4');
const bcrypt = require('bcrypt');

// passport.js configuration
exports.configPassport = function () {
  // configure passport.js to use the local strategy
  passport.use(new LocalStrategy({
      usernameField: 'email'
    },
    (email, password, done) => {
      // Database call
      // get user with given email (user input)
      knex.select().from('user').where('email', email)
        .then(function (user) {
          user = user[0];

          if (user) {
            // compare input-password and password from database using bcrypt
            bcrypt.compare(password, user.password, function (err, res) {
              if (err) {
                console.log(err);
              }
              if (res && email == user.email) {
                return done(null, user);
              } else {
                return done(null, false, {
                  message: 'Wrong password.\n'
                })
              }
            });
          } else {
            return done(null, false, {
              message: 'User does not exist.\n'
            })
          }
        })
    }
  ));

  // tell passport how to serialize the user
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  // tell passport how to deserialize the user
  passport.deserializeUser((myUser, done) => {

    // Database call
    knex.select().from('user').where('id', myUser)
      .then(function (user) {
        user = user[0];
        if (user) {
          done(null, user);
        }
      })
  });
}

// session configuration
exports.configSession = function (app) {
  app.use(session({
    genid: (req) => {
      // use UUIDs as session IDs
      return uuid()
    },
    store: new FileStore(),
    secret: 'share food',
    resave: false,
    saveUninitialized: true
  }))
}