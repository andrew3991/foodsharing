const register = require('../register');

// name validation
test('A number is not a valid name', () => {
  expect(register.validateName('1234')).toBe(false);
});

test('A name cant contain numbers', () => {
  expect(register.validateName('Max32')).toBe(false);
});

test('A name cant contain special characters', () => {
  expect(register.validateName('Max&Harry')).toBe(false);
});


test('Simple name is valid', () => {
  expect(register.validateName('Max')).toBe(true);
});

test('Doublename (Anne-Sophie) is valid', () => {
  expect(register.validateName('Max-Harry')).toBe(true);
});

test('Doublename (Julius Maximilian) is valid', () => {
  expect(register.validateName('Max Harry')).toBe(true);
});

test('Names including hyphens are valid', () => {
  expect(register.validateName('Max d\'Harry')).toBe(true);
});

// email validation
test('Email-adress must contain @', () => {
  expect(register.validateEmail('max-mustermann')).toBe(false);
});

test('Email-adress must contain a top-level-domain', () => {
  expect(register.validateEmail('max-mustermann@gmail')).toBe(false);
});

test('Email-adress must contain a name', () => {
  expect(register.validateEmail('@gmail.com')).toBe(false);
});


test('Simple Gmail email-adress is valid', () => {
  expect(register.validateEmail('max-mustermann@gmail.com')).toBe(true);
});

test('HS-Augsburg email-adress is valid', () => {
  expect(register.validateEmail('max.mustermann@hs-augsburg.de')).toBe(true);
});

// registration data
test('Complete registration data', () => {
  const user = {
    firstname: 'Max',
    lastname: 'Mustermann',
    email: 'max.mustermann@gmail.com',
    password: 'hasdjkfl',
  };
  return register.validateRegistrationData(user).then((result) => {
    expect(result).toBe(true);
  }, () => {
    throw new Error('incomplete registration data');
  });
});

test('Password not long enough', () => {
  const user = {
    firstname: 'Max',
    lastname: 'Mustermann',
    email: 'max.mustermann@gmail.com',
    password: 'hl',
  };
  return register.validateRegistrationData(user).then(() => {
    throw new Error('registration data shouldnt be complete');
  }, (err) => {
    expect(err).toBeInstanceOf(Error);
  });
});

test('Incomplete registration data', () => {
  const user = {
    firstname: '',
    lastname: '',
    email: '',
    password: '',
  };
  return register.validateRegistrationData(user).then(() => {
    throw new Error('registration data shouldnt be complete');
  }, (err) => {
    expect(err).toBeInstanceOf(Error);
  });
});

test('User already exists', () => {
  const user = {
    firstname: 'Anna',
    lastname: 'Müller',
    email: 'example1@mail.com',
    password: '$2b$10$BnaLpqymDO6N9oTToeZ6z.n5Sy.bNK8fM.TBaIRT8Qw00ESS2BNp.',
  };
  return register.validateRegistrationData(user).then(() => {
    throw new Error('User should already exist');
  }, (err) => {
    expect(err).toBeInstanceOf(Error);
  });
});

// GET register testing
test('User authenticated', () => {
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
  register.register(req, res);
  // Expect redirect to Dashboard, because user is authenticated
  expect(redirect).toEqual('/dashboard');
});

test('Not authenticated', () => {
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
  register.register(req, res);
  // Expect render of Registration-page, because user is not authenticated
  // and wants to create a new profile
  expect(render).toEqual('views/register');
});
