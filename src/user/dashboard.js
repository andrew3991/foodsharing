'use strict';

const foodList = require('../food/list');

// GET dashboard
exports.dashboard = function dashboard(req, res) {
  let message = '';
  if (req.isAuthenticated()) {
    let name = '';
    let userId;
    if (req.user.firstname.length > 0) {
      name = req.user.firstname;
      userId = req.user.id;
    }

    // List all food items on dashboard
    const foodPromise = foodList.listUserFood(userId);
    foodPromise.then((rows) => {
      const foodItems = [];
      rows.forEach((item) => foodItems.push(item));
      return foodItems;
    })
      .then((foodRows) => {
        res.render('views/dashboard', {
          name,
          foodRows,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    message = 'User is not logged in';
    res.render('views/login', {
      message,
    });
  }
};
