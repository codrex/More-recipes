import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getAllRecipes, findRecipes } from '../../actions/recipeActions';
import RecipesDisplay from './RecipesDisplay';

/**
 * Recipes component
 */
class Recipes extends React.Component {
  /**
   * @return {undefined}
   * @param {object} nextProps
   */
  componentWillReceiveProps(nextProps) {
    const {
      searchTerm,
      search
    } = this.props;
    if (nextProps.searchTerm !== searchTerm) {
      return search(nextProps.searchTerm, 1);
    }
  }

  /**
   * @param {number} page
   * @return {undefined}
   */
  fetchRecipes = (page) => {
    const {
      searchTerm,
      search
    } = this.props;
    if (searchTerm) {
      return search(searchTerm, page);
    }
    this.props.getAllRecipes(page);
  }
  /**
   * @return {React} component
   */
  render() {
    return (
      <RecipesDisplay
        title="recipes"
        getRecipes={this.fetchRecipes}
        recipes={this.props.recipes}
        {...this.props}
      />
    );
  }
}

Recipes.defaultProps = {
  searchTerm: '',
};

Recipes.propTypes = {
  getAllRecipes: PropTypes.func.isRequired,
  recipes: PropTypes.arrayOf(PropTypes.shape).isRequired,
  searchTerm: PropTypes.string,
  search: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  recipes: state.recipes,
});

export { Recipes as PureRecipes };
export default connect(mapStateToProps, {
  getAllRecipes,
  search: findRecipes
})(Recipes);
