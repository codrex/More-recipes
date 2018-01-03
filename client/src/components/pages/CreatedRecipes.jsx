import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getCreatedRecipes } from '../../actions/recipeActions';
import RecipesDisplay from './RecipesDisplay';

/**
   * @return {React} Favourite Recipe component
   * @param {object} props
   */
const CreatedRecipes = props => (
  <RecipesDisplay
    title="Created recipes"
    getRecipes={props.getCreatedRecipes}
    recipes={props.createdRecipes}
    {...props}
  />
);

CreatedRecipes.propTypes = {
  getCreatedRecipes: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  createdRecipes: state.recipes
});

export { CreatedRecipes as PureCreatedRecipes };
export default connect(mapStateToProps, {
  getCreatedRecipes
})(CreatedRecipes);
