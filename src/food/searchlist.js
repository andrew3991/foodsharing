'use strict';

const knex = require('../db/knex.js');

// lists food items, which don't belong to the user (userId)
exports.searchList = function searchlist(userId, search, category) {
  return new Promise((resolve, reject) => {
    // Get all food items, which don't belong to the user (userId)
    getFoodItems(userId, search, category).then((foodItems) => {
      // Get the user of each food item
      const userPromises = [];
      foodItems.forEach((item) => {
        item.user = getUser(item.user_id);
        userPromises.push(item.user);
      });

      Promise.all(userPromises).then((user) => {
        // Resolve, after all foodItemUser-Promises are resolved
        for (let i = 0; i < user.length; i++) {
          foodItems[i].user = user[i][0];
        }
        resolve(foodItems);
      }).catch((reason) => {
        reject(reason);
      });
    }).catch((reason) => {
      reject(reason);
    });
  });
};


// Get all food items, which don't belong to the user
function getFoodItems(userId, search, category) {
  return new Promise((resolve, reject) => {
    if (userId !== undefined) {
      resolve(knex.from('food').select('*').whereNot('user_id', userId).where('title', 'like', '%' + search + '%').where('category', 'like', '%' + category + '%'));
    } else {
      reject(new Error('User does not exist'));
    }
  });
}

// Get the user, that belongs to the given food-item. Don't select the password!
function getUser(userId) {
  return new Promise((resolve, reject) => {
    if (userId !== undefined) {
      resolve(knex.from('user').select('id', 'firstname', 'lastname', 'email').where('id', userId));
    } else {
      reject(new Error('User does not exist'));
    }
  });
}
