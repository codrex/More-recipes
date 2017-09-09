import supertest from 'supertest';
import app from '../bin/www';
import { expect } from 'chai';
const request = supertest(app);

export const userSpec = (repiceSpec) => {
  let testData = {};
  let regData = {};
  let token;
  let token2;

  // user sign up
  describe('User registration', () => {
    beforeEach(() => {
      regData = {
        fullname: 'example user two',
        username: 'example_user_2',
        password: '123456',
        email: 'exampleTwo@user.com',
      };
      testData = {
        fullname: 'example user',
        username: 'example_user',
        password: '123456',
        email: 'example@user.com',
      };
    });
    it('return 200 as status code', done => {
      request.post('/api/v1/users/signup')
      .send(testData)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.status).to.equal('success');
        done();
      });
    });
    it('return 200 as status code', done => {
      request.post('/api/v1/users/signup')
      .send(regData)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.status).to.equal('success');
        done();
      });
    });

    it('return 400 for an already existing email ', done => {
      const invalidData = testData;
      invalidData.username = 'exampleuser2';
      request.post('/api/v1/users/signup')
      .send(invalidData)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.status).to.equal('fail');
        done();
      });
    });

    it('return 400 for an already existing username', done => {
      const invalidData = testData;
      invalidData.email = 'example2@user.com';
      request.post('/api/v1/users/signup')
      .send(invalidData)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.status).to.equal('fail');
        done();
      });
    });

    it('return 400 for invalid email', done => {
      const invalidData = testData;
      invalidData.email = 'example2user.com';
      request.post('/api/v1/users/signup')
      .send(invalidData)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.status).to.equal('fail');
        done();
      });
    });
    it('return 400 for invalid username', done => {
      const invalidData = testData;
      invalidData.username = 'e.com';
      request.post('/api/v1/users/signup')
      .send(invalidData)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.status).to.equal('fail');
        done();
      });
    });
    it('return 400 for invalid password', done => {
      const invalidData = testData;
      invalidData.password = 'ecom';
      request.post('/api/v1/users/signup')
      .send(invalidData)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.status).to.equal('fail');
        done();
      });
    });
  });

  // user login
  describe('User Login', () => {
    let testDataLogin = {};
    let loginData = {};

    beforeEach(() => {
      testDataLogin = {
        username: 'example_user',
        password: '123456',
      };
      loginData = {
        username: 'example_user_2',
        password: '123456',
      };
    });

    after(() => repiceSpec(token, token2));

    it('return 200 as status code', done => {
      request.post('/api/v1/users/signin')
      .send(testDataLogin)
      .end((err, res) => {
        token = res.body.User.token;
        expect(res.status).to.equal(200);
        expect(res.body.status).to.equal('success');
        expect(res.body.User.token).to.not.be.undefined;

        done();
      });
    });
    it('return 200 as status code', done => {
      request.post('/api/v1/users/signin')
      .send(loginData)
      .end((err, res) => {
        token2 = res.body.User.token;
        expect(res.status).to.equal(200);
        expect(res.body.status).to.equal('success');
        expect(res.body.User.token).to.not.be.undefined;

        done();
      });
    });
    it('return 200 as status code for get user profile', done => {
      request.get('/api/v1/users/user')
      .set('Authorization', token)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.status).to.equal('success');
        done();
      });
    });
    it('return 403 as status code for get user profile request with no token', done => {
      request.get('/api/v1/users/user')
      .end((err, res) => {
        expect(res.status).to.equal(403);
        expect(res.body.status).to.equal('fail');
        done();
      });
    });
    it('return 400 for invalid username', done => {
      const invalidData = testDataLogin;
      invalidData.username = 'kester';
      request.post('/api/v1/users/signin')
      .send(invalidData)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.status).to.equal('fail');
        done();
      });
    });
    it('return 400 for invalid password', done => {
      const invalidData = testDataLogin;
      invalidData.password = 'ecom';
      request.post('/api/v1/users/signin')
      .send(invalidData)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.status).to.equal('fail');
        done();
      });
    });
    it('return 400 for invalid password', done => {
      const invalidData = testDataLogin;
      invalidData.password = '';
      request.post('/api/v1/users/signin')
      .send(invalidData)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.status).to.equal('fail');
        done();
      });
    });
  });
};

