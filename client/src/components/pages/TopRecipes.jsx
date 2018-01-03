import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getTopRecipes } from '../../actions/recipeActions';
import RecipesDisplay from './RecipesDisplay';

/**
 * @return {React} Favourite Recipe component
 * @param {object} props
 */
const TopRecipes = props => (
  <RecipesDisplay
    title="Top recipes"
    getRecipes={props.getTopRecipes}
    recipes={props.topRecipes}
    {...props}
  />
);

TopRecipes.propTypes = {
  getTopRecipes: PropTypes.func.isRequired,
  topRecipes: PropTypes.arrayOf(PropTypes.shape).isRequired
};

const mapStateToProps = state => ({
  topRecipes: state.recipes
});

export { TopRecipes as PureTopRecipes };
export default connect(mapStateToProps, {
  getTopRecipes
})(TopRecipes);
