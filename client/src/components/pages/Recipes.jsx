import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getAllRecipes } from '../../actions/recipeActions';
import RecipesDisplay from './RecipesDisplay';

/**
 * Recipes component
 * @param {object} props
 * @return {React} react element
 */
const Recipes = props => (
  <RecipesDisplay
    title="recipes"
    getRecipes={props.getAllRecipes}
    recipes={props.recipes}
    {...props}
  />
);

Recipes.propTypes = {
  getAllRecipes: PropTypes.func.isRequired,
  recipes: PropTypes.arrayOf(PropTypes.shape).isRequired
};

const mapStateToProps = state => ({
  recipes: state.recipes
});

export { Recipes as PureRecipes };
export default connect(mapStateToProps, {
  getAllRecipes
})(Recipes);
