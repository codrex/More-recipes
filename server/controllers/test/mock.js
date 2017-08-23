const SequelizeMock = require('sequelize-mock')();
const DBConnectionMock = new SequelizeMock();
const UserMock = DBConnectionMock.define('Users', {
  email: 'email@example.com',
  username: 'blink',
  picture: 'user-picture.jpg',
});

module.exports = UserMock;
