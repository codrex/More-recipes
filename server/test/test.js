
import { expect } from 'chai';
import supertest from 'supertest';
import app from '../bin/www.js';

const request = supertest(app);
let token = '';
let token2 = '';

// Create account test
let testData = {};
let regData = {};


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
    request.post('/api/users/signup')
      .send(testData)
      .end((err, res) => {
        console.log(res.body);
        expect(res.status).to.equal(200);
        expect(res.body.status).to.equal('success');
        done();
      });
  });
  it('return 200 as status code', done => {
    request.post('/api/users/signup')
      .send(regData)
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
  it('return 200 as status code', done => {
    console.log(testDataLogin);
    request.post('/api/users/signin')
      .send(testDataLogin)
      .end((err, res) => {
        console.log(res.status, res.body.token);
        token = res.body.User.token;
        expect(res.status).to.equal(200);
        expect(res.body.status).to.equal('success');
        expect(res.body.User.token).to.not.be.undefined;

        done();
      });
  });
  it('return 200 as status code', done => {
    console.log(testDataLogin);
    request.post('/api/users/signin')
      .send(loginData)
      .end((err, res) => {
        console.log(res.status, res.body.token);
        token2 = res.body.User.token;
        expect(res.status).to.equal(200);
        expect(res.body.status).to.equal('success');
        expect(res.body.User.token).to.not.be.undefined;

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
      .set('Authorization', token)
      .send(recipe)
      .end((err, res) => {
        console.log(res.status, res.body);
        expect(res.status).to.equal(200);
        expect(res.body.status).to.equal('success');
        done();
      });
  });

  it('return 403 for  without access token', done => {
    request.post('/api/recipes/recipe')
      .send(recipe)
      .end((err, res) => {
        expect(res.status).to.equal(403);
        expect(res.body.status).to.equal('fail');
        done();
      });
  });
  it('return 400 for invalid access token', done => {
    const invalidToken = `${token}'dkfjkfjd'`;
    request.post('/api/recipes/recipe')
      .set('Authorization', invalidToken)
      .send(recipe)
      .end((err, res) => {
        expect(res.status).to.equal(401);
        expect(res.body.status).to.equal('fail');
        done();
      });
  });
  it('return 400 as status code', done => {
    const invalidRecipe = recipe;
    invalidRecipe.recipeName = '';
    request.post('/api/recipes/recipe')
      .set('Authorization', token)
      .send(invalidRecipe)
      .end((err, res) => {
        console.log(res.status);
        expect(res.status).to.equal(400);
        expect(res.body.status).to.equal('fail');
        done();
      });
  });
  it('return 400 as status code', done => {
    const invalidRecipe = recipe;
    invalidRecipe.category = '';
    request.post('/api/recipes/recipe')
      .set('Authorization', token)
      .send(invalidRecipe)
      .end((err, res) => {
        console.log(res.status);
        expect(res.status).to.equal(400);
        expect(res.body.status).to.equal('fail');
        done();
      });
  });
  it('return 400 as status code for empty directions array', done => {
    const invalidRecipe = recipe;
    invalidRecipe.directions = [];
    request.post('/api/recipes/recipe')
      .set('Authorization', token)
      .send(invalidRecipe)
      .end((err, res) => {
        console.log(res.status);
        expect(res.status).to.equal(400);
        expect(res.body.status).to.equal('fail');
        done();
      });
  });
  it('return 400 as status code', done => {
    const invalidRecipe = recipe;
    invalidRecipe.ingredients = [];
    request.post('/api/recipes/recipe')
      .set('Authorization', token)
      .send(invalidRecipe)
      .end((err, res) => {
        console.log(res.status);
        expect(res.status).to.equal(400);
        expect(res.body.status).to.equal('fail');
        done();
      });
  });
  it('return 400 as status code', done => {
    const invalidRecipe = recipe;
    invalidRecipe.recipeName = 123456;
    request.post('/api/recipes/recipe')
      .set('Authorization', token)
      .send(invalidRecipe)
      .end((err, res) => {
        console.log(res.status);
        expect(res.status).to.equal(400);
        expect(res.body.status).to.equal('fail');
        done();
      });
  });
  it('return 400 as status code', done => {
    const invalidRecipe = recipe;
    invalidRecipe.category = undefined;
    request.post('/api/recipes/recipe')
      .set('Authorization', token)
      .send(invalidRecipe)
      .end((err, res) => {
        console.log(res.status);
        expect(res.status).to.equal(400);
        expect(res.body.status).to.equal('fail');
        done();
      });
  });
  it('return 400 as status code for invalid array element', done => {
    const invalidRecipe = recipe;
    invalidRecipe.directions = [233, null, 4950];
    request.post('/api/recipes/recipe')
      .set('Authorization', token)
      .send(invalidRecipe)
      .end((err, res) => {
        console.log(res.status);
        expect(res.status).to.equal(400);
        expect(res.body.status).to.equal('fail');
        done();
      });
  });
  it('return 400 as status code', done => {
    const invalidRecipe = recipe;
    invalidRecipe.ingredients = { step: 'one', step2: 'two' };
    request.post('/api/recipes/recipe')
      .set('Authorization', token)
      .send(invalidRecipe)
      .end((err, res) => {
        console.log(res.status);
        expect(res.status).to.equal(400);
        expect(res.body.status).to.equal('fail');
        done();
      });
  });
});

// modify recipe request
describe('delete recipe', () => {
  const updateOne = {
    recipeName: 'beans cake',
  };
  const updateTwo = {
    recipeName: 'beans cake',
    category: 'breakfast',
  };
  const updateThree = {
    recipeName: 'beans cake',
    category: 'breakfast',
    ingredients: ['beans', 'water', 'oil'],
  };
  const updateFour = {
    recipeName: 'beans cake',
    category: 'breakfast',
    ingredients: ['beans', 'water', 'oil'],
    directions: ['step 1', 'step 2', 'step 3'],
  };
  it('return 404 as status code when user did not create the recipe', done => {
    request.put('/api/recipes/1')
      .set('Authorization', token2)
      .send(updateFour)
      .end((err, res) => {
        console.log(res.status);
        expect(res.status).to.equal(404);
        expect(res.body.status).to.equal('fail');
        done();
      });
  });
  it('return 404 as status code when recipeId is not in db ', done => {
    request.put('/api/recipes/10')
      .set('Authorization', token2)
      .send(updateFour)
      .end((err, res) => {
        console.log(res.status);
        expect(res.status).to.equal(404);
        expect(res.body.status).to.equal('fail');
        done();
      });
  });
  it('return 400 as status code for invalid recipe id parameter', done => {
    request.put('/api/recipes/10ufjdc')
      .set('Authorization', token2)
      .end((err, res) => {
        console.log(res.status);
        expect(res.status).to.equal(400);
        expect(res.body.status).to.equal('fail');
        done();
      });
  });
  it('return 200 as status code when everything is fine 1-input', done => {
    request.put('/api/recipes/1')
      .set('Authorization', token)
      .send(updateOne)
      .end((err, res) => {
        console.log(res.status);
        expect(res.status).to.equal(200);
        expect(res.body.status).to.equal('success');
        done();
      });
  });
  it('return 200 as status code when everything is fine 2-inputs', done => {
    request.put('/api/recipes/1')
      .set('Authorization', token)
      .send(updateTwo)
      .end((err, res) => {
        console.log(res.status);
        expect(res.status).to.equal(200);
        expect(res.body.status).to.equal('success');
        done();
      });
  });
  it('return 200 as status code when everything is fine 3-inputs', done => {
    request.put('/api/recipes/1')
      .set('Authorization', token)
      .send(updateThree)
      .end((err, res) => {
        console.log(res.status);
        expect(res.status).to.equal(200);
        expect(res.body.status).to.equal('success');
        done();
      });
  });
  it('return 200 as status code when everything is fine 4-inputs', done => {
    request.put('/api/recipes/1')
      .set('Authorization', token)
      .send(updateFour)
      .end((err, res) => {
        console.log(res.status);
        expect(res.status).to.equal(200);
        expect(res.body.status).to.equal('success');
        done();
      });
  });
});

// delete recipe request
describe('delete recipe', () => {
  it('return 404 as status code when user did not create the recipe', done => {
    request.delete('/api/recipes/1/recipe')
      .set('Authorization', token2)
      .end((err, res) => {
        console.log(res.status);
        expect(res.status).to.equal(404);
        expect(res.body.status).to.equal('fail');
        done();
      });
  });
  it('return 404 as status code when recipeId is not in db ', done => {
    request.delete('/api/recipes/10/recipe')
      .set('Authorization', token2)
      .end((err, res) => {
        console.log(res.status);
        expect(res.status).to.equal(404);
        expect(res.body.status).to.equal('fail');
        done();
      });
  });
  it('return 400 as status code for invalid recipe id', done => {
    request.delete('/api/recipes/11kdjf/recipe')
      .set('Authorization', token2)
      .end((err, res) => {
        console.log(res.status);
        expect(res.status).to.equal(400);
        expect(res.body.status).to.equal('fail');
        done();
      });
  });
  it('return 200 as status code when everything is fine', done => {
    request.delete('/api/recipes/1/recipe')
      .set('Authorization', token)
      .end((err, res) => {
        console.log(res.status);
        expect(res.status).to.equal(200);
        expect(res.body.status).to.equal('success');
        done();
      });
  });
});

