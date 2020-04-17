const home = require('../home');

// GET home testing
test('User already authenticated', () => {
  let redirect = '';
  const req = {
    isAuthenticated: () => true,
  };
  const res = {
    redirect: (route) => {
      redirect = route;
    },
  };
  home.home(req, res);
  // Expect redirect to Dashboard, because user is authenticated
  expect(redirect).toEqual('/dashboard');
});

test('User not authenticated', () => {
  let redirect = '';
  const req = {
    isAuthenticated: () => false,
  };
  const res = {
    redirect: (route) => {
      redirect = route;
    },
  };
  home.home(req, res);
  // Expect redirect to Login-Page, because user is not authenticated
  expect(redirect).toEqual('/login');
});
