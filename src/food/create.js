'use strict';

const knex = require('../db/knex.js');
const categoryList = require('./categories');
const validate = require('./validate');

// GET food | display form for entering attributes
exports.getFood = function getFood(req, res) {
  let message = '';
  if (req.isAuthenticated()) {
    const name = req.user.firstname;
    const categories = categoryList.getCategories();
    return res.render('views/partials/create_food', {
      name,
      categories,
      message,
    });
  }
  message = 'User is not logged in';
  return res.render('views/login', {
    message,
  });
};

// POST food | save a new food item into the database
exports.postFood = function postFood(req, res) {
  let message = '';
  if (req.isAuthenticated()) {
    let userId = req.user.id;
    const name = req.user.firstname;
    const categories = categoryList.getCategories();

    if (req.method === 'POST') {
      // Check if userId is type of string and turn it into number
      userId = validate.changeValueToNumber(userId);

      // Check if zipcode is type of string and turn it into number
      req.body.zipcode = validate.changeValueToNumber(req.body.zipcode);

      // Check if streetnumber is type of string and turn it into number
      req.body.streetnumber = validate.changeValueToNumber(req.body.streetnumber);

      // console.log('typeof zipcode: ', typeof req.body.zipcode);
      // console.log('typeof streetnumber: ', typeof req.body.streetnumber);

      // Validate data input from formular and save data input
      // into database if it is valid
      validate.validateFoodData(req.body)
        .then((valid) => {
          if (valid === true) {
            return knex('food').insert({
              title: req.body.title,
              description: req.body.description,
              city: req.body.city,
              zipcode: req.body.zipcode,
              street: req.body.street,
              streetnumber: req.body.streetnumber,
              category: req.body.category,
              user_id: userId,
            });
          }
          return true;
        })
        .then(() => res.redirect('/dashboard'))
        .catch((err) => {
          message = err.message;
          res.render('views/partials/create_food', {
            name,
            categories,
            message,
          });
        });
    }
  } else {
    message = 'User is not logged in';
    res.render('views/login', {
      message,
    });
  }
};
