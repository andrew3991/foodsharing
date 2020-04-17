'use strict';

const foodList = require('./list');
const foodSearchList = require('./searchlist');
const foodCategories = require('./categories');

// GET and POST dashboard
// difference between GET and POST:
// GET: search-phrase is empty
// POST: search-phrase in req.body.search
exports.dashboard = function dashboard(req, res) {
  if (req.isAuthenticated()) {
    let name = '';
    let userId;
    let search = '';
    let category = '';
    if (req.user.firstname.length > 0) {
      name = req.user.firstname;
      userId = req.user.id;
    }

    // put search phrase into search-variable
    if (req.method === 'POST') {
      search = req.body.search;
      category = req.body.category;
    }

    // list all food items on dashboard
    const userListPromise = foodList.listUserFood(userId);
    const searchListPromise = foodSearchList.searchList(userId, search, category);
    const categories = foodCategories.getCategories();

    userListPromise.then((userListRows) => {
      const userFoodItems = [];
      userListRows.forEach((item) => userFoodItems.push(item));

      searchListPromise.then((searchListRows) => {
        const searchListItems = [];
        searchListRows.forEach((item) => {
          searchListItems.push(item);
        });

        res.render('views/dashboard', {
          name,
          userFoodItems,
          searchListItems,
          search,
          category, // selected category
          categories, // list of all categories
        });
      }).catch((reason) => {
        // Somthing went wrong. Print error to console, logout and redirect to login-page
        console.log(reason);
        req.session.destroy();
        res.redirect('/login');
      });
    }).catch((reason) => {
      // Somthing went wrong. Print error to console, logout and redirect to login-page
      console.log(reason);
      req.session.destroy();
      res.redirect('/login');
    });
  } else {
    res.redirect('/login');
  }
};
