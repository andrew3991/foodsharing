'use strict';

const knex = require('../db/knex.js');
const categoryList = require('./categories');
const validate = require('./validate');

// GET food | display form for updating the food item
exports.getFoodItem = function getFoodItem(req, res) {
  let message = '';
  if (req.isAuthenticated()) {
    const name = req.user.firstname;
    const userId = req.user.id;
    let foodId = req.params.id;
    const categories = categoryList.getCategories();

    // Check if parameter in url is type of string and turn it into number
    foodId = validate.changeValueToNumber(foodId);

    // console.log('typeof userId: ', typeof userId);
    // console.log('typeof foodId: ', typeof foodId);

    // Select the food item that is given in the url (id) and render update_food
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
          res.render('./views/partials/update_food', { foodItem, categories, message, name });
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

// POST food | update the food item
exports.updateFoodItem = function updateFoodItem(req, res) {
  let message = '';
  if (req.isAuthenticated()) {
    const name = req.user.firstname;
    let foodId = req.params.id;
    const foodItem = req.body;
    const categories = categoryList.getCategories();

    if (req.method === 'POST') {
      // Check if foodId is type of string and turn it into number
      foodId = validate.changeValueToNumber(foodId);

      // Check if zipcode is type of string and turn it into number
      foodItem.zipcode = validate.changeValueToNumber(foodItem.zipcode);

      // Check if streetnumber is type of string and turn it into number
      foodItem.streetnumber = validate.changeValueToNumber(foodItem.streetnumber);

      // Validate data input from formular and save data input
      // into database if it is valid
      validate.validateFoodData(foodItem)
        .then((valid) => {
          if (valid === true) {
            return knex('food')
              .where({ id: foodId }).first()
              .update({
                title: foodItem.title,
                description: foodItem.description,
                city: foodItem.city,
                zipcode: foodItem.zipcode,
                street: foodItem.street,
                streetnumber: foodItem.streetnumber,
                category: foodItem.category,
              });
          }
          return true;
        })
        .then(() => res.redirect('/dashboard'))
        .catch((err) => {
          // The html form does not send the id of the food item back. This is why
          // the id has to be added manually so that the id can be accessed in the url
          // => for accessing /updatefood/:id
          foodItem.id = foodId;
          message = err.message;
          console.log('error: ', message);
          res.render('views/partials/update_food', { foodItem, categories, message, name });
        });
    }
  } else {
    message = 'User is not logged in';
    res.render('views/login', {
      message,
    });
  }
};
