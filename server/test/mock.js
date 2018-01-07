export const TEST_REVIEW = 'testing something';
export const expiredToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OSwiaWF0IjoxNTExMTA4ODIwLCJleHAiOjE1MTExMDg4MjF9.qGQceo6WAEoP_1XgxHbiuonKkF_VPnYtpz52w0IvafI';
export const recipe = {
  name: 'beans cake',
  category: 'breakfast',
  ingredients: ['beans', 'water', 'oil'],
  directions: ['step 1', 'step 2', 'step 3'],
  image: 'image'
};
export const recipeUpdateData = {
  userDataOne: {
    name: 'beans cake',
  },
  userDataTwo: {
    name: 'beans cake',
    category: 'breakfast',
  },
  userDataThree: {
    name: 'beans cake',
    category: 'breakfast',
    ingredients: ['beans', 'water', 'oil'],
  },
  userDataFour: {
    name: 'beans and rice',
    category: 'dinner',
    ingredients: ['beans', 'rice', 'oil'],
    directions: ['step 1', 'step 2', 'step 3', 'step 4'],
  }
};

export const userSignupData = {
  userOne: {
    fullname: 'example user two',
    username: 'example_user_2',
    password: '123456',
    email: 'exampleTwo@user.com',
  },
  userTwo: {
    fullname: 'example user',
    username: 'example_user',
    password: '123456',
    email: 'example@user.com',
  },
};
export const userLoginData = {
  userOne: {
    username: 'example_user',
    password: '123456',
  },
  userTwo: {
    username: 'example_user_2',
    password: '123456',
  },
};

export const userAttribute = [
  'profilePicture',
  'id',
  'fullname',
  'username',
  'email',
  'updatedAt',
  'createdAt',
  'token'
];
