const logout = require('../logout');

// POST logout testing
test('Redirect to login', () => {
  let redirect = '';
  let authenticated = true;
  const req = {
    session: {
      destroy: () => {
        authenticated = false;
      },
    },
  };
  const res = {
    redirect: (route) => {
      redirect = route;
    },
  };
  logout.postLogout(req, res);
  // Expect redirect to login-page after logout
  expect(redirect).toEqual('/login');
});

test('destroy session', () => {
  let redirect = '';
  let authenticated = true;
  const req = {
    session: {
      destroy: () => {
        authenticated = false;
      },
    },
  };
  const res = {
    redirect: (route) => {
      redirect = route;
    },
  };
  logout.postLogout(req, res);
  expect(authenticated).toBe(false);
});
