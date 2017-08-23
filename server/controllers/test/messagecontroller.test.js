const expect = require('chai').expect;
const data = require('./test-data');
const supertest = require('supertest');
let request;
let token;
let token2;

const setRequest = app => { request = supertest(app); };
const setToken = tkn => { token = tkn; };
const setToken2 = tkn => { token2 = tkn; };

const createMessageSpec = () => {
  describe('integration test:: creating a message', () => {
    it('should return 200 as status code for send message to a group', done => {
      request.post('/api/group/1/message')
      .set('Authorization', token)
      .send(data.validMessage)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.status).to.equal('success');
          done();
        });
    });
    it('should return 403 as status code for no token', done => {
      request.post('/api/group/1/message')
      .send(data.validMessage)
        .end((err, res) => {
          expect(res.status).to.equal(403);
          expect(res.body.status).to.equal('fail');
          done();
        });
    });
    it('should return 400 as status code for empty message content', done => {
      const payload = data.validMessage;
      payload.content = '';
      request.post('/api/group/1/message')
      .set('Authorization', token)
      .send(payload)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.status).to.equal('fail');
          done();
        });
    });
    it('should return 404 as status code for non-existance group', done => {
      const payload = data.validMessage;
      payload.content = 'hello bro';
      request.post('/api/group/100/message')
      .set('Authorization', token)
      .send(payload)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.status).to.equal('fail');
          done();
        });
    });
  });
};
const editMessageSpec = () => {
  describe('integration test:: editing a message', () => {
    it('should return 403 as status code while try to edit someone else message', done => {
      request.put('/api/group/1/message')
      .set('Authorization', token2)
      .send({ content: 'new content', messageId: 1 })
        .end((err, res) => {
          expect(res.status).to.equal(403);
          expect(res.body.status).to.equal('fail');
          done();
        });
    });
    it('should return 200 as status code for edit message request', done => {
      request.put('/api/group/1/message')
      .set('Authorization', token)
      .send({ content: 'new content', messageId: 1 })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.status).to.equal('success');
          done();
        });
    });

    it('should return 400 as status code for invalid message id', done => {
      request.put('/api/group/1/message')
      .set('Authorization', token)
      .send({ content: 'new content', messageId: '<script>alert("hello")</script>' })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.status).to.equal('fail');
          done();
        });
    });
    it('should return 400 as status code for empty content', done => {
      request.put('/api/group/1/message')
      .set('Authorization', token)
      .send({ content: '  ', messageId: 1 })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.status).to.equal('fail');
          done();
        });
    });
    it('should return 404 as status code for message not found', done => {
      request.put('/api/group/1/message')
      .set('Authorization', token)
      .send({ content: 'new content', messageId: 100 })
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.status).to.equal('fail');
          done();
        });
    });
  });
};
const deleteMessageSpec = () => {
  describe('integration test:: delete a message', () => {
    it('should return 200 as status code for delete message request', done => {
      request.delete('/api/message/1')
      .set('Authorization', token)
      .send({ groupId: 1 })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.status).to.equal('success');
          done();
        });
    });
    it('should return 400 as status code for invalid group id', done => {
      request.delete('/api/message/1')
      .set('Authorization', token)
      .send({ groupId: 'group 1' })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.status).to.equal('fail');
          done();
        });
    });
    it('should return 404 as status code for message not found', done => {
      request.delete('/api/message/100')
      .set('Authorization', token)
      .send({ groupId: 1 })
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.status).to.equal('fail');
          done();
        });
    });
    it('should return 404 as status code for message group not found', done => {
      request.delete('/api/message/1')
      .set('Authorization', token)
      .send({ groupId: 100 })
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.status).to.equal('fail');
          done();
        });
    });
  });
};


module.exports = {
  setToken,
  setToken2,
  setRequest,
  createMessageSpec,
  editMessageSpec,
  deleteMessageSpec,
};
