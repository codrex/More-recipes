/* eslint-disable import/no-extraneous-dependencies */
import jwt from 'jsonwebtoken';
import faker from 'faker';
import dotenv from 'dotenv';

dotenv.config();

export const TEST_REVIEW = 'testing something';
export const expiredToken = jwt.sign({ id: 1 }, process.env.secret, {
  expiresIn: '.1s'
});

export const fakeToken = jwt.sign({ id: 100 }, process.env.secret, {
  expiresIn: '1d'
});

export const recipe = {
  name: 'beans cake',
  category: 'breakfast',
  ingredients: ['beans', 'water', 'oil'],
  directions: ['step 1', 'step 2', 'step 3'],
  image: 'image'
};

export const recipeUpdateData = {
  recipeDataOne: {
    name: 'beans cakes',
  },
  recipeDataTwo: {
    name: 'beans cake update',
    category: 'breakfast',
  },
  recipeDataThree: {
    name: 'beans',
    category: 'breakfast',
    ingredients: ['beans', 'water', 'oil'],
  },
  recipeDataFour: {
    name: 'beans and rice',
    category: 'dinner',
    ingredients: ['beans', 'rice', 'oil'],
    directions: ['step 1', 'step 2', 'step 3', 'step 4'],
  }
};

export const userSignupData = {
  johnUser: {
    fullname: 'example user',
    username: 'example_user',
    password: '123456',
    email: 'example@user.com',
  },
  peterUser: {
    fullname: 'example user two',
    username: 'example_user_2',
    password: '123456',
    email: 'exampleTwo@user.com',
  },
};

export const userLoginData = {
  johnUser: {
    username: 'example_user',
    password: '123456',
  },
  peterUser: {
    username: 'example_user_2',
    password: '123456',
  },
};

export const recipeTestUsers = {
  johnUser: {
    username: faker.name.firstName(),
    fullname: faker.name.findName(),
    email: faker.internet.email(),
    password: '1234567'
  },
  peterUser: {
    username: faker.name.firstName(),
    fullname: faker.name.findName(),
    email: faker.internet.email(),
    password: '1234567'
  }
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
