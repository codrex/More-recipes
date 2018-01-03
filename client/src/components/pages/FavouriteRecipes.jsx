import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getFavouriteRecipes } from '../../actions/recipeActions';
import RecipesDisplay from './RecipesDisplay';

/**
 * @return {React} Favourite Recipe component
 * @param {object} props
 */
const FavouriteRecipes = props => (
  <RecipesDisplay
    title="Favourite recipes"
    getRecipes={props.getFavouriteRecipes}
    recipes={props.favoriteRecipes}
    {...props}
  />
);
FavouriteRecipes.propTypes = {
  getFavouriteRecipes: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  favoriteRecipes: state.favoriteRecipes
});
export { FavouriteRecipes as PureFavoriteRecipes };
export default connect(mapStateToProps, {
  getFavouriteRecipes
})(FavouriteRecipes);
