const expect = require('chai').expect;
const data = require('./test-data');
const supertest = require('supertest');
let request;
let token;
let token2;
let eEmitter;
let tokenSetter;
const log = console.log;

const setRequest = app => { request = supertest(app); };
const setEmitter = emitter => { eEmitter = emitter; };
const setTokens = tknSetter => { tokenSetter = tknSetter; };
log(request);


const signupSpec = () => {
  describe('Intergration Test:: signup routes', () => {
    it('should return 200 as status code when request has valid user data', done => {
      request.post('/api/user/signup')
          .send(data.validUser)
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body.status).to.equal('success');
            done();
          });
    });
    it('should return 200 as status code when another user registers', done => {
      request.post('/api/user/signup')
          .send(data.validUser2)
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body.status).to.equal('success');
            done();
          });
    });
    it('should return 400 as status code if username already exist', done => {
      const payload = data.validUser;
      payload.email = 'jerrykson@test.com';
      request.post('/api/user/signup')
          .send(payload)
          .end((err, res) => {
            expect(res.status).to.equal(400);
            expect(res.body.status).to.equal('fail');
            expect(res.body.error).to.equal('Username supplied is already in use');
            done();
          });
    });
    it('should return 400 as status code if email already exist', done => {
      const payload = data.validUser2;
      payload.username = 'jerrykson';
      request.post('/api/user/signup')
      .send(payload)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.status).to.equal('fail');
        expect(res.body.error).to.equal('Email supplied is already in use');
        done();
      });
    });
    it('should return 400 as status code for an invalid email', done => {
      const payload = data.validUser;
      payload.email = 'email.com';
      request.post('/api/user/signup')
          .send(payload)
          .end((err, res) => {
            expect(res.status).to.equal(400);
            expect(res.body.status).to.equal('fail');
            done();
          });
    });
    it('should return 400 as status code for no username', done => {
      const payload = data.validUser;
      payload.username = '';
      request.post('/api/user/signup')
          .send(payload)
          .end((err, res) => {
            expect(res.status).to.equal(400);
            expect(res.body.status).to.equal('fail');
            done();
          });
    });
    it('should return 400 as status code for username that is less than 2', done => {
      const payload = data.validUser2;
      payload.username = 'z';
      request.post('/api/user/signup')
          .send(payload)
          .end((err, res) => {
            expect(res.status).to.equal(400);
            expect(res.body.status).to.equal('fail');
            done();
          });
    });
    it('should return 400 as status code for username that contain special character other than underscore(_)',
   done => {
     const payload = data.validUser2;
     payload.username = 'mark-jerry</>';
     request.post('/api/user/signup')
          .send(payload)
          .end((err, res) => {
            expect(res.status).to.equal(400);
            expect(res.body.status).to.equal('fail');
            done();
          });
   });
    it('should return 400 as status code for username with words separated by space', done => {
      const payload = data.validUser2;
      payload.username = 'master user';
      request.post('/api/user/signup')
          .send(payload)
          .end((err, res) => {
            expect(res.status).to.equal(400);
            expect(res.body.status).to.equal('fail');
            done();
          });
    });
    it('should return 400 as status code for on email', done => {
      const payload = data.validUser;
      payload.email = '';
      request.post('/api/user/signup')
          .send(payload)
          .end((err, res) => {
            expect(res.status).to.equal(400);
            expect(res.body.status).to.equal('fail');
            done();
          });
    });
    it('should return 400 as status code for password less than 6 character', done => {
      const payload = data.validUser;
      payload.password = 'pass';
      request.post('/api/user/signup')
          .send(payload)
          .end((err, res) => {
            expect(res.status).to.equal(400);
            expect(res.body.status).to.equal('fail');
            done();
          });
    });
    it('should return 400 as status code for space as password', done => {
      const payload = data.validUser;
      payload.password = '      ';
      request.post('/api/user/signup')
          .send(data.payload)
          .end((err, res) => {
            expect(res.status).to.equal(400);
            expect(res.body.status).to.equal('fail');
            done();
          });
    });
  });
};
const signinSpec = () => {
  describe('integration test:: testing sign route', () => {
    it('should return 200 as status code for valid login data', done => {
      request.post('/api/user/signin')
    .send(data.validLogin)
    .end((err, res) => {
      expect(res.status).to.equal(200);
      expect(res.body.status).to.equal('success');
      log(res.body);
      token = res.body.User.token;
      done();
    });
    });
    it('should return 200 as status code if more than 1 user login', done => {
      request.post('/api/user/signin')
    .send(data.validLogin2)
    .end((err, res) => {
      expect(res.status).to.equal(200);
      expect(res.body.status).to.equal('success');
      token2 = res.body.User.token;
      tokenSetter(token, token2);
      eEmitter();
      done();
    });
    });
    it('should return 400 as status code for invalid login data', done => {
      const payload = data.validLogin;
      payload.username = 'kksono';
      request.post('/api/user/signin')
    .send(payload)
    .end((err, res) => {
      expect(res.status).to.equal(400);
      expect(res.body.status).to.equal('fail');
      done();
    });
    });
    it('should return 400 as status code for incorrect username', done => {
      const payload = data.validLogin;
      payload.username = 'sofboy';
      request.post('/api/user/signin')
    .send(payload)
    .end((err, res) => {
      expect(res.status).to.equal(400);
      expect(res.body.status).to.equal('fail');
      done();
    });
    });
    it('should return 400 as status code for incorrect password', done => {
      const payload = data.validLogin;
      payload.password = 'wrongPassword';
      request.post('/api/user/signin')
    .send(payload)
    .end((err, res) => {
      expect(res.status).to.equal(400);
      expect(res.body.status).to.equal('fail');
      done();
    });
    });
  });
};
const getRouteSpec = () => {
  describe('Intergration Test:: get routes(user controller)', () => {
    it('should return 200 as status code for get users in the system', done => {
      request.get('/api/users')
      .set('Authorization', token)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.status).to.equal('success');
        done();
      });
    });
    it('should return 403 if there is no authorization token', done => {
      request.get('/api/users')
      .end((err, res) => {
        expect(res.status).to.equal(403);
        expect(res.body.status).to.equal('fail');
        done();
      });
    });
    it('should return 401 for malformed token', done => {
      request.get('/api/users')
      .set('Authorization', `${token} 39enw`)
      .end((err, res) => {
        expect(res.status).to.equal(401);
        expect(res.body.status).to.equal('fail');
        done();
      });
    });
  });
};
const leaveGroupSpec = () => {
  describe('Intergration Test:: leave group request', () => {
    it('should return 200 as status code for leave group request', done => {
      request.delete('/api/user/member/group')
      .set('Authorization', token2)
      .send({ groupId: 1 })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.status).to.equal('success');
        done();
      });
    });
    it('should return 400 as status code for leave group request', done => {
      request.delete('/api/user/member/group')
      .set('Authorization', token2)
      .send({ groupId: 1 })
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body.status).to.equal('fail');
        done();
      });
    });
  });
};


const tokens = {
  token,
  token2,
};

module.exports = {
  tokens,
  setRequest,
  signinSpec,
  signupSpec,
  getRouteSpec,
  leaveGroupSpec,
  setEmitter,
  setTokens,
};
