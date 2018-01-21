/* eslint-disable import/no-extraneous-dependencies */
import { expect } from 'chai';
import db from '../../models';

const { FavRecipe } = db;
const validationError = 'SequelizeValidationError';

describe('FavRecipe model', () => {
  let fakeData;
  beforeEach(() => {
    fakeData = {
      UserId: 1,
      RecipeId: 2,
    };
  });

  it('should create a favourite recipe model object', (done) => {
    FavRecipe.create(fakeData)
      .then((favRecipe) => {
        expect(favRecipe).to.instanceof(Object);
        expect(favRecipe.UserId).to.equal(fakeData.UserId);
        expect(favRecipe.RecipeId).to.equal(fakeData.RecipeId);
        done();
      });
  });

  it('should throw an error when user id is null', () => {
    FavRecipe.create({ ...fakeData, UserId: null })
      .catch((error) => {
        expect(error.name).to.equal(validationError);
      });
  });

  it('should throw an error when recipe id is null', () => {
    FavRecipe.create({ ...fakeData, RecipeId: null })
      .catch((error) => {
        expect(error.name).to.equal(validationError);
      });
  });
});
