const login = require('../login');

// jest.mock('passport');

// GET login testing
test('User already authenticated', () => {
  let redirect = '';
  let render = '';
  const req = {
    isAuthenticated: () => true,
  };
  const res = {
    redirect: (route) => {
      redirect = route;
    },
    render: (route) => {
      render = route;
    },
  };
  login.login(req, res);
  // Expect redirect to Dashboard, because user is authenticated
  expect(redirect).toEqual('/dashboard');
});

test('User not authenticated', () => {
  let redirect = '';
  let render = '';
  const req = {
    isAuthenticated: () => false,
  };
  const res = {
    redirect: (route) => {
      redirect = route;
    },
    render: (route) => {
      render = route;
    },
  };
  login.login(req, res);
  // Expect render of Login-Page, because user is not authenticated
  expect(render).toEqual('views/login');
});
