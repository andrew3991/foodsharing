'use strict';

const login = require('./login');
const logout = require('./logout');
const register = require('./register');
const home = require('./home');

exports.routes = function routes(app) {
  // Login routes
  app.get('/login', login.login);
  app.post('/login', login.postLogin);

  // Logout routes
  app.get('/logout', logout.postLogout);
  app.post('/logout', logout.postLogout);

  // Register routes
  app.get('/register', register.register);
  app.post('/register', register.postRegister);

  // Home routes
  app.get('/', home.home);
};
