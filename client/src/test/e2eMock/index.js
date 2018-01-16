/* eslint-disable import/no-extraneous-dependencies */
const faker = require('faker');

const user = {
  name: `${faker.name.firstName()} ${faker.name.lastName()}`,
  password: '123456',
  username: `${faker.name.firstName()}name`,
  email: faker.internet.email()
};

module.exports = {
  user,
  baseUrl: 'http://localhost:9000/'
};
