/* eslint-disable import/no-extraneous-dependencies, no-unused-expressions */
import supertest from 'supertest';
import { expect } from 'chai';
import app from '../../bin/www';
import { RECIPE_NOT_FOUND } from '../../constants';
import * as mock from './mock';

const request = supertest(app);
let johnToken;
let peterToken;
const { expiredToken } = mock;
const { johnUser, peterUser } = mock.recipeTestUsers;

describe('Recipe', () => {
  before((done) => {
    request.post('/api/v1/users/signup')
      .send(johnUser)
      .end((err, res) => {
        johnToken = res.body.user.token;
        request.post('/api/v1/users/signup')
          .send(peterUser)
          .end((err, res) => {
            peterToken = res.body.user.token;
            done();
          });
      });
  });

  describe('Add recipe: ', () => {
    let recipe = {};
    beforeEach(() => {
      recipe = { ...mock.recipe };
    });

    it('should return 201 when recipe is created with valid data',
      (done) => {
        request.post('/api/v1/recipes')
          .set('Authorization', johnToken)
          .send(recipe)
          .end((err, res) => {
            expect(res.status).to.equal(201);
            expect(res.body.status).to.equal('success');
            expect(res.body.recipe.image).not.to.be.undefined;
            expect(res.body.recipe).to.be.an('object').that.deep
              .includes(recipe);
            done();
          });
      });

    it('should fail when recipe name is not unique to this user', (done) => {
      request.post('/api/v1/recipes')
        .set('Authorization', johnToken)
        .send(recipe)
        .end((err, res) => {
          expect(res.status).to.equal(409);
          expect(res.body.status).to.equal('fail');
          expect(res.body.error)
            .to.equal('Recipe name already exist, Please enter another');
          done();
        });
    });

    it(`should return success when another user post recipe with
    an existing recipe name`,
      (done) => {
        request.post('/api/v1/recipes')
          .set('Authorization', peterToken)
          .send(recipe)
          .end((err, res) => {
            expect(res.status).to.equal(201);
            expect(res.body.status).to.equal('success');
            expect(res.body.recipe.image).not.to.be.undefined;
            expect(res.body.recipe).to.be.an('object')
              .that.deep.includes({ ...recipe, name: 'beans cake' });
            done();
          });
      });

    it('should fail when access token was not sent', (done) => {
      request.post('/api/v1/recipes')
        .send(recipe)
        .end((err, res) => {
          expect(res.status).to.equal(401);
          expect(res.body.status).to.equal('fail');
          expect(res.body.error).to
            .equal(
              'Sorry, authentication failed, you need to login or register'
            );
          done();
        });
    });

    it('should fail when access token is invalid', (done) => {
      const invalidToken = `${johnToken}'dkfjkfjd'`;
      request.post('/api/v1/recipes')
        .set('Authorization', invalidToken)
        .send(recipe)
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

    it('should fail when access token has expired', (done) => {
      request.post('/api/v1/recipes')
        .set('Authorization', expiredToken)
        .send(recipe)
        .end((err, res) => {
          expect(res.status).to.equal(401);
          expect(res.body.status).to.equal('fail');
          expect(res.body.error)
            .to
            .equal(
              'Sorry, current session has expired, please login to continue'
            );
          done();
        });
    });

    it('should fail when recipe name is an empty string', (done) => {
      const invalidRecipe = recipe;
      const expectedError = {
        name:
          [
            'Name can\'t be blank',
            'Name can only contain alphabet',
            'Name must be at least 2 character'
          ]
      };
      invalidRecipe.name = '';

      request.post('/api/v1/recipes')
        .set('Authorization', johnToken)
        .send(invalidRecipe)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.status).to.equal('fail');
          expect(res.body.error).to.eql(expectedError);
          done();
        });
    });

    it('should fail when category is an empty string', (done) => {
      const expectedError = {
        category:
          [
            'Category can\'t be blank',
            'Category can only contain alphabet',
            'Category must be at least 2 character'
          ]
      };
      const invalidRecipe = recipe;
      invalidRecipe.category = '';
      request.post('/api/v1/recipes')
        .set('Authorization', johnToken)
        .send(invalidRecipe)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.status).to.equal('fail');
          expect(res.body.error).to.eql(expectedError);
          done();
        });
    });

    it('should fail when directions is an empty array', (done) => {
      const invalidRecipe = recipe;
      invalidRecipe.directions = [];
      request.post('/api/v1/recipes')
        .set('Authorization', johnToken)
        .send(invalidRecipe)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.status).to.equal('fail');
          expect(res.body.error)
            .to
            .eql({
              directions: ['Directions array can only contain type string']
            });
          done();
        });
    });

    it('should fail when ingredients is an empty array', (done) => {
      const invalidRecipe = recipe;
      invalidRecipe.ingredients = [];
      request.post('/api/v1/recipes')
        .set('Authorization', johnToken)
        .send(invalidRecipe)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.status).to.equal('fail');
          expect(res.body.error)
            .to
            .eql({
              ingredients: ['Ingredients array can only contain type string']
            });
          done();
        });
    });

    it('should fail when recipe name is a number', (done) => {
      const expectedError = { name:
        [
          'Name can only contain alphabet',
          'Name must be at least 2 character'
        ]
      };
      const invalidRecipe = recipe;
      invalidRecipe.name = 123456;
      request.post('/api/v1/recipes')
        .set('Authorization', johnToken)
        .send(invalidRecipe)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.status).to.equal('fail');
          expect(res.body.error).to.eql(expectedError);
          done();
        });
    });

    it('should fail when category is undefined', (done) => {
      const invalidRecipe = recipe;
      invalidRecipe.category = undefined;
      request.post('/api/v1/recipes')
        .set('Authorization', johnToken)
        .send(invalidRecipe)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.status).to.equal('fail');
          expect(res.body.error)
            .to
            .eql({
              category: ['Category can\'t be blank']
            });
          done();
        });
    });

    it('should fail when directions array contain numbers', (done) => {
      const invalidRecipe = recipe;
      invalidRecipe.directions = [233, 'wash the rice for 3mins', 4950];
      request.post('/api/v1/recipes')
        .set('Authorization', johnToken)
        .send(invalidRecipe)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.status).to.equal('fail');
          expect(res.body.error)
            .to
            .eql({
              directions: ['Directions array can only contain strings']
            });
          done();
        });
    });

    it('should fail when ingredients is not an array', (done) => {
      const invalidRecipe = recipe;
      invalidRecipe.ingredients = { 'item one': 'rice', 'item two': 'oil' };
      request.post('/api/v1/recipes')
        .set('Authorization', johnToken)
        .send(invalidRecipe)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.status).to.equal('fail');
          expect(res.body.error)
            .to
            .eql({
              ingredients: ['Ingredients element is not an array']
            });
          done();
        });
    });

    it('should fail when image is not a string', (done) => {
      const invalidRecipe = recipe;
      invalidRecipe.image = { src: '', photoId: '' };
      request.post('/api/v1/recipes')
        .set('Authorization', johnToken)
        .send(invalidRecipe)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.status).to.equal('fail');
          expect(res.body.error)
            .to
            .eql({
              image: ['Image can only be a string']
            });
          done();
        });
    });
  });

  describe('Add fav recipe: ', () => {
    it('should add recipe to user\'s favourite recipes list', (done) => {
      request.post('/api/v1/users/recipe')
        .set('Authorization', johnToken)
        .send({ recipeId: 1 })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.status).to.equal('success');
          expect(res.body.favRecipe.added).to.equal(true);
          expect(res.body.favRecipe.id).to.equal(1);
          expect(res.body.favRecipe).to.be.an.instanceOf(Object);
          done();
        });
    });

    it('should remove recipe from a user\'s favourite recipes list',
      (done) => {
        request.post('/api/v1/users/recipe')
          .set('Authorization', johnToken)
          .send({ recipeId: 1 })
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body.status).to.equal('success');
            expect(res.body.favRecipe.added).to.equal(false);
            expect(res.body.favRecipe.id).to.equal(1);
            expect(res.body.favRecipe).to.be.an.instanceOf(Object);
            done();
          });
      });

    it('request should fail when recipe dose not exist', (done) => {
      request.post('/api/v1/users/recipe')
        .set('Authorization', johnToken)
        .send({ recipeId: 100 })
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.status).to.equal('fail');
          expect(res.body.error).to.equal(RECIPE_NOT_FOUND);
          done();
        });
    });

    it('should fail when a string is supplied as recipe id', (done) => {
      request.post('/api/v1/users/recipe')
        .set('Authorization', johnToken)
        .send({ recipeId: '<script>alert("hello you")</script>' })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.status).to.equal('fail');
          expect(res.body.error).to.eql({
            id: ['Id you sent is not a valid recipe id']
          });
          done();
        });
    });
  });

  describe('Post a review: ', () => {
    const review = {
      review: 'i love this recipe',
    };

    it('should be successful when review is not an empty string', (done) => {
      request.post('/api/v1/recipes/1/reviews')
        .set('Authorization', johnToken)
        .send(review)
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body.status).to.equal('success');
          expect(res.body.reviews.length).to.equal(1);
          expect(res.body.reviews[0].review).to.equal('i love this recipe');
          done();
        });
    });

    it('should fail when recipe dose not exist', (done) => {
      request.post('/api/v1/recipes/10/reviews')
        .set('Authorization', johnToken)
        .send(review)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.status).to.equal('fail');
          expect(res.body.error).to.equal(RECIPE_NOT_FOUND);
          done();
        });
    });

    it('should fail when review is an empty string', (done) => {
      request.post('/api/v1/recipes/1/reviews')
        .set('Authorization', johnToken)
        .send({ review: '' })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.status).to.equal('fail');
          expect(res.body.error).to.eql({
            review: [
              "Review can't be blank",
              'Review must be at least 2 character'
            ]
          });
          done();
        });
    });

    it('should fail when review is not a string', (done) => {
      request.post('/api/v1/recipes/1/reviews')
        .set('Authorization', johnToken)
        .send({ review: 12345 })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.status).to.equal('fail');
          expect(res.body.error).to.eql({
            review: ['Review must be at least 2 character']
          });
          done();
        });
    });
  });

  describe('Vote: ', () => {
    it('should fail when recipe id contains an alphabet', (done) => {
      request.put('/api/v1/recipes/1lk/vote?up=true')
        .set('Authorization', johnToken)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.status).to.equal('fail');
          expect(res.body.error).to
            .eql({
              id: ['Id you sent is not a valid recipe id']
            });
          done();
        });
    });

    it('should fail when vote type is not a boolean', (done) => {
      request.put('/api/v1/recipes/1/vote?up=KKKKKKK')
        .set('Authorization', johnToken)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.status).to.equal('fail');
          expect(res.body.error).to.eql({
            vote: ['Vote parameter is invalid, only true or false is allowed']
          });
          done();
        });
    });

    it('should fail when recipe is not found', (done) => {
      request.put('/api/v1/recipes/100/vote?up=true')
        .set('Authorization', johnToken)
        .end((err, res) => {
          expect(res.body.error).to.equal(RECIPE_NOT_FOUND);
          expect(res.body.status).to.equal('fail');
          done();
        });
    });

    it('should upvote a recipe when up equal true', (done) => {
      request.put('/api/v1/recipes/1/vote?up=true')
        .set('Authorization', johnToken)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.recipe.upVotes).to.equal(1);
          expect(res.body.recipe.downVotes).to.equal(0);
          expect(res.body.status).to.equal('success');
          done();
        });
    });

    it('should cancel user\'s previous upvote when up is false ',
      (done) => {
        request.put('/api/v1/recipes/1/vote?up=false')
          .set('Authorization', johnToken)
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body.recipe.upVotes).to.equal(0);
            expect(res.body.recipe.downVotes).to.equal(0);
            expect(res.body.status).to.equal('success');
            done();
          });
      });

    it('should downvote a recipe when down equal true', (done) => {
      request.put('/api/v1/recipes/1/vote?down=true')
        .set('Authorization', peterToken)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.recipe.upVotes).to.equal(0);
          expect(res.body.recipe.downVotes).to.equal(1);
          expect(res.body.status).to.equal('success');
          done();
        });
    });

    it('should cancel a downvote when down equal false', (done) => {
      request.put('/api/v1/recipes/1/vote?down=False')
        .set('Authorization', peterToken)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.recipe.upVotes).to.equal(0);
          expect(res.body.recipe.downVotes).to.equal(0);
          expect(res.body.status).to.equal('success');
          done();
        });
    });

    it('should changes user\'s vote from downvote to upvote', (done) => {
      request.put('/api/v1/recipes/1/vote?up=true')
        .set('Authorization', peterToken)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.recipe.upVotes).to.equal(1);
          expect(res.body.recipe.downVotes).to.equal(0);
          expect(res.body.status).to.equal('success');
          done();
        });
    });

    it('should fail up equal true and down equal true',
      (done) => {
        request.put('/api/v1/recipes/1/vote?down=true&up=true')
          .set('Authorization', johnToken)
          .end((err, res) => {
            expect(res.status).to.equal(400);
            expect(res.body.status).to.equal('fail');
            expect(res.body.error).to.equal(
              // eslint-disable-next-line max-len
              'Multiple parameters is not allow. Please send either true or false'
            );
            done();
          });
      });
  });

  describe('Get recipes routes: ', () => {
    describe('get all recipe: ', () => {
      it('should return recipes to user', (done) => {
        request.get('/api/v1/recipes')
          .set('Authorization', johnToken)
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body.status).to.equal('success');
            expect(res.body.recipes).instanceOf(Array);
            expect(res.body.recipes.length).to.equal(2);
            expect(res.body.pageCount).to.equal(1);
            done();
          });
      });
    });

    describe('get recipes by most upvote', () => {
      before((done) => {
        request.put('/api/v1/recipes/2/vote?up=true')
          .set('Authorization', peterToken)
          .end(() => {
            done();
          });
      });

      it('should return recipes by upvote', (done) => {
        request.get('/api/v1/recipes?sort=upvotes&order=ascending')
          .set('Authorization', johnToken)
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body.status).to.equal('success');
            expect(res.body.recipes[0].id).to.equal(1);
            expect(res.body.recipes.length).to.equal(2);
            expect(res.body.pageCount).to.equal(1);
            done();
          });
      });

      it('should return a pageCount of 2 when limit is 1 and page is 2',
        (done) => {
          request
            .get('/api/v1/recipes?sort=upvotes&order=ascending&limit=1&page=2')
            .set('Authorization', johnToken)
            .end((err, res) => {
              expect(res.status).to.equal(200);
              expect(res.body.status).to.equal('success');
              expect(res.body.recipes[0].id).to.equal(2);
              expect(res.body.recipes.length).to.equal(1);
              expect(res.body.pageCount).to.equal(2);
              done();
            });
        });

      it('should return recipes when limit is an alphabet',
        (done) => {
          request
            .get(`/api/v1/recipes?
            sort=upvotes&order=ascending&limit=iihb&page=1`)
            .set('Authorization', johnToken)
            .end((err, res) => {
              expect(res.status).to.equal(200);
              expect(res.body.status).to.equal('success');
              expect(res.body.recipes.length).to.equal(2);
              done();
            });
        });

      it('should return recipes when page is an alphabet', (done) => {
        request
          .get('/api/v1/recipes?sort=upvotes&order=ascending&limit=1&page=km')
          .set('Authorization', johnToken)
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body.status).to.equal('success');
            expect(res.body.recipes.length).to.equal(1);
            done();
          });
      });
    });

    describe('Search ', () => {
      it('should return recipes when beans cake is supplied as the search term',
        (done) => {
          request.get('/api/v1/recipes?search=beans+cake')
            .set('Authorization', johnToken)
            .end((err, res) => {
              expect(res.status).to.equal(200);
              expect(res.body.status).to.equal('success');
              expect(res.body.pageCount).to.equal(1);
              expect(res.body.recipes.length).to.equal(2);
              done();
            });
        });

      it(`should return recipes when breakfast is supplied as the
      search term`, (done) => {
          request.get('/api/v1/recipes?search=breakfast')
            .set('Authorization', johnToken)
            .end((err, res) => {
              expect(res.status).to.equal(200);
              expect(res.body.status).to.equal('success');
              expect(res.body.pageCount).to.equal(1);
              expect(res.body.recipes.length).to.equal(2);
              expect(res.body.recipes[0].category).to.equal('breakfast');
              done();
            });
        });

      it('should return pageCount of 2 when limit is 1 and total recipes is 2',
        (done) => {
          request.get('/api/v1/recipes?search=breakfast&limit=1&page=1')
            .set('Authorization', johnToken)
            .end((err, res) => {
              expect(res.status).to.equal(200);
              expect(res.body.status).to.equal('success');
              expect(res.body.pageCount).to.equal(2);
              done();
            });
        });

      it('should not fail when an array is supplied as search term',
        (done) => {
          request.get('/api/v1/recipes?search=[]')
            .set('Authorization', johnToken)
            .end((err, res) => {
              expect(res.status).to.equal(200);
              expect(res.body.status).to.equal('success');
              expect(res.body.recipes).instanceOf(Array);
              expect(res.body.recipes.length).to.equal(0);
              done();
            });
        });

      it('should not fail when "j2\'/[765]" is supplied as the search term',
        (done) => {
          request.get('/api/v1/recipes?search=j2\'/[765]')
            .set('Authorization', johnToken)
            .end((err, res) => {
              expect(res.status).to.equal(200);
              expect(res.body.status).to.equal('success');
              expect(res.body.recipes).instanceOf(Array);
              expect(res.body.recipes.length).to.equal(0);
              done();
            });
        });
    });

    describe('get favourite recipes', () => {
      before((done) => {
        request.post('/api/v1/users/recipe')
          .set('Authorization', johnToken)
          .send({ recipeId: 1 })
          .end(() => {
            done();
          });
      });

      it('should return a user\'s favourite recipes', (done) => {
        request.get('/api/v1/users/recipes/favourite')
          .set('Authorization', johnToken)
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body.status).to.equal('success');
            expect(res.body.pageCount).not.to.be.undefined;
            expect(res.body.recipes).instanceOf(Array);
            expect(res.body.recipes.length).to.equal(1);
            expect(res.body.pageCount).to.equal(1);
            done();
          });
      });
    });

    // get created recipes
    describe('get created recipes', () => {
      before((done) => {
        request.post('/api/v1/recipes')
          .set('Authorization', peterToken)
          .send({ ...mock.recipe, name: 'pizza' })
          .end(() => {
            done();
          });
      });

      it('should return a user\'s created recipes', (done) => {
        request.get('/api/v1/users/recipes/created')
          .set('Authorization', peterToken)
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body.status).to.equal('success');
            expect(res.body.recipes).instanceOf(Array);
            expect(res.body.recipes.length).to.equal(2);
            expect(res.body.pageCount).to.equal(1);
            expect(res.body.recipes[1].name).to.equal('pizza');
            done();
          });
      });
    });

    describe('get recipe reviews', () => {
      it('should be successful when there is no review for a recipe',
        (done) => {
          request.get('/api/v1/recipes/1/reviews')
            .set('Authorization', johnToken)
            .end((err, res) => {
              expect(res.status).to.equal(200);
              expect(res.body.status).to.equal('success');
              expect(res.body.pageCount).not.to.be.undefined;
              expect(res.body.reviews).to.be.instanceOf(Array);
              done();
            });
        });

      it('should return a single review when limit and page are set to 1',
        (done) => {
          request.get('/api/v1/recipes/1/reviews?limit=1&page=1')
            .set('Authorization', johnToken)
            .end((err, res) => {
              expect(res.status).to.equal(200);
              expect(res.body.status).to.equal('success');
              expect(res.body.pageCount).not.to.be.undefined;
              expect(res.body.reviews.length).to.equal(1);
              done();
            });
        });

      it('should fail when recipe is not found', (done) => {
        request.get('/api/v1/recipes/100/reviews')
          .set('Authorization', johnToken)
          .end((err, res) => {
            expect(res.status).to.equal(404);
            expect(res.body.status).to.equal('fail');
            expect(res.body.error).to.equal(RECIPE_NOT_FOUND);
            done();
          });
      });
    });
  });

  describe('Modify recipe: ', () => {
    const {
      recipeDataOne,
      recipeDataTwo,
      recipeDataThree,
      recipeDataFour
    } = mock.recipeUpdateData;

    it('should fail when user supplies a number as recipe name', (done) => {
      request.put('/api/v1/recipes/1')
        .set('Authorization', johnToken)
        .send({
          name: '9845',
          category: 'breakfast',
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.status).to.equal('fail');
          expect(res.body.error).to.eql({
            name: ['Name can only contain alphabet']
          });
          done();
        });
    });

    it('should fail when user supplies an array of numbers as directions',
      (done) => {
        request.put('/api/v1/recipes/1')
          .set('Authorization', johnToken)
          .send({
            directions: [1, 2, 3],
          })
          .end((err, res) => {
            expect(res.status).to.equal(400);
            expect(res.body.status).to.equal('fail');
            expect(res.body.error).to.eql({
              directions: ['Directions array can only contain strings']
            });
            done();
          });
      });

    it('should fail when user did not create the recipe', (done) => {
      request.put('/api/v1/recipes/1')
        .set('Authorization', peterToken)
        .send(recipeDataFour)
        .end((err, res) => {
          expect(res.status).to.equal(403);
          expect(res.body.status).to.equal('fail');
          expect(res.body.error).to.equal('You do not access to this recipe');
          done();
        });
    });

    it('should fail when recipeId is not in not found ', (done) => {
      request.put('/api/v1/recipes/109')
        .set('Authorization', peterToken)
        .send(recipeDataFour)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.status).to.equal('fail');
          expect(res.body.error).to.equal(RECIPE_NOT_FOUND);
          done();
        });
    });

    it('should fail when recipe id is not a number', (done) => {
      request.put('/api/v1/recipes/++10ufjdc')
        .set('Authorization', peterToken)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.status).to.equal('fail');
          expect(res.body.error).to.eql({
            id: ['Id you sent is not a valid recipe id']
          });
          done();
        });
    });

    it('should return success when user update a single field', (done) => {
      request.put('/api/v1/recipes/1')
        .set('Authorization', johnToken)
        .send(recipeDataOne)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.status).to.equal('success');
          expect(res.body.recipe).to.deep.include(recipeDataOne);
          done();
        });
    });

    it('should return success when user update a two fields', (done) => {
      request.put('/api/v1/recipes/1')
        .set('Authorization', johnToken)
        .send(recipeDataTwo)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.status).to.equal('success');
          expect(res.body.recipe).to.deep.include(recipeDataTwo);

          done();
        });
    });

    it('should return success when user update a three fields', (done) => {
      request.put('/api/v1/recipes/1')
        .set('Authorization', johnToken)
        .send(recipeDataThree)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.status).to.equal('success');
          expect(res.body.recipe).to.deep.include(recipeDataThree);
          done();
        });
    });

    it('should return success when user update a four fields', (done) => {
      request.put('/api/v1/recipes/1')
        .set('Authorization', johnToken)
        .send(recipeDataFour)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.status).to.equal('success');
          expect(res.body.recipe).to.deep.include(recipeDataFour);
          done();
        });
    });
  });

  describe('View recipe: ', () => {
    it('should fail when recipe is not found', (done) => {
      request.get('/api/v1/recipes/10')
        .set('Authorization', peterToken)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.status).to.equal('fail');
          expect(res.body.error).to.equal(RECIPE_NOT_FOUND);
          done();
        });
    });

    it('should increment view after a user has viewed a recipe', (done) => {
      request.get('/api/v1/recipes/1')
        .set('Authorization', johnToken)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.status).to.equal('success');
          expect(res.body.recipe.views).to.equal(0);
          done();
        });

      after(() => {
        it(`should not increment views when user view a recipe
        for the second time`,
          () => {
            request.get('/api/v1/recipes/1')
              .set('Authorization', johnToken)
              .end((err, res) => {
                expect(res.status).to.equal(200);
                expect(res.body.status).to.equal('success');
                expect(res.body.recipe.views).to.equal(1);
                done();
              });
          });

        it(`should not increment views when user views a recipe for
        the third time`,
          () => {
            request.get('/api/v1/recipes/1')
              .set('Authorization', johnToken)
              .end((err, res) => {
                expect(res.status).to.equal(200);
                expect(res.body.status).to.equal('success');
                expect(res.body.recipe.views).to.equal(1);
                done();
              });
          });
      });
    });
  });

  describe('Delete recipe: ', () => {
    let id;
    before((done) => {
      request.post('/api/v1/recipes')
        .set('Authorization', johnToken)
        .send({ ...mock.recipe, name: 'test recipe' })
        .end((err, res) => {
          id = res.body.recipe.id;
          done();
        });
    });

    it('should fail when user did not create the recipe', (done) => {
      request.delete(`/api/v1/recipes/${id}`)
        .set('Authorization', peterToken)
        .end((err, res) => {
          expect(res.status).to.equal(403);
          expect(res.body.status).to.equal('fail');
          expect(res.body.error).to.equal('You do not access to this recipe');
          done();
        });
    });

    it('should fail when recipe id is not in the database ', (done) => {
      request.delete('/api/v1/recipes/10')
        .set('Authorization', peterToken)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.status).to.equal('fail');
          expect(res.body.error).to.equal('Sorry, recipe not found');
          done();
        });
    });

    it('should fail when id is not a number', (done) => {
      request.delete('/api/v1/recipes/11kdjf')
        .set('Authorization', peterToken)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.status).to.equal('fail');
          expect(res.body.error).to.eql({
            id: ['Id you sent is not a valid recipe id']
          });
          done();
        });
    });

    it('should return success when everything is fine', (done) => {
      request.delete(`/api/v1/recipes/${id}`)
        .set('Authorization', johnToken)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.status).to.equal('success');
          expect(res.body.success).to.equal('Recipe was successfully deleted');
          done();
        });
    });
  });
});
