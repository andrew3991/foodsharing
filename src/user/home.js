'use strict';

// GET home
exports.home = function home(req, res) {
  if (req.isAuthenticated()) {
    res.redirect('/dashboard');
  } else {
    res.redirect('/login');
  }
};
