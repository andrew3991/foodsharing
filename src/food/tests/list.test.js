const knex = require('knex');
const mockDb = require('mock-knex');
const list = require('../list');

const userId = { id: 1 };
const db = knex({
  client: 'sqlite',
});

mockDb.mock(db);

test('should resolve to foodItem', (done) => {
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

  return list.listUserFood(userId).then((data) => {
    expect(Promise.resolve(data)).resolves.toEqual(foodItem);
  });
});


test('should call res.render with views/partials/list_food and foodRows', (done) => {
  let render = '';

  const foodRows = {
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
    body: foodRows,
    user: { id: 1 },
  };

  const res = {
    render: (route) => {
      render = route;
    },
  };

  // mock knex connection
  const tracker = mockDb.getTracker();
  tracker.install();
  tracker.on('query', (query) => {
    query.response([{}]);
  });

  db.table('query')
    .then(() => {
      tracker.uninstall();
      done();
    });

  return list.listAllFood(req, res).then(() => {
    // vgl. https://stackoverflow.com/questions/55612624/how-do-i-test-node-js-template-render-in-jest
    expect(res.render).toHaveBeenCalledWith('views/partials/list_food', { foodRows });
  });
});
