const constraints = {
  fullname: {
    presence: {
      message: 'Fullname can\'t be blank'
    },
    format: {
      pattern: '[a-zA-Z ]+',
      flags: 'i',
      message: 'Fullname can only contain alphabet',
    },
    length: {
      minimum: 2,
      message: 'Fullname must be at least 2 character',
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
  review: {
    presence: {
      message: 'review can\'t be blank'
    },
  },
  presenceAndLength(fieldName) {
    fieldName = {
      presence: {
        message: `${fieldName} can\'t be blank`
      },
      length: {
        minimum: 2,
        message: `${fieldName}  must be at least 2 character`,
      },
    };
    return fieldName;
  },
};
export default constraints;
