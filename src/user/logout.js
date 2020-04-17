'use strict';

// POST logout
exports.postLogout = function postLogout(req, res) {
  req.session.destroy();
  res.redirect('/login');
};
