import supertest from 'supertest';
import app from '../bin/www';
import { expect } from 'chai';
const request = supertest(app);

export const userSpec = (repiceSpec) => {
  let userTwo = {};
  let userOne = {};
  let token;
  let token2;

  // user sign up
  describe('User registration', () => {
    beforeEach(() => {
      userOne = {
        fullname: 'example user two',
        username: 'example_user_2',
        password: '123456',
        email: 'exampleTwo@user.com',
      };
      userTwo = {
        fullname: 'example user',
        username: 'example_user',
        password: '123456',
        email: 'example@user.com',
      };
    });
    it('return 200 as status code when user registers with valid data', done => {
      request.post('/api/v1/users/signup')
      .send(userTwo)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.user.fullname).to.equal(userTwo.fullname)
        expect(res.body.status).to.equal('success');
        done();
      });
    });
    it('return 200 as status code', done => {
      request.post('/api/v1/users/signup')
      .send(userOne)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.status).to.equal('success');
        done();
      });
    });
    it('return 400 for an already existing email ', done => {
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
    it('return 400 for an already existing username', done => {
      const invalidData = userTwo;
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
    it('return 400 for invalid username', done => {
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
    it('return 400 for invalid password', done => {
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
    it('return 400 when fullname is invalid', done => {
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
      userOne = {
        username: 'example_user',
        password: '123456',
      };
      userTwo = {
        username: 'example_user_2',
        password: '123456',
      };
    });

    it('return 200 as status code when valid user login', done => {
      request.post('/api/v1/users/signin')
      .send(userOne)
      .end((err, res) => {
        token = res.body.user.token;
        expect(res.status).to.equal(200);
        expect(res.body.status).to.equal('success');
        expect(res.body.user.token).to.not.be.undefined;

        done();
      });
    });
    it('return 200 as status code when another valid user login', done => {
      request.post('/api/v1/users/signin')
      .send(userTwo)
      .end((err, res) => {
        token2 = res.body.user.token;
        expect(res.status).to.equal(200);
        expect(res.body.status).to.equal('success');
        expect(res.body.user.token).to.not.be.undefined;

        done();
      });
    });
    it('return 400 when an invalid username is supplied', done => {
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
    it('return 400 when an invalid password is supplied', done => {
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
    it('return 200 as status code for get user profile', done => {
      request.get('/api/v1/users/1')
      .set('Authorization', token)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.status).to.equal('success');
        done();
      });
    });
    it('return 403 as status code for a request to get user profile without token', done => {
      request.get('/api/v1/users/1')
      .end((err, res) => {
        expect(res.status).to.equal(403);
        expect(res.body.status).to.equal('fail');
        done();
      });
    });
    it('return 404 as status code when user is not found', done => {
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
    after(() => repiceSpec(token, token2));

    it('return 200 as status code when a valid user request for his profile', done => {
      request.put('/api/v1/users/2')
      .set('Authorization', token2)
      .send(updateOne)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.status).to.equal('success');
        expect(res.body.user.fullname).to.equal('example user two');
        done();
      });
    });
    it('return 200 as status code when updating a single field', done => {
      request.put('/api/v1/users/2')
      .set('Authorization', token2)
      .send(updateTwo)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.status).to.equal('success');
        expect(res.body.user.fullname).to.equal('example user');
        done();
      });
    });
    it('return 400 as status code for invalid parameter', done => {
      request.put('/api/v1/users/kfmfg2')
      .set('Authorization', token2)
      .send(updateTwo)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.status).to.equal('fail');
        done();
      });
    });
    it('return 400 as status code when attempting to modify another user\'s profile', done => {
      request.put('/api/v1/users/1')
      .set('Authorization', token2)
      .send(updateTwo)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body.status).to.equal('fail');
        done();
      });
    });
    it('return 403 as status code for update user profile request with no token', done => {
      request.put('/api/v1/users/2')
      .end((err, res) => {
        expect(res.status).to.equal(403);
        expect(res.body.status).to.equal('fail');
        done();
      });
    });
    it('return 400 for an already existing email ', done => {
      const invalidData = updateOne;
      invalidData.username = 'exampleuser2';
      request.put('/api/v1/users/1')
      .set('Authorization', token)
      .send(invalidData)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.status).to.equal('fail');
        done();
      });
    });
    it('return 400 for an already existing username', done => {
      const invalidData = updateOne;
      invalidData.email = 'example2@user.com';
      request.put('/api/v1/users/1')
      .set('Authorization', token)
      .send(invalidData)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.status).to.equal('fail');
        done();
      });
    });
    it('return 400 for invalid email', done => {
      const invalidData = userTwo;
      invalidData.email = 'example2user.com';
      request.put('/api/v1/users/1')
      .set('Authorization', token)
      .send(invalidData)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.status).to.equal('fail');
        done();
      });
    });
    it('return 400 for invalid username', done => {
      const invalidData = userTwo;
      invalidData.username = 'e.com';
      request.put('/api/v1/users/1')
      .set('Authorization', token)
      .send(invalidData)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.status).to.equal('fail');
        done();
      });
    });
    it('return 400 for invalid fullname', done => {
      const invalidData = userTwo;
      invalidData.fullname = 'pe';
      request.put('/api/v1/users/1')
      .set('Authorization', token)
      .send(invalidData)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.status).to.equal('fail');
        done();
      });
    });
  });
};

