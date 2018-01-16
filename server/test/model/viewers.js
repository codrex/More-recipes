/* eslint-disable import/no-extraneous-dependencies */
import { expect } from 'chai';
import db from '../../models';

const { Viewers } = db;
const validationError = 'SequelizeValidationError';

describe('Viewers model', () => {
  let fakeData;
  beforeEach(() => {
    fakeData = {
      userId: 1,
      recipeId: 2,
    };
  });

  it('should create a viewer model object', (done) => {
    Viewers.create(fakeData)
      .then((viewer) => {
        expect(viewer).to.instanceof(Object);
        expect(viewer.userId).to.equal(fakeData.userId);
        expect(viewer.recipeId).to.equal(fakeData.recipeId);
        done();
      });
  });

  it('should throw an error when user id is null', () => {
    Viewers.create({ ...fakeData, userId: null })
      .catch((error) => {
        expect(error.name).to.equal(validationError);
      });
  });

  it('should throw an error when recipe id is null', () => {
    Viewers.create({ ...fakeData, recipeId: null })
      .catch((error) => {
        expect(error.name).to.equal(validationError);
      });
  });
});
