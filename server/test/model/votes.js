/* eslint-disable import/no-extraneous-dependencies */
import { expect } from 'chai';
import db from '../../models';

const { Votes } = db;
const validationError = 'SequelizeValidationError';

describe('Votes model', () => {
  let fakeData;
  beforeEach(() => {
    fakeData = {
      voterId: 1,
      recipeId: 2,
      upVote: false,
      downVote: true
    };
  });

  it('should create a votes model object', (done) => {
    Votes.create(fakeData)
      .then((vote) => {
        expect(vote).to.instanceof(Object);
        expect(vote.voterId).to.equal(fakeData.voterId);
        expect(vote.recipeId).to.equal(fakeData.recipeId);
        expect(vote.upVote).to.equal(fakeData.upVote);
        expect(vote.downVote).to.equal(fakeData.downVote);
        done();
      });
  });

  it('should throw an error when voterId is null', () => {
    Votes.create({ ...fakeData, voterId: null })
      .catch((error) => {
        expect(error.name).to.equal(validationError);
      });
  });

  it('should throw an when upVote is null', () => {
    Votes.create({ ...fakeData, upVote: null })
      .catch((error) => {
        expect(error.name).to.equal(validationError);
      });
  });

  it('should throw an error when downVote is null', () => {
    Votes.create({ ...fakeData, downVote: null })
      .catch((error) => {
        expect(error.name).to.equal(validationError);
      });
  });

  it('should throw an error when recipeId is null', () => {
    Votes.create({ ...fakeData, recipeId: null })
      .catch((error) => {
        expect(error.name).to.equal(validationError);
      });
  });
});
