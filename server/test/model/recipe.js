/* eslint-disable import/no-extraneous-dependencies */
import { expect } from 'chai';
import db from '../../models';

const { Recipes } = db;
const validationError = 'SequelizeValidationError';

describe('Recipe model', () => {
  let fakeData;
  beforeEach(() => {
    fakeData = {
      name: 'jollof rice and chicken',
      ingredients: ['rice', 'oil', 'water'],
      directions: ['direction', 'direction 2'],
      stringIngredients: '',
      image: 'none',
      category: 'lunch'
    };
  });

  it('should create a recipe model object', (done) => {
    Recipes.create(fakeData)
      .then((recipe) => {
        expect(recipe).to.instanceof(Object);
        expect(recipe.name).to.equal(fakeData.name);
        expect(recipe.ingredients).to.eql(fakeData.ingredients);
        expect(recipe.directions).to.eql(fakeData.directions);
        expect(recipe.image).to.equal(fakeData.image);
        expect(recipe.stringIngredients).to.equal(fakeData.ingredients.join());
        expect(recipe.upVotes).to.equal(0);
        expect(recipe.downVotes).to.equal(0);
        expect(recipe.views).to.equal(0);
        done();
      });
  });

  it('should throw an error when recipe name is null', () => {
    Recipes.create({ ...fakeData, name: null })
      .catch((error) => {
        expect(error.name).to.equal(validationError);
      });
  });

  it('should throw an error when ingredients is null', () => {
    Recipes.create({ ...fakeData, ingredients: null })
      .catch((error) => {
        expect(error.name).to.equal(validationError);
      });
  });

  it('should throw an error when directions is null', () => {
    Recipes.create({ ...fakeData, directions: null })
      .catch((error) => {
        expect(error.name).to.equal(validationError);
      });
  });

  it('should throw an error when stringIngredients is null', () => {
    Recipes.create({ ...fakeData, stringIngredients: null })
      .catch((error) => {
        expect(error.name).to.equal(validationError);
      });
  });

  it('should throw an error when category is null', () => {
    Recipes.create({ ...fakeData, category: null })
      .catch((error) => {
        expect(error.name).to.equal(validationError);
      });
  });

  it('should throw an error when image is null', () => {
    Recipes.create({ ...fakeData, image: null })
      .catch((error) => {
        expect(error.name).to.equal(validationError);
      });
  });
});
