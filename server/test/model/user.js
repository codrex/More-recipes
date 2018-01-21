/* eslint-disable import/no-extraneous-dependencies, no-unused-expressions */

import { expect } from 'chai';
import faker from 'faker';
import db from '../../models';

const { Users } = db;
const uniquenessError = 'SequelizeUniqueConstraintError';
const validationError = 'SequelizeValidationError';

describe('User model', () => {
  let fakerUserData;
  beforeEach(() => {
    fakerUserData = {
      fullname: 'john doe',
      email: faker.internet.email(),
      profilePix: 'none',
      username: faker.name.findName(),
      password: 'password'
    };
  });

  it('should create a user model object', (done) => {
    Users.create({ ...fakerUserData, username: 'username' })
      .then((user) => {
        expect(user).to.instanceof(Object);
        expect(user.username).to.equal('username');
        expect(user.fullname).to.equal(fakerUserData.fullname);
        expect(user.email).to.equal(fakerUserData.email);
        expect(user.password).not.to.equal(fakerUserData.password);
        done();
      });
  });

  it('should throw an error when username is not unique', (done) => {
    Users.create({ ...fakerUserData, username: 'username' })
      .catch((error) => {
        expect(error).not.to.be.undefined;
        expect(error.name).to.equal(uniquenessError);
        done();
      });
  });

  describe('Email: ', () => {
    before((done) => {
      Users.create({ ...fakerUserData, email: 'email@email.com' })
        .then(() => {
          done();
        });
    });

    it('should throw an error when email is not unique', (done) => {
      Users.create({ ...fakerUserData, email: 'email@email.com' })
        .catch((error) => {
          expect(error).not.to.be.undefined;
          expect(error.name).to.equal(uniquenessError);
          done();
        });
    });

    it('should throw an error when email is not valid', (done) => {
      Users.create({ ...fakerUserData, email: 'emailemail.com' })
        .catch((error) => {
          expect(error).not.to.be.undefined;
          expect(error.name).to.equal(validationError);
          done();
        });
    });
  });
});
