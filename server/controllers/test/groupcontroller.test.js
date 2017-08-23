const expect = require('chai').expect;
const data = require('./test-data');
const supertest = require('supertest');
let request;
let token;

const setRequest = app => { request = supertest(app); };
const setToken = tkn => { token = tkn; };

const whenGroupTableEmpty = () => {
  describe('get groups when group table is empty', () => {
    it('get groups :: status code equal 200 when no group is found', done => {
      request.get('/api/groups')
        .set('Authorization', token)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.status).to.equal('success');
          done();
        });
    });
    it('should return 404 as status code for get group ', done => {
      request.get('/api/group/1')
      .set('Authorization', token)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.status).to.equal('fail');
          done();
        });
    });
  });
};
const createGroupSpec = () => {
  describe('integration test:: creating a group', () => {
    it('should return 200 as status code for token in header', done => {
      request.post('/api/group')
      .set('Authorization', token)
      .send(data.validGroup)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.status).to.equal('success');
          done();
        });
    });
    it('should return 200 as status code for token in query', done => {
      request.post('/api/group')
      .query({ Authorization: token })
      .send(data.validGroup)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.status).to.equal('success');
          done();
        });
    });
    it('should return 200 as status code for token in body', done => {
      request.post('/api/group')
      .send(Object.assign(data.validGroup, { Authorization: token }))
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.status).to.equal('success');
          done();
        });
    });
    it('should return 403 as status code for no access token ', done => {
      request.post('/api/group')
      .send(Object.assign(data.validGroup, { Authorization: '' }))
        .end((err, res) => {
          expect(res.status).to.equal(403);
          expect(res.body.status).to.equal('fail');
          done();
        });
    });
    it('should return 400 as status code for invalid name', done => {
      const payload = data.validGroup;
      payload.name = '';
      request.post('/api/group')
      .set('Authorization', token)
      .send(payload)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.status).to.equal('fail');
          done();
        });
    });
    it('should return 401 as status code for invalid token', done => {
      const corruptToken = `${token}kd`;
      request.post('/api/group')
      .send(Object.assign(data.validGroup, { Authorization: corruptToken }))
        .end((err, res) => {
          expect(res.status).to.equal(401);
          expect(res.body.status).to.equal('fail');
          done();
        });
    });
  });
};
const addGroupUserSpec = () => {
  describe('integration test:: adding user to a group', () => {
    it('should return 200 as status code for valid email', done => {
      request.post('/api/group/1/user')
        .set('Authorization', token)
        .send(data.addMemberValidEmail)
        .end((err, res) => {
          console.log(res.body);

          expect(res.status).to.equal(200);
          expect(res.body.status).to.equal('success');
          done();
        });
    });
    it('should return 400 as status code for user that is already a group member', done => {
      request.post('/api/group/1/user')
        .set('Authorization', token)
        .send(data.addMemberValidUsername)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.status).to.equal('fail');

          done();
        });
    });
    it('should return 404 as status code for invalid email', done => {
      request.post('/api/group/1/user')
      .set('Authorization', token)
        .send(data.addMemberInvalidEmail)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.status).to.equal('fail');
          expect(res.body.error).to.equal('User not found');
          done();
        });
    });
    it('should return 400 as status code for user already in a group', done => {
      request.post('/api/group/1/user')
      .set('Authorization', token)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.status).to.equal('fail');
          done();
        });
    });
  });
};
const getRoutesSpec = () => {
  describe('integration test:: get routes', () => {
    it('should return 200 as status code for get all groups', done => {
      request.get('/api/groups')
        .set('Authorization', token)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.status).to.equal('success');
          done();
        });
    });
    it('should return 200 as status code for get all members in a groups', done => {
      request.get('/api/group/1/users')
        .set('Authorization', token)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.status).to.equal('success');
          done();
        });
    });
    it('should return 200 as status code for get groups admin', done => {
      request.get('/api/group/1/admin')
      .set('Authorization', token)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.status).to.equal('success');
          done();
        });
    });
    it('should return 200 as status code for get group messages', done => {
      request.get('/api/group/1/messages')
      .set('Authorization', token)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.status).to.equal('success');
          done();
        });
    });
    it('should return 200 as status code for get group ', done => {
      request.get('/api/group/1')
      .set('Authorization', token)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.status).to.equal('success');
          done();
        });
    });
  });
};
const invalidGetRoutesSpec = () => {
  describe('integration test:: get routes -- invalid inputs', () => {
    it('get all users in a group :: status code equal 400 when group is not found', done => {
      request.get('/api/group/100/users')
        .set('Authorization', token)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.status).to.equal('fail');
          done();
        });
    });
    it('get group :: status code equal 400 for invalid group id', done => {
      request.get('/api/group/jh87')
        .set('Authorization', token)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.status).to.equal('fail');
          done();
        });
    });
    it('get group :: status code equal 400 for invalid group id', done => {
      request.get('/api/group/<d;')
        .set('Authorization', token)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.status).to.equal('fail');
          done();
        });
    });
    it('should return 404 as status code for a group that dose not exist', done => {
      request.get('/api/group/100/users')
        .set('Authorization', token)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.status).to.equal('fail');
          done();
        });
    });
    it('should return 404 as status code for a group that dose not exist', done => {
      request.get('/api/group/100/admin')
      .set('Authorization', token)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.status).to.equal('fail');
          done();
        });
    });
    it('should return 404 as status code for a group that dose not exist', done => {
      request.get('/api/group/100/messages')
      .set('Authorization', token)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.status).to.equal('fail');
          done();
        });
    });
  });
};
const deleteRouteSpec = () => {
  describe('Integration test:: delete routes', () => {
    it('should return 200 as status code for deleting a group member ', done => {
      request.delete('/api/group/1/user')
      .set('Authorization', token)
      .send({ userId: 2 })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.status).to.equal('success');
          done();
        });
    });
  });
};

module.exports = {
  setToken,
  setRequest,
  createGroupSpec,
  addGroupUserSpec,
  getRoutesSpec,
  invalidGetRoutesSpec,
  deleteRouteSpec,
  whenGroupTableEmpty,
};
