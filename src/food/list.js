'use strict';

const knex = require('../db/knex.js');

// GET | list all food items
exports.listAllFood = function listAllFood(req, res) {
  return knex.from('food').select('*')
    .then((foodRows) => {
      res.render('views/partials/list_food', { foodRows });
    }).catch((err) => { console.log(err); throw err; });
};

// GET | list only user related food items
exports.listUserFood = function listUserFood(userId) {
  return new Promise((resolve, reject) => {
    if (!userId) {
      reject();
    } else {
      resolve(knex.from('food').select('*').where('user_id', userId));
    }
  });
};
