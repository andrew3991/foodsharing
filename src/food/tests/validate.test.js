const validate = require('../validate');

test('should return a Number', () => {
  expect(validate.changeValueToNumber('12345')).toBe(12345);
});

test('should return true if values are valid', () => {
  const food = {
    id: 1,
    title: 'Banane',
    description: 'Von 4 Bananen schon 1 gegessen, sehr guter Zustand, nicht zu reif.',
    user_id: 1,
    category: 'Obst',
    city: 'Augsburg',
    zipcode: 86150,
    street: 'Bahnhofstraße',
    streetnumber: 4,
  };

  return validate.validateFoodData(food).then((data) => {
    expect(data).toBe(true);
  });
});

test('tests error with promises: throw error if zipcode is not given as number', () => {
  expect.assertions(1);
  const food = {
    id: 1,
    title: 'Banane',
    description: 'Von 4 Bananen schon 1 gegessen, sehr guter Zustand, nicht zu reif.',
    user_id: 1,
    category: 'Obst',
    city: 'Augsburg',
    zipcode: '86150',
    street: 'Bahnhofstraße',
    streetnumber: 4,
  };
  return validate.validateFoodData(food).catch((e) => expect(e).toEqual(
    new Error('Wrong data type. Please enter numbers in zipcode field!')
  ));
});
