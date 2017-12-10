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

export const validateRecipe = (recipe) => {
  const { name, category: recipeCategory, ingredients, directions } = recipe;
  return ({
    name: recipeName(name, 'Recipe name'),
    category: recipeCategory.trim() ? false : ['Select a category'],
    ingredients: ingredients ? ingredients && !ingredients.length > 0 && ['Ingredients list cannot be empty'] : ['Ingredients must be an array'],
    directions: directions ? !directions.length > 0 && ['Directions list cannot be empty'] : ['Directions must be an array']
  });
};
