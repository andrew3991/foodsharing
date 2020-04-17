'use strict';

exports.validateFoodData = function validateFoodData(data) {
  return new Promise((resolve, reject) => {
    // console.log('arguments: ',
    //   data.title,
    //   data.description,
    //   data.category,
    //   data.city,
    //   data.zipcode,
    //   data.street,
    //   data.streetnumber);

    // Check if data is undefined
    if (!data) {
      reject(new Error('No data!'));
    }

    // Check if title is empty
    if (!data.title) {
      reject(new Error('No input in title field. Please enter text!'));
    }

    // Check if title is of type string
    if (typeof data.title !== 'string') {
      reject(new Error('Wrong data type. Please enter text in title field!'));
    }

    // Check if description is empty
    if (!data.description) {
      reject(new Error('No input in description field. Please enter text!'));
    }

    // Check if description is of type string
    if (typeof data.description !== 'string') {
      reject(new Error('Wrong data type. Please enter text in description field!'));
    }

    // Check if category is empty
    if (!data.category) {
      reject(new Error('No input for category. Please choose a category!'));
    }

    // Check if category is of type string
    if (typeof data.category !== 'string') {
      reject(new Error('Wrong data type. Please enter text for category!'));
    }

    // Check if city is empty
    if (!data.city) {
      reject(new Error('No input in city field. Please enter text!'));
    }

    // Check if city is of type string
    if (typeof data.city !== 'string') {
      reject(new Error('Wrong data type. Please enter text in city field!'));
    }

    // Check if street is empty
    if (!data.street) {
      reject(new Error('No input in street field. Please enter text!'));
    }

    // Check if street is of type string
    if (typeof data.street !== 'string') {
      reject(new Error('Wrong data type. Please enter text in street field!'));
    }

    // Check if zipcode is empty
    if (!data.zipcode) {
      reject(new Error('No input in zipcode field. Please enter 5 numbers!'));
    }

    // Check if zipcode has exactly 5 numbers
    // https://stackoverflow.com/questions/14879691/get-number-of-digits-with-javascript
    if (data.zipcode.toString().length !== 5) {
      reject(new Error('Incomplete data. Please enter exactly 5 numbers in zipcode field!'));
    }

    // Check if zipcode is of type number
    if (typeof data.zipcode !== 'number') {
      reject(new Error('Wrong data type. Please enter numbers in zipcode field!'));
    }

    // Check if streetnumber is not empty
    if (!data.streetnumber) {
      reject(new Error('No input in streetnumber field. Please enter numbers!'));
    }

    // Check if streetnumber is of type number
    if (typeof data.streetnumber !== 'number') {
      reject(new Error('Wrong data type. Please enter numbers in streetnumber field!'));
    }

    // If all the data is valid - resolve
    resolve(true);
  });
};

exports.changeValueToNumber = function changeValueToNumber(data) {
  if (typeof data !== 'number') {
    const parsed = parseInt(data, 10);
    return parsed;
  }
  return data;
};
