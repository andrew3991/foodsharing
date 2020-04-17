'use strict';

const passport = require('passport');

// GET login
exports.login = function login(req, res) {
  const message = '';
  if (req.isAuthenticated()) {
    res.redirect('/dashboard');
  } else {
    res.render('views/login', {
      message,
    });
  }
};

// POST login
exports.postLogin = function postLogin(req, res, next) {
  let message = '';
  if (req.method === 'POST') {
    passport.authenticate('local', (err, user, info) => {
      if (info) {
        message = info.message;
        return res.render('views/login', {
          message,
        });
      }
      if (err) {
        return next(err);
      }
      if (!user) {
        message = 'User does not exist';
        return res.render('views/login', {
          message,
        });
      }
      req.login(user, (err) => {
        if (err) {
          return next(err);
        }
        return res.redirect('/dashboard');
      });
    })(req, res, next);
  }
};
