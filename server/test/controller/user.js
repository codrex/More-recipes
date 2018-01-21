/* eslint-disable import/no-extraneous-dependencies, no-unused-expressions */
import supertest from 'supertest';
import { expect } from 'chai';
import app from '../../bin/www';
import * as mock from './mock';

const request = supertest(app);
let johnUser = {};
let peterUser = {};
let johnToken;
let peterToken;
const {
  userSignupData,
  userLoginData
} = mock;

describe('User', () => {
  describe('Registration: ', () => {
    beforeEach(() => {
      johnUser = { ...userSignupData.johnUser };
      peterUser = { ...userSignupData.peterUser };
    });

    it('should return success when user registers with valid data', (done) => {
      request.post('/api/v1/users/signup')
        .send(peterUser)
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body.user.fullname).to.equal(peterUser.fullname);
          expect(res.body.status).to.equal('success');
          expect(res.body.user).instanceOf(Object);
          expect(res.body.user.token).not.to.be.undefined;
          delete peterUser.password;
          expect(res.body.user).to.deep.include(peterUser);
          done();
        });
    });

    it('should return success when a second user registers with valid data',
      (done) => {
        request.post('/api/v1/users/signup')
          .send(johnUser)
          .end((err, res) => {
            expect(res.status).to.equal(201);
            expect(res.body.status).to.equal('success');
            expect(res.body.user).instanceOf(Object);
            expect(res.body.user.token).not.to.be.undefined;
            delete johnUser.password;
            expect(res.body.user).to.deep.include(johnUser);
            done();
          });
      });

    it('should fail when user attempts to register with an existing email ',
      (done) => {
        const invalidData = peterUser;
        invalidData.username = 'exampleuser2';
        request.post('/api/v1/users/signup')
          .send(invalidData)
          .end((err, res) => {
            expect(res.status).to.equal(409);
            expect(res.body.status).to.equal('fail');
            expect(res.body.error)
              .to.equal('Sorry, email already exists, please enter another');
            done();
          });
      });

    it('should fail when user attempts to register with an existing username',
      (done) => {
        const invalidData = johnUser;
        invalidData.email = 'example2@user.com';
        request.post('/api/v1/users/signup')
          .send(invalidData)
          .end((err, res) => {
            expect(res.status).to.equal(409);
            expect(res.body.status).to.equal('fail');
            expect(res.body.error)
              .to.equal('Sorry, username already exists, please enter another');
            done();
          });
      });

    it('should fail when user attempts to register with an invalid email',
      (done) => {
        const expectedError = {
          email: ['Email is not a valid email']
        };
        const invalidData = peterUser;
        invalidData.email = 'example2user.com';
        request.post('/api/v1/users/signup')
          .send(invalidData)
          .end((err, res) => {
            expect(res.status).to.equal(400);
            expect(res.body.status).to.equal('fail');
            expect(res.body.error).to.eql(expectedError);
            done();
          });
      });

    it(`should fail when username contains special characters expect
    for underscore`,
      (done) => {
        const expectedError = {
          username: [
            'Username can only contain alphabet, number and underscore'
          ],
        };
        const invalidData = peterUser;
        invalidData.username = 'e.com';
        request.post('/api/v1/users/signup')
          .send(invalidData)
          .end((err, res) => {
            expect(res.status).to.equal(400);
            expect(res.body.status).to.equal('fail');
            expect(res.body.error).to.eql(expectedError);
            done();
          });
      });

    it('should fail when password is not up to 6 character',
      (done) => {
        const expectedError = {
          password: ['Password must be at least 6 character']
        };
        const invalidData = peterUser;
        invalidData.password = 'ecom';
        request.post('/api/v1/users/signup')
          .send(invalidData)
          .end((err, res) => {
            expect(res.status).to.equal(400);
            expect(res.body.status).to.equal('fail');
            expect(res.body.error).to.eql(expectedError);
            done();
          });
      });

    it('should fail when fullname is not more than one word',
      (done) => {
        const expectedError = {
          fullname: ['Fullname must be more than one word']
        };
        request.post('/api/v1/users/signup')
          .send({
            ...johnUser,
            fullname: 'fullname',
            username: 'test_user',
            email: 'email@gmail.com'
          })
          .end((err, res) => {
            expect(res.status).to.equal(400);
            expect(res.body.status).to.equal('fail');
            expect(res.body.error).to.eql(expectedError);
            done();
          });
      });
  });

  describe('Login: ', () => {
    beforeEach(() => {
      johnUser = { ...userLoginData.johnUser };
      peterUser = { ...userLoginData.peterUser };
    });

    it('should return success when user login with valid credentials ',
      (done) => {
        const expectUserData = { ...userSignupData.johnUser };
        delete expectUserData.password;
        request.post('/api/v1/users/signin')
          .send(johnUser)
          .end((err, res) => {
            johnToken = res.body.user.token;
            expect(res.status).to.equal(200);
            expect(res.body.status).to.equal('success');
            expect(res.body.user.token).to.not.be.undefined;
            expect(res.body.user).to.deep.include(expectUserData);
            done();
          });
      });

    it('should return success when a second user login with valid credentials',
      (done) => {
        const expectUserData = { ...userSignupData.peterUser };
        delete expectUserData.password;
        request.post('/api/v1/users/signin')
          .send(peterUser)
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body.status).to.equal('success');
            expect(res.body.user.token).to.not.be.undefined;
            peterToken = res.body.user.token;
            expect(res.body.user).to.deep.include(expectUserData);
            done();
          });
      });

    it('should fail when user sends an incorrect username', (done) => {
      const invalidData = johnUser;
      invalidData.username = 'kester';
      request.post('/api/v1/users/signin')
        .send(invalidData)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.status).to.equal('fail');
          expect(res.body.error).to.equal('invalid username');
          done();
        });
    });

    it('should fail when user supplied an incorrect password', (done) => {
      const invalidData = johnUser;
      invalidData.password = 'password';
      request.post('/api/v1/users/signin')
        .send(invalidData)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.status).to.equal('fail');
          expect(res.body.error).to.equal('invalid password');
          done();
        });
    });
  });

  describe('View profile: ', () => {
    it('should return success when user, sends a request to view user profile',
      (done) => {
        request.get('/api/v1/users/1')
          .set('Authorization', johnToken)
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body.status).to.equal('success');
            expect(res.body.user).to.be.instanceOf(Object);
            expect(res.body.username).to.be.property;
            expect(res.body.fullname).to.be.property;
            expect(res.body.email).to.be.property;
            done();
          });
      });

    it(`should fail when user without token, sends a request to
    view user profile `, (done) => {
        request.get('/api/v1/users/1')
          .end((err, res) => {
            expect(res.status).to.equal(401);
            expect(res.body.status).to.equal('fail');
            expect(res.body.error)
              .to
              .equal(
                'Sorry, authentication failed, you need to login or register'
              );
            done();
          });
      });

    it('should fail when user is not found', (done) => {
      request.get('/api/v1/users/100')
        .set('Authorization', johnToken)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.status).to.equal('fail');
          expect(res.body.error).to.equal('Sorry, user not found');
          done();
        });
    });
  });

  describe('Profile update: ', () => {
    let peterUpdateOne = {};
    beforeEach(() => {
      peterUpdateOne = {
        fullname: 'peter user two',
        username: 'peter_cool',
        email: 'peter@user.com',
      };
    });

    const peterUpdateTwo = {
      fullname: 'example user',
    };

    it(`should return success when valid user sends a request to
    update his/her profile`, (done) => {
        request.put('/api/v1/users/update')
          .set('Authorization', peterToken)
          .send(peterUpdateOne)
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body.status).to.equal('success');
            expect(res.body.user).to.deep.include(peterUpdateOne);
            done();
          });
      });

    it('should return success when user update a single field', (done) => {
      request.put('/api/v1/users/update')
        .set('Authorization', peterToken)
        .send(peterUpdateTwo)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.status).to.equal('success');
          expect(res.body.user.fullname).to.equal('example user');
          done();
        });
    });

    it(`should fail when user without a token request a
    profile update`, (done) => {
        request.put('/api/v1/users/update')
          .send(peterUpdateTwo)
          .end((err, res) => {
            expect(res.status).to.equal(401);
            expect(res.body.status).to.equal('fail');
            expect(res.body.error)
              .to
              .equal(
                'Sorry, authentication failed, you need to login or register'
              );
            done();
          });
      });

    it('should fail when token is fake', (done) => {
      request.put('/api/v1/users/update')
        .set('Authorization', mock.fakeToken)
        .send(peterUpdateTwo)
        .end((err, res) => {
          expect(res.status).to.equal(401);
          expect(res.body.status).to.equal('fail');
          expect(res.body.error)
            .to
            .equal(
              'Sorry, authentication failed, you need to login or register'
            );
          done();
        });
    });

    it('should fail when user sent an existing email ', (done) => {
      const invalidData = peterUpdateOne;
      invalidData.username = 'exampleuser2';
      request.put('/api/v1/users/update')
        .set('Authorization', johnToken)
        .send(invalidData)
        .end((err, res) => {
          expect(res.status).to.equal(409);
          expect(res.body.status).to.equal('fail');
          expect(res.body.error)
            .to
            .equal('Sorry, email already exists, please enter another');
          done();
        });
    });

    it('should fail when user sent an existing username ', (done) => {
      const invalidData = peterUpdateOne;
      invalidData.email = 'example2@user.com';
      request.put('/api/v1/users/update')
        .set('Authorization', johnToken)
        .send(invalidData)
        .end((err, res) => {
          expect(res.status).to.equal(409);
          expect(res.body.status).to.equal('fail');
          expect(res.body.error)
            .to
            .equal('Sorry, username already exists, please enter another');
          done();
        });
    });

    it('should fail when user sent an invalid email ', (done) => {
      const invalidData = peterUpdateOne;
      invalidData.email = 'example2user.com';
      request.put('/api/v1/users/update')
        .set('Authorization', johnToken)
        .send(invalidData)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.status).to.equal('fail');
          expect(res.body.error).to.eql({
            email: ['Email is not a valid email']
          });
          done();
        });
    });

    it('should fail when user fullname is not more than one word', (done) => {
      const invalidData = peterUpdateOne;
      invalidData.fullname = 'pe';
      request.put('/api/v1/users/update')
        .set('Authorization', johnToken)
        .send(invalidData)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.status).to.equal('fail');
          expect(res.body.error).to.eql({
            fullname: ['Fullname must be more than one word']
          });
          done();
        });
    });
  });

  describe('Get votes: ', () => {
    it('return success when all ids are numbers', (done) => {
      request.get('/api/v1/users/votes?ids=1,2,3')
        .set('Authorization', johnToken)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.status).to.equal('success');
          expect(typeof res.body.votes).to.be.equal(typeof []);
          done();
        });
    });

    it('return success when an alphabet is passed as an id', (done) => {
      request.get('/api/v1/users/votes?ids=1,2,kdjd')
        .set('Authorization', johnToken)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.status).to.equal('success');
          expect(typeof res.body.votes).to.be.equal(typeof []);
          done();
        });
    });

    it('return success when no id was sent', (done) => {
      request.get('/api/v1/users/votes')
        .set('Authorization', peterToken)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.status).to.equal('success');
          expect(res.body.votes).to.be.eql([]);
          done();
        });
    });
  });
});
