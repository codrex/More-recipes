import validate from 'validate.js';
import constraint from './constraint';

/**
 * @description custom validator that check if a form value has
 * more than one word
 * @return {array|undefined} error
 * @param {string} word
 */
validate.validators.words = (word) => {
  if (word !== undefined) {
    if (word.trim().split(' ').length > 1) {
      return undefined;
    }
  }
  return 'Fullname must be more than one word';
};

/**
 * validate username field
 * @return {array|undefined} error
 * @param {string} value
 */
const username = value => validate.single(value, constraint.username);

/**
 *  validate password field
 * @return {array|undefined} error
 * @param {string} value
 */
const password = value => validate.single(value, constraint.password);

/**
 *  validate email field
 * @return {array|undefined} error
 * @param {string} value
 */
const email = value => validate.single(value, constraint.email);

/**
 *  validate fullname field
 * @return {array|undefined} error
 * @param {string} value
 */
const fullname = value => validate.single(value, constraint.fullname);

/**
 *  validate review field
 * @return {array|undefined} error
 * @param {string} value
 */
const review = value =>
  validate.single(value, constraint.presenceAndLength('review'));

/**
 *  validate item field
 * @return {array|undefined} error
 * @param {string} value
 * @param {string} itemName
 */
const validateItem = (value, itemName) =>
  validate.single(value, constraint.presenceAndLength(itemName));

/**
 *  validate recipe name field
 * @return {array|undefined} error
 * @param {string} value
 * @param {string} itemName
 */
const recipeName = (value, itemName) =>
  validate.single(value, constraint.presenceAndLength(itemName));

/**
 *  validate category field
 * @return {array|undefined} error
 * @param {string} value
 * @param {string} itemName
 */
const category = (value, itemName) =>
  validate.single(value, constraint.presenceAndLength(itemName));

/**
 *  validate recipe object
 * @return {object} error
 * @param {object} recipe
 */
const validateRecipe = (recipe) => {
  const {
    name,
    category: recipeCategory,
    ingredients,
    directions
  } = recipe;
  return (
    {
      name: recipeName(name, 'Recipe name'),
      category: recipeCategory.trim() ? false : ['Select a category'],
      ingredients: ingredients ? ingredients && !ingredients.length > 0 &&
      ['Ingredients list cannot be empty'] : ['Ingredients must be an array'],
      directions: directions ? !directions.length > 0 &&
      ['Directions list cannot be empty'] : ['Directions must be an array']
    }
  );
};

export {
  username,
  password,
  email,
  fullname,
  review,
  validateItem,
  recipeName,
  category,
  validateRecipe
};
