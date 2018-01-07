import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getFavouriteRecipes } from '../../actions/recipeActions';
import RecipesDisplay from './RecipesDisplay';

/**
 * Carousel component
 * @param {object} props
 * @return {React} react element
 */
const FavouriteRecipes = props => (
  <RecipesDisplay
    title="Favourite recipes"
    getRecipes={props.getFavouriteRecipes}
    recipes={props.favouriteRecipes}
    {...props}
  />
);
FavouriteRecipes.propTypes = {
  getFavouriteRecipes: PropTypes.func.isRequired,
  favouriteRecipes: PropTypes.arrayOf(PropTypes.shape).isRequired,
};

const mapStateToProps = state => ({
  favouriteRecipes: state.favoriteRecipes
});
export { FavouriteRecipes as PureFavoriteRecipes };
export default connect(mapStateToProps, {
  getFavouriteRecipes
})(FavouriteRecipes);
