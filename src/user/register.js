'use strict';

const bcrypt = require('bcrypt');
const knex = require('../db/knex.js');

const saltRounds = 10;

// GET register
exports.register = function register(req, res) {
  const message = '';
  if (req.isAuthenticated()) {
    res.redirect('/dashboard');
  } else {
    res.render('views/register', {
      message,
    });
  }
};

// POST register
exports.postRegister = function postRegister(req, res) {
  if (req.method === 'POST') {
    const user = req.body;

    // validate input data
    // if data is valid, save user to database and redirect to login
    // if data is invalid, reject with error
    validateRegistrationData(user).then((valid) => {
      if (valid === true) {
        // input data is valid
        // encrypt password and add user to database and redirect to login
        bcrypt.hash(user.password, saltRounds, (err, hash) => {
          if (err) {
            console.log(err);
          }
          // console.log(user.email);
          // console.log(hash);
          knex('user').insert([{
            email: user.email,
            password: hash,
            firstname: user.firstname,
            lastname: user.lastname,
          }]).then(
            res.redirect('/login'),
          );
        });
      }
    }, (err) => {
      // invalid input data - display error
      // res.send(err.message);
      const message = err.message;
      return res.render('views/register', {
        message,
      });
    });
  }
};

function validateRegistrationData(user) {
  return new Promise((resolve, reject) => {
    // Validate, if all form fields are filled
    if (!user.firstname || user.firstname.length <= 0
      || !user.lastname || user.lastname.length <= 0
      || !user.email || user.email.length <= 0
      || !user.password || user.password.length <= 0) {
      reject(new Error('Incomplete data. Please fill in registration form'));
    }

    // Validate if the password is long enougth
    if (user.password.length <= 5) {
      reject(new Error('Weak password. Password must contain at least 5 digits'));
    }

    // Validate firstname
    if (!validateName(user.firstname)) {
      reject(new Error('Invalid firstname. Please enter your real firstname'));
    }

    // Validate lastname
    if (!validateName(user.lastname)) {
      reject(new Error('Invalid lastname. Please enter your real lastname'));
    }

    // Validate, if email is correct
    if (!validateEmail(user.email)) {
      reject(new Error('Invalid mail adress. Please enter your email-adress'));
    }

    // Validate, if user (email) already exists in database
    knex.select().from('user').where('email', user.email)
      .then((myuser) => {
        if (myuser.length > 0) {
          // user already exists - reject
          reject(new Error('User already exists. Please login'));
        } else {
          // input data is valid - resolve
          resolve(true);
        }
      });
  });
}

function validateName(name) {
  // regex used from: https://stackoverflow.com/questions/2385701/regular-expression-for-first-and-last-name
  // added 'ä', 'ö' and 'ü'
  const regex = /^[a-zäöü ,.'-]+$/i;
  return regex.test(name);
}

function validateEmail(email) {
  // regex used from: https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
  const regex = /\S+@\S+\.\S+/;
  return regex.test(email);
}

exports.validateRegistrationData = validateRegistrationData;
exports.validateName = validateName;
exports.validateEmail = validateEmail;
