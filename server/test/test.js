import { expect } from 'chai';
import supertest from 'supertest';
import app from '../bin/www.js';

const request = supertest(app);

// Create account test
const testData = {
  fullname: 'example user',
  username: '@example_user',
  password: '123456',
  email: 'example@user.com',
};
describe('User registration', () => {
  it('return 200 as status code', done => {
    request.post('/api/user/signup')
      .send(testData)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.status).to.equal('success');
        done();
      });
  });

  it('return 400 for an already existing email ', done => {
    const invalidData = testData.username = 'exampleuser2';
    request.post('/api/user/signup')
      .send(invalidData)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.status).to.equal('fail');
        done();
      });
  });

  it('return 400 for an already existing username', done => {
    const invalidData = testData.email = 'example2@user.com';
    request.post('/api/user/signup')
      .send(invalidData)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.status).to.equal('fail');
        done();
      });
  });

  it('return 400 for invalid eamil', done => {
    const invalidData = testData;
    invalidData.email = 'example2user.com';
    request.post('/api/user/signup')
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
    request.post('/api/user/signup')
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
    request.post('/api/user/signup')
      .send(invalidData)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.status).to.equal('fail');
        done();
      });
  });
});
