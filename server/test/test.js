
import { expect } from 'chai';
import supertest from 'supertest';
import app from '../bin/www.js';

const request = supertest(app);
let token = '';
// Create account test
let testData = {};

describe('User registration', () => {
  beforeEach(() => {
    testData = {
      fullname: 'example user',
      username: 'example_user',
      password: '123456',
      email: 'example@user.com',
    };
  });
  it('return 200 as status code', done => {
    request.post('/api/users/signup')
      .send(testData)
      .end((err, res) => {
        console.log(res.body);
        expect(res.status).to.equal(200);
        expect(res.body.status).to.equal('success');
        done();
      });
  });

  it('return 400 for an already existing email ', done => {
    const invalidData = testData;
    invalidData.username = 'exampleuser2';
    request.post('/api/users/signup')
      .send(invalidData)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.status).to.equal('fail');
        done();
      });
  });

  it('return 400 for an already existing username', done => {
    const invalidData = testData;
    console.log(invalidData);
    invalidData.email = 'example2@user.com';
    request.post('/api/users/signup')
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
    request.post('/api/users/signup')
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
    request.post('/api/users/signup')
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
    request.post('/api/users/signup')
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
  beforeEach(() => {
    testDataLogin = {
      username: 'example_user',
      password: '123456',
    };
  });
  it('return 200 as status code', done => {
    console.log(testDataLogin);
    request.post('/api/users/signin')
      .send(testDataLogin)
      .end((err, res) => {
        console.log(res.status, res.body.token);
        token = res.body.token;
        expect(res.status).to.equal(200);
        expect(res.body.status).to.equal('success');
        expect(res.body.token).to.not.be.undefined;

        done();
      });
  });

  it('return 400 for invalid username', done => {
    const invalidData = testDataLogin;
    invalidData.username = 'kester';
    request.post('/api/users/signin')
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
    request.post('/api/users/signin')
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
    request.post('/api/users/signin')
      .send(invalidData)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.status).to.equal('fail');
        done();
      });
  });
});

// add recipe
describe('add recipe', () => {
  let recipe = {};
  beforeEach(() => {
    recipe = {
      recipeName: 'beans cake',
      category: 'breakfast',
      ingredients: ['beans', 'water', 'oil'],
      directions: ['step 1', 'step 2', 'step 3'],
    };
  });
  it('return 200 as status code', done => {
    console.log(recipe, token);
    request.post('/api/recipes/recipe')
      // .set('Authorization', token)
      .send(recipe)
      .end((err, res) => {
        console.log(res.status);
        expect(res.status).to.equal(200);
        expect(res.body.status).to.equal('success');
        done();
      });
  });

  it('return 400 for  without access token', done => {
    request.post('/api/recipes/recipe')
      .send(recipe)
      .end((err, res) => {
        expect(res.status).to.equal(401);
        expect(res.body.status).to.equal('fail');
        done();
      });
  });
  // it('return 400 for invalid access token', done => {
  //   const invalidToken = `${token}'dkfjkfjd'`;
  //   request.post('/api/recipes/recipe')
  //     .set('Authorization', invalidToken)
  //     .send(recipe)
  //     .end((err, res) => {
  //       expect(res.status).to.equal(403);
  //       expect(res.body.status).to.equal('fail');
  //       done();
  //     });
  // });
  // it('return 400 as status code', done => {
  //   const invalidRecipe = recipe;
  //   invalidRecipe.recipeName = '';
  //   request.post('/api/recipes/recipe')
  //     .set('Authorization', token)
  //     .send(invalidRecipe)
  //     .end((err, res) => {
  //       console.log(res.status);
  //       expect(res.status).to.equal(400);
  //       expect(res.body.status).to.equal('fail');
  //       done();
  //     });
  // });
  // it('return 400 as status code', done => {
  //   const invalidRecipe = recipe;
  //   invalidRecipe.category = '';
  //   request.post('/api/recipes/recipe')
  //     .set('Authorization', token)
  //     .send(invalidRecipe)
  //     .end((err, res) => {
  //       console.log(res.status);
  //       expect(res.status).to.equal(400);
  //       expect(res.body.status).to.equal('fail');
  //       done();
  //     });
  // });
  // it('return 400 as status code', done => {
  //   const invalidRecipe = recipe;
  //   invalidRecipe.directions = [];
  //   request.post('/api/recipes/recipe')
  //     .set('Authorization', token)
  //     .send(invalidRecipe)
  //     .end((err, res) => {
  //       console.log(res.status);
  //       expect(res.status).to.equal(400);
  //       expect(res.body.status).to.equal('fail');
  //       done();
  //     });
  // });
  // it('return 400 as status code', done => {
  //   const invalidRecipe = recipe;
  //   invalidRecipe.ingredients = [];
  //   request.post('/api/recipes/recipe')
  //     .set('Authorization', token)
  //     .send(invalidRecipe)
  //     .end((err, res) => {
  //       console.log(res.status);
  //       expect(res.status).to.equal(400);
  //       expect(res.body.status).to.equal('fail');
  //       done();
  //     });
  // });
  // it('return 400 as status code', done => {
  //   const invalidRecipe = recipe;
  //   invalidRecipe.recipeName = 123456;
  //   request.post('/api/recipes/recipe')
  //     .set('Authorization', token)
  //     .send(invalidRecipe)
  //     .end((err, res) => {
  //       console.log(res.status);
  //       expect(res.status).to.equal(400);
  //       expect(res.body.status).to.equal('fail');
  //       done();
  //     });
  // });
  // it('return 400 as status code', done => {
  //   const invalidRecipe = recipe;
  //   invalidRecipe.category = undefined;
  //   request.post('/api/recipes/recipe')
  //     .set('Authorization', token)
  //     .send(invalidRecipe)
  //     .end((err, res) => {
  //       console.log(res.status);
  //       expect(res.status).to.equal(400);
  //       expect(res.body.status).to.equal('fail');
  //       done();
  //     });
  // });
  // it('return 400 as status code', done => {
  //   const invalidRecipe = recipe;
  //   invalidRecipe.directions = [233, null, 4950];
  //   request.post('/api/recipes/recipe')
  //     .set('Authorization', token)
  //     .send(invalidRecipe)
  //     .end((err, res) => {
  //       console.log(res.status);
  //       expect(res.status).to.equal(400);
  //       expect(res.body.status).to.equal('fail');
  //       done();
  //     });
  // });
  // it('return 400 as status code', done => {
  //   const invalidRecipe = recipe;
  //   invalidRecipe.ingredients = { step: 'one', step2: 'two' };
  //   request.post('/api/recipes/recipe')
  //     .set('Authorization', token)
  //     .send(invalidRecipe)
  //     .end((err, res) => {
  //       console.log(res.status);
  //       expect(res.status).to.equal(400);
  //       expect(res.body.status).to.equal('fail');
  //       done();
  //     });
  // });
});
