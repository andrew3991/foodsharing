'use strict';

const foodList = require('./list');
const foodCreate = require('./create');
const foodUpdate = require('./update');
const foodDelete = require('./delete');
const dashboard = require('./dashboard');

exports.routes = function routes(app) {
  // Dashboard
  app.get('/dashboard', dashboard.dashboard);
  app.post('/dashboard', dashboard.dashboard);

  // List routes
  app.get('/food', foodList.listAllFood);

  // Create routes
  app.get('/createfood', foodCreate.getFood);
  app.post('/createfood', foodCreate.postFood);

  // Update routes
  app.get('/updatefood/:id', foodUpdate.getFoodItem);
  app.post('/updatefood/:id', foodUpdate.updateFoodItem);

  // Delete routes
  app.get('/deletefood/:id', foodDelete.getFoodItem);
  app.post('/deletefood/:id', foodDelete.deleteFoodItem);
};
