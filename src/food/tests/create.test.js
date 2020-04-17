const knex = require('knex');
const mockDb = require('mock-knex');

const create = require('../create');
const validate = require('../validate');

const db = knex({
  client: 'sqlite',
});

mockDb.mock(db);

// vgl. https://medium.com/@rickhanlonii/understanding-jest-mocks-f0046c68e53c
test('should call validateFoodData() with req.body', (done) => {
  const foodItem = {
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
  const req = {
    isAuthenticated: () => true,
    body: foodItem,
    user: {
      id: 1,
      firstname: 'Max',
    },
    method: 'POST',
  };
  const addMock = jest.spyOn(validate, 'validateFoodData');

  const res = {
    render: () => done(),
  };
  create.postFood(req, res);
  expect(addMock).toHaveBeenCalledWith(req.body);
});

test('should render partial template', () => {
  let render = '';
  const req = {
    isAuthenticated: () => true,
    user: {
      id: 1,
      firstname: 'Max',
    },
  };
  const res = {
    render: (route) => {
      render = route;
    },
  };
  create.getFood(req, res);
  expect(render).toEqual('views/partials/create_food');
});

/*
test('should add a new food item', (done) => {
  const foodItem = {
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

  // mock knex connection
  const tracker = mockDb.getTracker();
  tracker.install();
  tracker.on('query', (query) => {
    query.response(foodItem);
  });

  db.table('query')
    .then(() => {
      tracker.uninstall();
      done();
    });

  const req = {
    isAuthenticated: () => true,
    body: foodItem,
    user: { id: 1 },
  };
  console.log('req: ', req.body);

  const res = {
    render: () => done(),
    redirect: () => done(),
  };

  const validateFoodData = () => true;
  validateFoodData();
  console.log('create.postFood(req, res): ', create.postFood(req, res));

  // return validate.validateFoodData(req.body).then((data) => expect(data).toEqual(true));
  return create.postFood(req, res).then((data) => expect(data).toEqual(foodItem));
});
*/