/* eslint-disable import/no-extraneous-dependencies, no-unused-expressions */
import { expect } from 'chai';
import db from '../../models';

const { RecipeReviews } = db;
const validationError = 'SequelizeValidationError';

describe('RecipeReviews model', () => {
  let fakeData;
  beforeEach(() => {
    fakeData = {
      review: 'cool recipe',
      reviewerId: 1
    };
  });

  it('should create a recipe review model object', (done) => {
    RecipeReviews.create(fakeData)
      .then((review) => {
        expect(review).to.instanceof(Object);
        expect(review.review).to.equal(fakeData.review);
        expect(review.reviewerId).to.equal(fakeData.reviewerId);
        expect(review.RecipeId).to.be.null;
        done();
      });
  });

  it('should throw an error when review is null', () => {
    RecipeReviews.create({ ...fakeData, review: null })
      .catch((error) => {
        expect(error.name).to.equal(validationError);
      });
  });

  it('should throw an error when reviewer id is null', () => {
    RecipeReviews.create({ ...fakeData, reviewerId: null })
      .catch((error) => {
        expect(error.name).to.equal(validationError);
      });
  });
});
