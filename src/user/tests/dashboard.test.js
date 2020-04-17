const dashboard = require('../dashboard');

// GET dashboard testing
test('User not authenticated', () => {
  let render = '';
  const req = {
    isAuthenticated: () => false,
  };
  const res = {
    render: (route) => {
      render = route;
    },
  };
  dashboard.dashboard(req, res);
  // Expect render of Login-Page, because user is not authenticated
  expect(render).toEqual('views/login');
});
