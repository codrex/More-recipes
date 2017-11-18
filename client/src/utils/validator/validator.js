import validate from 'validate.js';
import constraint from './constraint';

// custom validator that check if a form value has more than one word
validate.validators.words = (word) => {
  if (word !== undefined) {
    if (word.trim().split(' ').length > 1) {
      return undefined;
    }
  }
  return 'Fullname must be more than one word';
};

export const username = value => validate.single(value, constraint.username);

export const password = value => validate.single(value, constraint.password);

export const email = value => validate.single(value, constraint.email);

export const fullname = value => validate.single(value, constraint.fullname);

export const review = value =>
validate.single(value, constraint.presenceAndLength('review'));

export const item = (value, itemName) =>
validate.single(value, constraint.presenceAndLength(itemName));

export const recipeName = (value, itemName) =>
validate.single(value, constraint.presenceAndLength(itemName));

export const category = (value, itemName) =>
validate.single(value, constraint.presenceAndLength(itemName));
