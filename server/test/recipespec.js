import supertest from 'supertest';
import app from '../bin/www';
import { expect } from 'chai';
const request = supertest(app);
import { generateToken } from '../authentication/authenticator';


export const recipeSpec = (user1, user2) => {
  const token = user1;
  const token2 = user2;
  const expiredToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OSwiaWF0IjoxNTExMTA4ODIwLCJleHAiOjE1MTExMDg4MjF9.qGQceo6WAEoP_1XgxHbiuonKkF_VPnYtpz52w0IvafI';

  describe('Integration test for recipe controller', () => {
    const deletedUser = generateToken({ id: 100 });

        // add recipe
    describe('add recipe', () => {
      let recipe = {};
      beforeEach(() => {
        recipe = {
          name: 'beans cake',
          category: 'breakfast',
          ingredients: ['beans', 'water', 'oil'],
          directions: ['step 1', 'step 2', 'step 3'],
        };
      });
      it('return 200 after recipe is created with valid data', done => {
        request.post('/api/v1/recipes')
          .set('Authorization', token)
          .send(recipe)
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body.status).to.equal('success');
            done();
          });
      });
      it('return 400 when recipe name already exists in the system', done => {
        request.post('/api/v1/recipes')
          .set('Authorization', token)
          .send(recipe)
          .end((err, res) => {
            expect(res.status).to.equal(400);
            expect(res.body.status).to.equal('fail');
            done();
          });
      });

      it('return 403 when user attempt to get recipe without access token', done => {
        request.post('/api/v1/recipes')
            .send(recipe)
            .end((err, res) => {
              expect(res.status).to.equal(403);
              expect(res.body.status).to.equal('fail');
              expect(res.body.error).to.equal('Sorry, authentication failed, you need to login or register');
              done();
            });
      });
      it('return 403 when user attempt to get recipe an invalid access token', done => {
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
      it('return 401 when user attempt to get recipe an expired access token', done => {
        request.post('/api/v1/recipes')
        .set('Authorization', expiredToken)
        .send(recipe)
        .end((err, res) => {
          console.log(res.body)
          expect(res.status).to.equal(401);
          expect(res.body.status).to.equal('fail');
          expect(res.body.error)
            .to.equal('Sorry, current session has expired, please login to continue');
          done();
        });
      });
      it('return 400 as status code', done => {
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
      it('return 400 as status code', done => {
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
      it('return 400 as status code for empty directions array', done => {
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
      it('return 400 as status code', done => {
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
      it('return 400 as status code', done => {
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
      it('return 400 as status code', done => {
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
      it('return 400 as status code for invalid array element', done => {
        const invalidRecipe = recipe;
        invalidRecipe.directions = [233, null, 4950];
        request.post('/api/v1/recipes')
            .set('Authorization', token)
            .send(invalidRecipe)
            .end((err, res) => {
              expect(res.status).to.equal(400);
              expect(res.body.status).to.equal('fail');
              done();
            });
      });
      it('return 400 as status code', done => {
        const invalidRecipe = recipe;
        invalidRecipe.ingredients = { step: 'one', step2: 'two' };
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
      it('return 200 as status code', done => {
        request.post('/api/v1/users/1/recipe')
            .set('Authorization', token)
            .send({ recipeId: 1 })
            .end((err, res) => {
              expect(res.status).to.equal(200);
              expect(res.body.status).to.equal('success');
              done();
            });
      });
      it('return 200 as status code', done => {
        request.post('/api/v1/users/1/recipe')
            .set('Authorization', token)
            .send({ recipeId: 1 })
            .end((err, res) => {
              expect(res.status).to.equal(200);
              expect(res.body.status).to.equal('success');
              expect(res.body.user.favRecipes.length).to.equal(0);
              done();
            });
      });
      it('return 404 as status code when recipe dose not exist', done => {
        request.post('/api/v1/users/1/recipe')
            .set('Authorization', token)
            .send({ recipeId: 100 })
            .end((err, res) => {
              expect(res.status).to.equal(404);
              expect(res.body.status).to.equal('fail');
              done();
            });
      });
      it('return 400 as status code for invalid recipe id', done => {
        request.post('/api/v1/users/1/recipe')
            .set('Authorization', token)
            .send({ recipeId: '<script>alert("hello you")</script>' })
            .end((err, res) => {
              expect(res.status).to.equal(400);
              expect(res.body.status).to.equal('fail');
              done();
            });
      });
    });

    // get fav recipes
    describe('get fav recipes', () => {
      it('return 200 as status code when everything is ok', done => {
        request.get('/api/v1/users/1/recipes')
          .set('Authorization', token)
            .end((err, res) => {
              expect(res.status).to.equal(200);
              expect(res.body.status).to.equal('success');
              done();
            });
      });
      it('return 404 as status code when user dose not exist', done => {
        request.get('/api/v1/users/100/recipes')
          .set('Authorization', token)
            .end((err, res) => {
              expect(res.status).to.equal(404);
              expect(res.body.status).to.equal('fail');
              done();
            });
      });
      it('return 400 as status code for invalid user id', done => {
        request.get('/api/v1/users/1kgg/recipes')
          .set('Authorization', token)
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
      it('return 200 as status code when everything is ok', done => {
        request.post('/api/v1/recipes/1/reviews')
            .set('Authorization', token)
            .send(review)
            .end((err, res) => {
              expect(res.status).to.equal(200);
              expect(res.body.status).to.equal('success');
              done();
            });
      });
      it('return 404 as status code when recipe dose not exist', done => {
        request.post('/api/v1/recipes/10/reviews')
            .set('Authorization', token)
            .send(review)
            .end((err, res) => {
              expect(res.status).to.equal(404);
              expect(res.body.status).to.equal('fail');
              done();
            });
      });
      it('return 400 as status code for empty review', done => {
        request.post('/api/v1/recipes/1/reviews')
            .set('Authorization', token)
            .send({ review: '' })
            .end((err, res) => {
              expect(res.status).to.equal(400);
              expect(res.body.status).to.equal('fail');
              done();
            });
      });
      it('return 400 as status code for empty review', done => {
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
      it('return 400 as status code for invalid recipe id', done => {
        request.put('/api/v1/recipes/1lk/vote?up=true')
            .set('Authorization', token)
            .end((err, res) => {
              expect(res.status).to.equal(400);
              expect(res.body.status).to.equal('fail');
              done();
            });
      });
      it('return 400 as status code when vote type is invalid', done => {
        request.put('/api/v1/recipes/1/vote?up=KKKKKKK')
            .set('Authorization', token)
            .end((err, res) => {
              expect(res.status).to.equal(400);
              expect(res.body.status).to.equal('fail');
              done();
            });
      });
      it('return 404 as status code when recipe not found', done => {
        request.put('/api/v1/recipes/100/vote?up=true')
            .set('Authorization', token)
            .end((err, res) => {
              expect(res.status).to.equal(404);
              expect(res.body.status).to.equal('fail');
              done();
            });
      });
      it('return 200 as status code when user upvote a recipe for the first time', done => {
        request.put('/api/v1/recipes/1/vote?up=true')
            .set('Authorization', token)
            .end((err, res) => {
              expect(res.status).to.equal(200);
              expect(res.body.recipe.upVotes).to.equal(1);
              expect(res.body.recipe.downVotes).to.equal(0);
              done();
            });
      });
      it('return 200 as status code when user cancel vote', done => {
        request.put('/api/v1/recipes/1/vote?up=false')
            .set('Authorization', token)
            .end((err, res) => {
              expect(res.status).to.equal(200);
              expect(res.body.recipe.upVotes).to.equal(0);
              expect(res.body.recipe.downVotes).to.equal(0);
              done();
            });
      });
      it('return 200 as status code when user upvotes after a cancelled vote', done => {
        request.put('/api/v1/recipes/1/vote?up=true')
            .set('Authorization', token)
            .end((err, res) => {
              expect(res.status).to.equal(200);
              expect(res.body.recipe.upVotes).to.equal(1);
              expect(res.body.recipe.downVotes).to.equal(0);
              done();
            });
      });
      it('return 200 as status code when another user downvote a recipe', done => {
        request.put('/api/v1/recipes/1/vote?down=true')
            .set('Authorization', token2)
            .end((err, res) => {
              expect(res.status).to.equal(200);
              expect(res.body.recipe.upVotes).to.equal(1);
              expect(res.body.recipe.downVotes).to.equal(1);
              done();
            });
      });
      it(`return 200 as status code when another user cancel downvote`, done => {
        request.put('/api/v1/recipes/1/vote?down=False')
            .set('Authorization', token2)
            .end((err, res) => {
              expect(res.status).to.equal(200);
              expect(res.body.recipe.upVotes).to.equal(1);
              expect(res.body.recipe.downVotes).to.equal(0);
              done();
            });
      });
      it(`return 200 as status code when another user downvote after a cancelled downvote`, done => {
        request.put('/api/v1/recipes/1/vote?down=true')
            .set('Authorization', token2)
            .end((err, res) => {
              expect(res.status).to.equal(200);
              expect(res.body.recipe.upVotes).to.equal(1);
              expect(res.body.recipe.downVotes).to.equal(1);
              done();
            });
      });
      it('return 200 as status code when a user changes from downvote to upvote', done => {
        request.put('/api/v1/recipes/1/vote?up=true')
            .set('Authorization', token2)
            .end((err, res) => {
              expect(res.status).to.equal(200);
              expect(res.body.recipe.upVotes).to.equal(2);
              expect(res.body.recipe.downVotes).to.equal(0);
              done();
            });
      });
      it('return 200 as status code when a user changes from upvote to downvote', done => {
        request.put('/api/v1/recipes/1/vote?down=true')
            .set('Authorization', token)
            .end((err, res) => {
              expect(res.status).to.equal(200);
              expect(res.body.recipe.upVotes).to.equal(1);
              expect(res.body.recipe.downVotes).to.equal(1);
              done();
            });
      });
    });
    // get recipe by most upvotes
    describe('get recipe by most upvote', () => {
    it('return 200 as status code when everything is fine', done => {
      request.get('/api/v1/recipes?sort=upvotes&order=ascending')
        .set('Authorization', token)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.status).to.equal('success');
          expect(res.body.recipes[0].id).to.equal(1);
          done();
        });
        });
      });
      // modify recipe request
    describe('modify recipe', () => {
      const updateOne = {
        name: 'beans cake',
      };
      const updateTwo = {
        name: 'beans cake',
        category: 'breakfast',
      };
      const updateThree = {
        name: 'beans cake',
        category: 'breakfast',
        ingredients: ['beans', 'water', 'oil'],
      };
      const updateFour = {
        name: 'beans and rice',
        category: 'dinner',
        ingredients: ['beans', 'rice', 'oil'],
        directions: ['step 1', 'step 2', 'step 3', 'step 4'],
      };
      it('return 400 as status code when user send invalid data', done => {
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
      it('return 400 as status code when user send invalid data', done => {
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
      it('return 404 as status code when user did not create the recipe', done => {
        request.put('/api/v1/recipes/1')
            .set('Authorization', token2)
            .send(updateFour)
            .end((err, res) => {
              expect(res.status).to.equal(404);
              expect(res.body.status).to.equal('fail');
              done();
            });
      });
      it('return 404 as status code when recipeId is not in db ', done => {
        request.put('/api/v1/recipes/109')
            .set('Authorization', token2)
            .send(updateFour)
            .end((err, res) => {
              expect(res.status).to.equal(404);
              expect(res.body.status).to.equal('fail');
              done();
            });
      });
      it('return 400 as status code for invalid recipe id parameter', done => {
        request.put('/api/v1/recipes/++10ufjdc')
            .set('Authorization', token2)
            .end((err, res) => {
              expect(res.status).to.equal(400);
              expect(res.body.status).to.equal('fail');
              done();
            });
      });
      it('return 200 as status code when everything is fine 1-input', done => {
        request.put('/api/v1/recipes/1')
            .set('Authorization', token)
            .send(updateOne)
            .end((err, res) => {
              expect(res.status).to.equal(200);
              expect(res.body.status).to.equal('success');
              done();
            });
      });
      it('return 200 as status code when everything is fine 2-inputs', done => {
        request.put('/api/v1/recipes/1')
            .set('Authorization', token)
            .send(updateTwo)
            .end((err, res) => {
              expect(res.status).to.equal(200);
              expect(res.body.status).to.equal('success');
              done();
            });
      });
      it('return 200 as status code when everything is fine 3-inputs', done => {
        request.put('/api/v1/recipes/1')
            .set('Authorization', token)
            .send(updateThree)
            .end((err, res) => {
              expect(res.status).to.equal(200);
              expect(res.body.status).to.equal('success');
              done();
            });
      });
      it('return 200 as status code when everything is fine 4-inputs', done => {
        request.put('/api/v1/recipes/1')
            .set('Authorization', token)
            .send(updateFour)
            .end((err, res) => {
              expect(res.status).to.equal(200);
              expect(res.body.status).to.equal('success');
              done();
            });
      });
    });

      // get all recipe request
    describe('get all recipe', () => {
      it('return 200 as status code', done => {
        request.get('/api/v1/recipes')
            .set('Authorization', token)
            .end((err, res) => {
              expect(res.status).to.equal(200);
              expect(res.body.status).to.equal('success');
              done();
            });
      });
    });

      // search for recipe by recipe name request
    describe('search for recipe by recipe name ', () => {
      it('return 200 as status code for get recipe by recipe name', done => {
        request.get('/api/v1/recipes?search=beans+cake')
            .set('Authorization', token)
            .end((err, res) => {
              expect(res.status).to.equal(200);
              expect(res.body.status).to.equal('success');
              done();
            });
      });
      it('return 200 as status code for get recipe by recipe name', done => {
        request.get('/api/v1/recipes?search=bannana+drink')
            .set('Authorization', token)
            .end((err, res) => {
              expect(res.status).to.equal(200);
              expect(res.body.status).to.equal('success');
              done();
            });
      });

      it('return 200 as status code for get recipe by recipe category', done => {
        request.get('/api/v1/recipes?search=breakfast')
            .set('Authorization', token)
            .end((err, res) => {
              expect(res.status).to.equal(200);
              expect(res.body.status).to.equal('success');
              done();
            });
      });
      it('return 200 as status code when invalid search parameter is pass', done => {
        request.get('/api/v1/recipes?search=[]')
            .set('Authorization', token)
            .end((err, res) => {
              expect(res.status).to.equal(200);
              expect(res.body.status).to.equal('success');
              done();
            });
      });
      it('return 200 as status code when invalid search parameter is pass', done => {
        request.get('/api/v1/recipes?search=j2\'/[765]')
            .set('Authorization', token)
            .end((err, res) => {
              expect(res.status).to.equal(200);
              expect(res.body.status).to.equal('success');
              done();
            });
      });
    });

    // get recipe request
    describe('view recipe', () => {
      it('return 404 as status code when recipe is not found', done => {
        request.get('/api/v1/recipes/10')
          .set('Authorization', token2)
          .end((err, res) => {
            expect(res.status).to.equal(404);
            expect(res.body.status).to.equal('fail');
            done();
          });
      });
      it('return 200 as status code when user views a recipe for the first time', done => {
        request.get('/api/v1/recipes/1')
          .set('Authorization', token)
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body.status).to.equal('success');
            expect(res.body.recipe.views).to.equal(0);
            done();
          });
        after(() => {
          it('return 200 as status code when user views a recipe for the second time', () => {
            request.get('/api/v1/recipes/1')
              .set('Authorization', token)
              .end((err, res) => {
                expect(res.status).to.equal(200);
                expect(res.body.status).to.equal('success');
                expect(res.body.recipe.views).to.equal(1);
                done();
              });
          });
          it('return 200 as status code when user views a recipe for the third time', () => {
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

      it('return 200 as status code when another user views a recipe for the first time', done => {
        request.get('/api/v1/recipes/1')
          .set('Authorization', token)
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body.status).to.equal('success');
            expect(res.body.recipe.views).to.equal(1);
            done();
          });
        after(() => {
          it('return 200 as status code when another user views a recipe for the second time', () => {
            request.get('/api/v1/recipes/1')
              .set('Authorization', token2)
              .end((err, res) => {
                expect(res.status).to.equal(200);
                expect(res.body.status).to.equal('success');
                expect(res.body.recipe.views).to.equal(2);
                done();
              });
          });
          it('return 200 as status code when another user views a recipe for the third time', () => {
            request.get('/api/v1/recipes/1')
              .set('Authorization', token2)
              .end((err, res) => {
                expect(res.status).to.equal(200);
                expect(res.body.status).to.equal('success');
                expect(res.body.recipe.views).to.equal(2);
                done();
              });
          });
        });
      });
    });

      // delete recipe request
    describe('delete recipe', () => {
      it('return 404 as status code when user did not create the recipe', done => {
        request.delete('/api/v1/recipes/1')
            .set('Authorization', token2)
            .end((err, res) => {
              expect(res.status).to.equal(404);
              expect(res.body.status).to.equal('fail');
              done();
            });
      });
      it('return 404 as status code when recipeId is not in db ', done => {
        request.delete('/api/v1/recipes/10')
            .set('Authorization', token2)
            .end((err, res) => {
              expect(res.status).to.equal(404);
              expect(res.body.status).to.equal('fail');
              done();
            });
      });
      it('return 400 as status code for invalid recipe id', done => {
        request.delete('/api/v1/recipes/11kdjf')
            .set('Authorization', token2)
            .end((err, res) => {
              expect(res.status).to.equal(400);
              expect(res.body.status).to.equal('fail');
              done();
            });
      });
      it('return 200 as status code when everything is fine', done => {
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

