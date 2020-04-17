'use strict';

const knex = require('../db/knex.js');
const validate = require('./validate');

// GET food | display warning page before deleting food item
exports.getFoodItem = function getFoodItem(req, res) {
  let message = '';
  if (req.isAuthenticated()) {
    const userId = req.user.id;
    const name = req.user.firstname;
    let foodId = req.params.id;

    // Check if parameter in url is type of string and turn it into number
    foodId = validate.changeValueToNumber(foodId);

    // console.log('typeof userId: ', typeof userId);
    // console.log('typeof foodId: ', typeof foodId);

    // Select the food item that is given in the url (id) and render delete_food
    // if the food item exists and belongs to the currently logged in user
    knex('food').where({ id: foodId }).first()
      .then((foodItem) => {
        // Check if food item exsists
        // https://stackoverflow.com/questions/48531570/knexjs-and-es6-try-catch-causing-an-unhandled-promise-rejection-warning
        if (!foodItem) {
          throw new Error('Food does not exist');
        }

        // Check if user is owner of food item
        if (userId !== foodItem.user_id) {
          res.redirect('/dashboard');
        } else {
          res.render('./views/partials/delete_food', { foodItem, name });
        }
      })
      .catch((err) => {
        // Error handling: https://alphacoder.xyz/nodejs-unhandled-promise-rejection-warning/
        console.log('error: ', err.message);
        res.redirect('/dashboard');
      });
  } else {
    message = 'User is not logged in';
    res.render('views/login', {
      message,
    });
  }
};

// POST food | delete food item
exports.deleteFoodItem = function deleteFoodItem(req, res) {
  let message = '';
  if (req.isAuthenticated()) {
    let foodId = req.params.id;

    if (req.method === 'POST') {
      // Check if foodId is type of string and turn it into number
      foodId = validate.changeValueToNumber(foodId);

      // Delete food item
      return knex('food').where({ id: foodId }).first().del()
        .then(() => {
          res.redirect('/dashboard');
        });
    }
  }
  message = 'User is not logged in';
  return res.render('views/login', {
    message,
  });
};
