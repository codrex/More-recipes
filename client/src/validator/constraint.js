const constraints = {
  fullname: {
    presence: {
      message: 'Fullname can\'t be blank'
    },
    format: {
      pattern: '[a-zA-Z ]+',
      flags: 'i',
      message: 'can only contain alphabet',
    },
    length: {
      minimum: 2,
      message: 'fullname must be at least 2 character',
    },
  },
  password: {
    presence: {
      message: 'Password can\'t be blank'
    },
    length: {
      minimum: 6,
      message: 'Password must be at least 6 character',
    },
  },
  username: {
    presence: {
      message: 'Username can\'t be blank'
    },
    format: {
      pattern: '[a-z0-9A-Z_]+',
      flags: 'i',
      message: 'can only contain alphabet, number and underscore',
    },
    length: {
      minimum: 3,
      message: ' Username must be at least 3 character',
    },
  },
  email: {
    presence: {
      message: 'Email can\'t be blank'
    },
    email: {
      message: 'Email entered is not valid'
    },
  },
};
export default constraints;
