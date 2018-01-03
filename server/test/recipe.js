import supertest from 'supertest';
import { expect } from 'chai';
import app from '../bin/www';
import * as mock from './mock';

const request = supertest(app);

const recipeSpec = (user1, user2) => {
  const token = user1;
  const token2 = user2;
  const { expiredToken } = mock;

  describe('Recipe', () => {
    // add recipe
    describe('add recipe', () => {
      let recipe = {};
      beforeEach(() => {
        recipe = { ...mock.recipe };
      });

      it('should return 201 when recipe is created with valid data', (done) => {
        request.post('/api/v1/recipes')
          .set('Authorization', token)
          .send(recipe)
          .end((err, res) => {
            expect(res.status).to.equal(201);
            expect(res.body.status).to.equal('success');
            expect(res.body.recipe.image).not.to.be.undefined;
            expect(res.body.recipe).to.be.an('object').that.deep.includes(recipe);
            done();
          });
      });
      it('should return success when a second recipe is added', (done) => {
        request.post('/api/v1/recipes')
          .set('Authorization', token)
          .send({ ...recipe, name: 'coco drink' })
          .end((err, res) => {
            expect(res.status).to.equal(201);
            expect(res.body.status).to.equal('success');
            expect(res.body.recipe.id).to.equal(2);
            expect(res.body.recipe.image).not.to.be.undefined;
            expect(res.body.recipe).to.be.an('object').that.deep.includes({ ...recipe, name: 'coco drink' });
            done();
          });
      });
      it('should fail  when recipe name already exists in the system', (done) => {
        request.post('/api/v1/recipes')
          .set('Authorization', token)
          .send(recipe)
          .end((err, res) => {
            expect(res.status).to.equal(400);
            expect(res.body.status).to.equal('fail');
            done();
          });
      });
      it('should fail  when user attempt to get recipe without access token', (done) => {
        request.post('/api/v1/recipes')
          .send(recipe)
          .end((err, res) => {
            expect(res.status).to.equal(403);
            expect(res.body.status).to.equal('fail');
            expect(res.body.error).to.equal('Sorry, authentication failed, you need to login or register');
            done();
          });
      });
      it('should fail  when user attempts to get recipe with an invalid access token', (done) => {
        const invalidToken = `${token}'dkfjkfjd'`;
        request.post('/api/v1/recipes')
          .set('Authorization', invalidToken)
          .send(recipe)
          .end((err, res) => {
            expect(res.status).to.equal(403);
            expect(res.body.status).to.equal('fail');
            expect(res.body.error).to.equal('Sorry, authentication failed, you need to login or register');
            done();
          });
      });
      it('should fail  when user attempt to get recipe with an expired access token', (done) => {
        request.post('/api/v1/recipes')
          .set('Authorization', expiredToken)
          .send(recipe)
          .end((err, res) => {
            expect(res.status).to.equal(401);
            expect(res.body.status).to.equal('fail');
            expect(res.body.error)
              .to.equal('Sorry, current session has expired, please login to continue');
            done();
          });
      });
      it('should fail  when recipe name is an empty string', (done) => {
        const invalidRecipe = recipe;
        invalidRecipe.name = '';
        request.post('/api/v1/recipes')
          .set('Authorization', token)
          .send(invalidRecipe)
          .end((err, res) => {
            expect(res.status).to.equal(400);
            expect(res.body.status).to.equal('fail');
            done();
          });
      });
      it('should fail  when category is an empty string', (done) => {
        const invalidRecipe = recipe;
        invalidRecipe.category = '';
        request.post('/api/v1/recipes')
          .set('Authorization', token)
          .send(invalidRecipe)
          .end((err, res) => {
            expect(res.status).to.equal(400);
            expect(res.body.status).to.equal('fail');
            done();
          });
      });
      it('should fail  when directions is an empty array', (done) => {
        const invalidRecipe = recipe;
        invalidRecipe.directions = [];
        request.post('/api/v1/recipes')
          .set('Authorization', token)
          .send(invalidRecipe)
          .end((err, res) => {
            expect(res.status).to.equal(400);
            expect(res.body.status).to.equal('fail');
            done();
          });
      });
      it('should fail  when ingredients is an empty array', (done) => {
        const invalidRecipe = recipe;
        invalidRecipe.ingredients = [];
        request.post('/api/v1/recipes')
          .set('Authorization', token)
          .send(invalidRecipe)
          .end((err, res) => {
            expect(res.status).to.equal(400);
            expect(res.body.status).to.equal('fail');
            done();
          });
      });
      it('should fail  when recipe name is a number', (done) => {
        const invalidRecipe = recipe;
        invalidRecipe.name = 123456;
        request.post('/api/v1/recipes')
          .set('Authorization', token)
          .send(invalidRecipe)
          .end((err, res) => {
            expect(res.status).to.equal(400);
            expect(res.body.status).to.equal('fail');
            done();
          });
      });
      it('should fail  when category is undefined', (done) => {
        const invalidRecipe = recipe;
        invalidRecipe.category = undefined;
        request.post('/api/v1/recipes')
          .set('Authorization', token)
          .send(invalidRecipe)
          .end((err, res) => {
            expect(res.status).to.equal(400);
            expect(res.body.status).to.equal('fail');
            done();
          });
      });
      it('should fail  when directions array contain numbers', (done) => {
        const invalidRecipe = recipe;
        invalidRecipe.directions = [233, 'wash the rice for 3mins', 4950];
        request.post('/api/v1/recipes')
          .set('Authorization', token)
          .send(invalidRecipe)
          .end((err, res) => {
            expect(res.status).to.equal(400);
            expect(res.body.status).to.equal('fail');
            done();
          });
      });
      it('should fail  when ingredients is not an array', (done) => {
        const invalidRecipe = recipe;
        invalidRecipe.ingredients = { 'item one': 'rice', 'item two': 'oil' };
        request.post('/api/v1/recipes')
          .set('Authorization', token)
          .send(invalidRecipe)
          .end((err, res) => {
            expect(res.status).to.equal(400);
            expect(res.body.status).to.equal('fail');
            done();
          });
      });
      it('should fail  when image is not a string', (done) => {
        const invalidRecipe = recipe;
        invalidRecipe.image = { src: '', photoId: '' };
        request.post('/api/v1/recipes')
          .set('Authorization', token)
          .send(invalidRecipe)
          .end((err, res) => {
            expect(res.status).to.equal(400);
            expect(res.body.status).to.equal('fail');
            done();
          });
      });
    });

    // add fav recipe
    describe('add fav recipe', () => {
      it('should add recipe to user\'s favourite recipes', (done) => {
        request.post('/api/v1/users/recipe')
          .set('Authorization', token)
          .send({ recipeId: 1 })
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body.status).to.equal('success');
            expect(res.body.favRecipe.added).to.equal(true);
            done();
          });
      });
      it('should remove recipe from a user\'s favourite recipes', (done) => {
        request.post('/api/v1/users/recipe')
          .set('Authorization', token)
          .send({ recipeId: 1 })
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body.status).to.equal('success');
            expect(res.body.favRecipe.added).to.equal(false);
            done();
          });
      });
      it('request should fail when recipe dose not exist', (done) => {
        request.post('/api/v1/users/recipe')
          .set('Authorization', token)
          .send({ recipeId: 100 })
          .end((err, res) => {
            expect(res.status).to.equal(404);
            expect(res.body.status).to.equal('fail');
            done();
          });
      });
      it('should fail when an invalid recipe id is supplied', (done) => {
        request.post('/api/v1/users/recipe')
          .set('Authorization', token)
          .send({ recipeId: '<script>alert("hello you")</script>' })
          .end((err, res) => {
            expect(res.status).to.equal(400);
            expect(res.body.status).to.equal('fail');
            done();
          });
      });
    });

    // post a review on a recipe
    describe('post a review', () => {
      const review = {
        review: 'i love this recipe',
      };
      it('should be successful when request data is valid', (done) => {
        request.post('/api/v1/recipes/1/reviews')
          .set('Authorization', token)
          .send(review)
          .end((err, res) => {
            expect(res.status).to.equal(201);
            expect(res.body.status).to.equal('success');
            done();
          });
      });
      it('should fail when recipe do not exist', (done) => {
        request.post('/api/v1/recipes/10/reviews')
          .set('Authorization', token)
          .send(review)
          .end((err, res) => {
            expect(res.status).to.equal(404);
            expect(res.body.status).to.equal('fail');
            done();
          });
      });
      it('should fail when review is empty', (done) => {
        request.post('/api/v1/recipes/1/reviews')
          .set('Authorization', token)
          .send({ review: '' })
          .end((err, res) => {
            expect(res.status).to.equal(400);
            expect(res.body.status).to.equal('fail');
            done();
          });
      });
      it('should fail when review is not a string', (done) => {
        request.post('/api/v1/recipes/1/reviews')
          .set('Authorization', token)
          .send({ review: 12345 })
          .end((err, res) => {
            expect(res.status).to.equal(400);
            expect(res.body.status).to.equal('fail');
            done();
          });
      });
    });

    // vote a recipe
    describe('vote a recipe', () => {
      it('should fail when recipe id is invalid', (done) => {
        request.put('/api/v1/recipes/1lk/vote?up=true')
          .set('Authorization', token)
          .end((err, res) => {
            expect(res.status).to.equal(400);
            expect(res.body.status).to.equal('fail');
            done();
          });
      });
      it('should fail when vote type is invalid', (done) => {
        request.put('/api/v1/recipes/1/vote?up=KKKKKKK')
          .set('Authorization', token)
          .end((err, res) => {
            expect(res.status).to.equal(400);
            expect(res.body.status).to.equal('fail');
            done();
          });
      });
      it('should fail when recipe is invalid', (done) => {
        request.put('/api/v1/recipes/100/vote?up=true')
          .set('Authorization', token)
          .end((err, res) => {
            expect(res.status).to.equal(404);
            expect(res.body.status).to.equal('fail');
            done();
          });
      });
      it('should upvote a recipe when user upvote a recipe', (done) => {
        request.put('/api/v1/recipes/1/vote?up=true')
          .set('Authorization', token)
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body.recipe.upVotes).to.equal(1);
            expect(res.body.recipe.downVotes).to.equal(0);
            expect(res.body.status).to.equal('success');
            done();
          });
      });
      it('should cancel user\'s previous upvote for this recipe ', (done) => {
        request.put('/api/v1/recipes/1/vote?up=false')
          .set('Authorization', token)
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body.recipe.upVotes).to.equal(0);
            expect(res.body.recipe.downVotes).to.equal(0);
            expect(res.body.status).to.equal('success');
            done();
          });
      });
      it('should upvote a recipe', (done) => {
        request.put('/api/v1/recipes/1/vote?up=true')
          .set('Authorization', token)
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body.recipe.upVotes).to.equal(1);
            expect(res.body.recipe.downVotes).to.equal(0);
            expect(res.body.status).to.equal('success');
            done();
          });
      });
      it('should down a recipe', (done) => {
        request.put('/api/v1/recipes/1/vote?down=true')
          .set('Authorization', token2)
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body.recipe.upVotes).to.equal(1);
            expect(res.body.recipe.downVotes).to.equal(1);
            expect(res.body.status).to.equal('success');
            done();
          });
      });
      it('should cancel a downvote', (done) => {
        request.put('/api/v1/recipes/1/vote?down=False')
          .set('Authorization', token2)
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body.recipe.upVotes).to.equal(1);
            expect(res.body.recipe.downVotes).to.equal(0);
            expect(res.body.status).to.equal('success');
            done();
          });
      });

      it('should changes user\'s vote from downvote to upvote', (done) => {
        request.put('/api/v1/recipes/1/vote?up=true')
          .set('Authorization', token2)
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body.recipe.upVotes).to.equal(2);
            expect(res.body.recipe.downVotes).to.equal(0);
            expect(res.body.status).to.equal('success');
            done();
          });
      });
      it('should changes user\'s vote from upvote to downvote', (done) => {
        request.put('/api/v1/recipes/1/vote?down=true')
          .set('Authorization', token)
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body.recipe.upVotes).to.equal(1);
            expect(res.body.recipe.downVotes).to.equal(1);
            expect(res.body.status).to.equal('success');
            done();
          });
      });
      it('should cancel user\'s downvote', (done) => {
        request.put('/api/v1/recipes/1/vote?down=false')
          .set('Authorization', token)
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body.recipe.upVotes).to.equal(1);
            expect(res.body.recipe.downVotes).to.equal(0);
            expect(res.body.status).to.equal('success');
            done();
          });
      });
      it('should fail when user send upvote and downvote at the same time', (done) => {
        request.put('/api/v1/recipes/1/vote?down=true&up=true')
          .set('Authorization', token)
          .end((err, res) => {
            expect(res.status).to.equal(400);
            expect(res.body.status).to.equal('fail');
            done();
          });
      });
    });

    // get recipes routes
    describe('get recipes routes', () => {
      // get all recipe request
      describe('get all recipe', () => {
        it('should return recipes to user', (done) => {
          request.get('/api/v1/recipes')
            .set('Authorization', token)
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

      // get recipes by most upvotes
      describe('get recipes by most upvote', () => {
        before((done) => {
          request.put('/api/v1/recipes/2/vote?up=true')
            .set('Authorization', token2)
            .end(() => {
              done();
            });
        });
        it('should return recipes by upvote', (done) => {
          request.get('/api/v1/recipes?sort=upvotes&order=ascending')
            .set('Authorization', token)
            .end((err, res) => {
              expect(res.status).to.equal(200);
              expect(res.body.status).to.equal('success');
              expect(res.body.recipes[0].id).to.equal(1);
              expect(res.body.recipes.length).to.equal(2);
              expect(res.body.pageCount).to.equal(1);
              done();
            });
        });
        it('should return a pageCount of 2 when limit is 1 and page is 2', (done) => {
          request.get('/api/v1/recipes?sort=upvotes&order=ascending&limit=1&page=2')
            .set('Authorization', token)
            .end((err, res) => {
              expect(res.status).to.equal(200);
              expect(res.body.status).to.equal('success');
              expect(res.body.recipes[0].id).to.equal(2);
              expect(res.body.recipes.length).to.equal(1);
              expect(res.body.pageCount).to.equal(2);
              done();
            });
        });
        it('should return recipes when limit is invalid', (done) => {
          request.get('/api/v1/recipes?sort=upvotes&order=ascending&limit=iihb&page=1')
            .set('Authorization', token)
            .end((err, res) => {
              expect(res.status).to.equal(200);
              expect(res.body.status).to.equal('success');
              expect(res.body.recipes.length).to.equal(2);
              done();
            });
        });
        it('should return recipes when page is invalid', (done) => {
          request.get('/api/v1/recipes?sort=upvotes&order=ascending&limit=1&page=kmkn')
            .set('Authorization', token)
            .end((err, res) => {
              expect(res.status).to.equal(200);
              expect(res.body.status).to.equal('success');
              expect(res.body.recipes.length).to.equal(1);
              done();
            });
        });
      });

      // search for recipe by recipe name request
      describe('Search ', () => {
        it('should return recipes when recipe name is supplied as the search term', (done) => {
          request.get('/api/v1/recipes?search=beans+cake')
            .set('Authorization', token)
            .end((err, res) => {
              expect(res.status).to.equal(200);
              expect(res.body.status).to.equal('success');
              expect(res.body.pageCount).to.equal(1);
              expect(res.body.recipes.length).to.equal(1);
              done();
            });
        });
        it('should return recipes when recipe category is supplied as the search term', (done) => {
          request.get('/api/v1/recipes?search=breakfast')
            .set('Authorization', token)
            .end((err, res) => {
              expect(res.status).to.equal(200);
              expect(res.body.status).to.equal('success');
              expect(res.body.pageCount).to.equal(1);
              expect(res.body.recipes.length).to.equal(2);
              done();
            });
        });
        it('should return pageCount of 2 when limit is 1 and total recipes is 2', (done) => {
          request.get('/api/v1/recipes?search=breakfast&limit=1&page=1')
            .set('Authorization', token)
            .end((err, res) => {
              expect(res.status).to.equal(200);
              expect(res.body.status).to.equal('success');
              expect(res.body.pageCount).to.equal(2);
              done();
            });
        });
        it('should not fail when an invalid search parameter is supplied', (done) => {
          request.get('/api/v1/recipes?search=[]')
            .set('Authorization', token)
            .end((err, res) => {
              expect(res.status).to.equal(200);
              expect(res.body.status).to.equal('success');
              expect(res.body.recipes).instanceOf(Array);
              expect(res.body.recipes.length).to.equal(0);
              done();
            });
        });
        it('should not fail when an invalid search parameter is supplied', (done) => {
          request.get('/api/v1/recipes?search=j2\'/[765]')
            .set('Authorization', token)
            .end((err, res) => {
              expect(res.status).to.equal(200);
              expect(res.body.status).to.equal('success');
              expect(res.body.recipes).instanceOf(Array);
              expect(res.body.recipes.length).to.equal(0);
              done();
            });
        });
      });

      // get favourite recipes
      describe('get favourite recipes', () => {
        before((done) => {
          request.post('/api/v1/users/recipe')
            .set('Authorization', token)
            .send({ recipeId: 1 })
            .end(() => {
              done();
            });
        });
        it('should return a user\'s favourite recipes', (done) => {
          request.get('/api/v1/users/recipes/favourite')
            .set('Authorization', token)
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
            .set('Authorization', token2)
            .send({ ...mock.recipe, name: 'pizza' })
            .end(() => {
              done();
            });
        });
        it('should return a user\'s created recipes', (done) => {
          request.get('/api/v1/users/recipes/created')
            .set('Authorization', token2)
            .end((err, res) => {
              expect(res.status).to.equal(200);
              expect(res.body.status).to.equal('success');
              expect(res.body.recipes).instanceOf(Array);
              expect(res.body.recipes.length).to.equal(1);
              expect(res.body.pageCount).to.equal(1);
              expect(res.body.recipes[0].name).to.equal('pizza');
              done();
            });
        });
      });

      // get recipe reviews
      describe('get recipe reviews', () => {
        it('should be successful when their is no review for a recipe', (done) => {
          request.get('/api/v1/recipes/1/reviews')
            .set('Authorization', token)
            .end((err, res) => {
              expect(res.status).to.equal(200);
              expect(res.body.status).to.equal('success');
              expect(res.body.pageCount).not.to.be.undefined;
              expect(res.body.reviews).to.be.instanceOf(Array);
              done();
            });
        });
        it('should return a single review when limit and page are set to equal 1', (done) => {
          request.get('/api/v1/recipes/1/reviews?limit=1&page=1')
            .set('Authorization', token)
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
            .set('Authorization', token)
            .end((err, res) => {
              expect(res.status).to.equal(404);
              expect(res.body.status).to.equal('fail');
              done();
            });
        });
      });
    });

    // modify recipe request
    describe('modify recipe', () => {
      const {
        userDataOne,
        userDataTwo,
        userDataThree,
        userDataFour
      } = mock.recipeUpdateData;
      it('should fail when user send invalid data', (done) => {
        request.put('/api/v1/recipes/1')
          .set('Authorization', token)
          .send({
            name: 9845,
            category: 'breakfast',
          })
          .end((err, res) => {
            expect(res.status).to.equal(400);
            expect(res.body.status).to.equal('fail');
            done();
          });
      });
      it('should fail when user send invalid data', (done) => {
        request.put('/api/v1/recipes/1')
          .set('Authorization', token)
          .send({
            directions: [1, 2, 3],
          })
          .end((err, res) => {
            expect(res.status).to.equal(400);
            expect(res.body.status).to.equal('fail');
            done();
          });
      });
      it('should fail when user did not create the recipe', (done) => {
        request.put('/api/v1/recipes/1')
          .set('Authorization', token2)
          .send(userDataFour)
          .end((err, res) => {
            expect(res.status).to.equal(403);
            expect(res.body.status).to.equal('fail');
            done();
          });
      });
      it('should fail when recipeId is not in not found ', (done) => {
        request.put('/api/v1/recipes/109')
          .set('Authorization', token2)
          .send(userDataFour)
          .end((err, res) => {
            expect(res.status).to.equal(404);
            expect(res.body.status).to.equal('fail');
            done();
          });
      });
      it('should fail when recipe id is invalid', (done) => {
        request.put('/api/v1/recipes/++10ufjdc')
          .set('Authorization', token2)
          .end((err, res) => {
            expect(res.status).to.equal(400);
            expect(res.body.status).to.equal('fail');
            done();
          });
      });
      it('should return success when user update a single field', (done) => {
        request.put('/api/v1/recipes/1')
          .set('Authorization', token)
          .send(userDataOne)
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body.status).to.equal('success');
            done();
          });
      });
      it('should return success when user update a two fields', (done) => {
        request.put('/api/v1/recipes/1')
          .set('Authorization', token)
          .send(userDataTwo)
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body.status).to.equal('success');
            done();
          });
      });
      it('should return success when user update a three fields', (done) => {
        request.put('/api/v1/recipes/1')
          .set('Authorization', token)
          .send(userDataThree)
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body.status).to.equal('success');
            done();
          });
      });
      it('should return success when user update a four fields', (done) => {
        request.put('/api/v1/recipes/1')
          .set('Authorization', token)
          .send(userDataFour)
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body.status).to.equal('success');
            done();
          });
      });
    });

    // get recipe request
    describe('view recipe', () => {
      it('should fail when recipe is not found', (done) => {
        request.get('/api/v1/recipes/10')
          .set('Authorization', token2)
          .end((err, res) => {
            expect(res.status).to.equal(404);
            expect(res.body.status).to.equal('fail');
            done();
          });
      });
      it('should increment view after a user has viewed a recipe', (done) => {
        request.get('/api/v1/recipes/1')
          .set('Authorization', token)
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body.status).to.equal('success');
            expect(res.body.recipe.views).to.equal(0);
            done();
          });
        after(() => {
          it('should not increament views when user views a recipe for the second time', () => {
            request.get('/api/v1/recipes/1')
              .set('Authorization', token)
              .end((err, res) => {
                expect(res.status).to.equal(200);
                expect(res.body.status).to.equal('success');
                expect(res.body.recipe.views).to.equal(1);
                done();
              });
          });
          it('should not increament views when user views a recipe for the third time', () => {
            request.get('/api/v1/recipes/1')
              .set('Authorization', token)
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

    // delete recipe request
    describe('delete recipe', () => {
      it('should fail when user did not create the recipe', (done) => {
        request.delete('/api/v1/recipes/1')
          .set('Authorization', token2)
          .end((err, res) => {
            expect(res.status).to.equal(403);
            expect(res.body.status).to.equal('fail');
            done();
          });
      });
      it('should fail when recipeId is not in db ', (done) => {
        request.delete('/api/v1/recipes/10')
          .set('Authorization', token2)
          .end((err, res) => {
            expect(res.status).to.equal(404);
            expect(res.body.status).to.equal('fail');
            done();
          });
      });
      it('should fail when invalid recipe id', (done) => {
        request.delete('/api/v1/recipes/11kdjf')
          .set('Authorization', token2)
          .end((err, res) => {
            expect(res.status).to.equal(400);
            expect(res.body.status).to.equal('fail');
            done();
          });
      });
      it('should return success when everything is fine', (done) => {
        request.delete('/api/v1/recipes/1')
          .set('Authorization', token)
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body.status).to.equal('success');
            done();
          });
      });
    });
  });
};

export default recipeSpec;
