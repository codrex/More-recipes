import supertest from 'supertest';
import { expect } from 'chai';
import app from '../bin/www';
import * as mock from './mock';

const request = supertest(app);

const userSpec = (repiceSpec) => {
  let userTwo = {};
  let userOne = {};
  let token;
  let token2;
  const { userSignupData, userLoginData } = mock;

  // user sign up
  describe('User registration', () => {
    beforeEach(() => {
      userOne = userSignupData.userOne;
      userTwo = userSignupData.userTwo;
    });
    it('should retrun success when user registers with valid data', (done) => {
      request.post('/api/v1/users/signup')
        .send(userTwo)
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body.user.fullname).to.equal(userTwo.fullname);
          expect(res.body.status).to.equal('success');
          expect(res.body.user).instanceOf(Object);
          done();
        });
    });
    it('should return success when a second user registers', (done) => {
      request.post('/api/v1/users/signup')
        .send(userOne)
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body.status).to.equal('success');
          done();
        });
    });
    it('should fail when user attempts to register with an existing email ', (done) => {
      const invalidData = userTwo;
      invalidData.username = 'exampleuser2';
      request.post('/api/v1/users/signup')
        .send(invalidData)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.status).to.equal('fail');
          done();
        });
    });
    it('should fail when user attempts to register with an existing username', (done) => {
      const invalidData = userOne;
      invalidData.email = 'example2@user.com';
      request.post('/api/v1/users/signup')
        .send(invalidData)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.status).to.equal('fail');
          done();
        });
    });
    it('should fail when user attempts to register with an invalid email', (done) => {
      const invalidData = userTwo;
      invalidData.email = 'example2user.com';
      request.post('/api/v1/users/signup')
        .send(invalidData)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.status).to.equal('fail');
          done();
        });
    });
    it('should fail when user attempts to register with an invalid username', (done) => {
      const invalidData = userTwo;
      invalidData.username = 'e.com';
      request.post('/api/v1/users/signup')
        .send(invalidData)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.status).to.equal('fail');
          done();
        });
    });
    it('should fail when user attempts to register with an invalid password', (done) => {
      const invalidData = userTwo;
      invalidData.password = 'ecom';
      request.post('/api/v1/users/signup')
        .send(invalidData)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.status).to.equal('fail');
          done();
        });
    });
    it('should fail when user attempts to register with an invalid fullname', (done) => {
      request.post('/api/v1/users/signup')
        .send({
          ...userOne,
          fullname: 'fullname',
          username: 'test_user',
          email: 'email@gmail.com'
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.status).to.equal('fail');
          done();
        });
    });
  });

  // user login
  describe('User Login', () => {
    beforeEach(() => {
      userOne = userLoginData.userOne;
      userTwo = userLoginData.userTwo;
    });

    it('should return success when user login with valid credentials ', (done) => {
      request.post('/api/v1/users/signin')
        .send(userOne)
        .end((err, res) => {
          token = res.body.user.token;
          expect(res.status).to.equal(200);
          expect(res.body.status).to.equal('success');
          expect(res.body.user.token).to.not.be.undefined;
          token = res.body.user.token;
          global.token = res.body.user.token;
          done();
        });
    });
    it('should return success when a second user login with valid credentials', (done) => {
      request.post('/api/v1/users/signin')
        .send(userTwo)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.status).to.equal('success');
          expect(res.body.user.token).to.not.be.undefined;
          token2 = res.body.user.token;
          global.token2 = res.body.user.token;
          done();
        });
    });
    it('should fail when user supplied an invalid username', (done) => {
      const invalidData = userOne;
      invalidData.username = 'kester';
      request.post('/api/v1/users/signin')
        .send(invalidData)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.status).to.equal('fail');
          done();
        });
    });
    it('should fail when user supplied an invalid password', (done) => {
      const invalidData = userOne;
      invalidData.password = 'ecom';
      request.post('/api/v1/users/signin')
        .send(invalidData)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.status).to.equal('fail');
          done();
        });
    });
  });
  describe('view profile', () => {
    it('should return success when user with token, sends a request to view user profile ', (done) => {
      request.get('/api/v1/users/1')
        .set('Authorization', token)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.status).to.equal('success');
          done();
        });
    });
    it('should fail when user without token, sends a request to view user profile ', (done) => {
      request.get('/api/v1/users/1')
        .end((err, res) => {
          expect(res.status).to.equal(401);
          expect(res.body.status).to.equal('fail');
          done();
        });
    });
    it('should fail when user is not found', (done) => {
      request.get('/api/v1/users/100')
        .set('Authorization', token)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.status).to.equal('fail');
          done();
        });
    });
  });

  // edit user profile
  describe('Profile update', () => {
    let updateOne = {};
    beforeEach(() => {
      updateOne = {
        fullname: 'example user two',
        username: 'example_user_2',
        email: 'exampleTwo@user.com',
      };
    });
    const updateTwo = {
      fullname: 'example user',
    };

    it('should return success when valid user sends a request to update his/her profile', (done) => {
      request.put('/api/v1/users/update')
        .set('Authorization', token2)
        .send(updateOne)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.status).to.equal('success');
          expect(res.body.user.fullname).to.equal('example user two');
          done();
        });
    });
    it('should return success when user update a single field', (done) => {
      request.put('/api/v1/users/update')
        .set('Authorization', token2)
        .send(updateTwo)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.status).to.equal('success');
          expect(res.body.user.fullname).to.equal('example user');
          done();
        });
    });
    it('should fail when user without a token request a profile update', (done) => {
      request.put('/api/v1/users/update')
        .send(updateTwo)
        .end((err, res) => {
          expect(res.status).to.equal(401);
          expect(res.body.status).to.equal('fail');
          done();
        });
    });
    it('should fail when user with an invalid userId attempts to update profile', (done) => {
      request.put('/api/v1/users/update')
        .set('Authorization', mock.fakeToken)
        .send(updateTwo)
        .end((err, res) => {
          expect(res.status).to.equal(401);
          expect(res.body.status).to.equal('fail');
          done();
        });
    });
    it('should fail when user sent an existing email ', (done) => {
      const invalidData = updateOne;
      invalidData.username = 'exampleuser2';
      request.put('/api/v1/users/update')
        .set('Authorization', token)
        .send(invalidData)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.status).to.equal('fail');
          done();
        });
    });
    it('should fail when user sent an existing username ', (done) => {
      const invalidData = updateOne;
      invalidData.email = 'example2@user.com';
      request.put('/api/v1/users/update')
        .set('Authorization', token)
        .send(invalidData)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.status).to.equal('fail');
          done();
        });
    });
    it('should fail when user sent an invalid email ', (done) => {
      const invalidData = userTwo;
      invalidData.email = 'example2user.com';
      request.put('/api/v1/users/update')
        .set('Authorization', token)
        .send(invalidData)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.status).to.equal('fail');
          done();
        });
    });
    it('should fail when user sent an invalid username', (done) => {
      const invalidData = userTwo;
      invalidData.username = 'e.com';
      request.put('/api/v1/users/update')
        .set('Authorization', token)
        .send(invalidData)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.status).to.equal('fail');
          done();
        });
    });
    it('should fail when user sent an invalid fullname', (done) => {
      const invalidData = userTwo;
      invalidData.fullname = 'pe';
      request.put('/api/v1/users/update')
        .set('Authorization', token)
        .send(invalidData)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.status).to.equal('fail');
          done();
        });
    });
  });

  // get user votes
  describe('get user votes', () => {
    it('return success when all ids are numbers', (done) => {
      request.get('/api/v1/users/votes?ids=1,2,3')
        .set('Authorization', token)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.status).to.equal('success');
          expect(typeof res.body.votes).to.be.equal(typeof []);
          done();
        });
    });
    it('return success when an alphabet is passed as an id', (done) => {
      request.get('/api/v1/users/votes?ids=1,2,kdjd')
        .set('Authorization', token)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.status).to.equal('success');
          expect(typeof res.body.votes).to.be.equal(typeof []);
          done();
        });
    });
    it('return success when no id was sent', (done) => {
      request.get('/api/v1/users/votes')
        .set('Authorization', token2)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.status).to.equal('success');
          expect(res.body.votes).to.be.eql([]);
          done();
        });
    });
    after(() => repiceSpec());
  });
};

export default userSpec;
