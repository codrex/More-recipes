const rules = {
  name: {
    presence: true,
    format: {
      pattern: '[a-zA-Z ]+',
      flags: 'i',
      message: 'can only contain alphabet',
    },
    length: {
      minimum: 2,
      message: 'must be at least 2 character',
    },
  },
  password: {
    presence: true,
    length: {
      minimum: 6,
      message: 'must be at least 6 character',
    },
  },
  username: {
    presence: true,
    noSpace: true,
    format: {
      pattern: '[a-z0-9A-Z_]+',
      flags: 'i',
      message: 'can only contain alphabet, number and underscore',
    },
    length: {
      minimum: 3,
      message: ' must be at least 3 character',
    },
  },
  fullname: {
    presence: true,
    words: true,
    format: {
      pattern: '[a-zA-Z ]+',
      flags: 'i',
      message: 'can only contain alphabet',
    },
  },
  email: {
    presence: true,
    email: true,
  },
  id: {
    presence: {
      message: 'sent is invalid'
    },
    numericality: {
      onlyInteger: true,
      greaterThan: 0,
    },
  },
  stringArray: {
    stringArray: true,
  },
  numberArray: {
    numberArray: true,
  },
};

const constraints = {
  loginWithUsernameConstraint: {
    username: rules.username,
    password: rules.password,
  },
  signupConstraint: {
    username: rules.username,
    password: rules.password,
    email: rules.email,
    fullname: rules.fullname,
  },
  profileUpdateConstraint: {
    username: rules.username,
    email: rules.email,
    fullname: rules.fullname,
  },
  createRecipeConstraint: {
    name: rules.name,
    category: rules.name,
    ingredients: rules.stringArray,
    directions: rules.stringArray,
    image: {
      presence: true,
      isString: true,
    },
    ownerId: rules.id,
  },
  idConstraint: {
    id: rules.id,
  },
  reviewConstraint: {
    review: {
      presence: true,
      length: {
        minimum: 2,
        message: 'must be at least 2 character',
      },
    },
  },
  voteConstraint: {
    id: rules.id,
    vote: {
      presence: {
        message: 'parameter is invalid, only true or false is allowed'
      },
      format: {
        pattern: '(true|false)$',
        flags: 'i',
        message: 'parameter is invalid, only true or false is allowed',
      },
    }
  },
  recipeIdsConstraint: {
    recipeIds: rules.numberArray
  }
};

export default constraints;
