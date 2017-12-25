import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import RecipeGrid from './recipeGrid';
import Paginator from '../../common/paginator';
import NotFound from '../../common/notFound';
import HeroArea from '../../common/heroArea/heroArea';
import { DEFAULT_PIX } from '../../../constants';
import { toggleFav } from '../../../actions/recipeActions';
import resetPageCount from '../../../actions/pageCountActions';

/**
 * @return {React} RecipesDisplay
 */
class RecipesDisplay extends React.Component {
  state ={
    recipes: this.props.recipes
  }
  /**
   * @return {undefined}
   */
  componentDidMount() {
    this.props.resetPageCount();
    this.props.getRecipes(1);
  }

  /**
   * @return {undefined}
   * @param {object} nextProps
   */
  componentWillReceiveProps(nextProps) {
    if (this.state.recipes === nextProps.recipes) return;
    this.setState({ recipes: nextProps.recipes });
  }

  /**
   * @return {undefined}
   * @param {number} id
   */
  isUserFav = id => this.props.user.favRecipes.find((recipe) => {
    const recipeId = recipe.id;
    return id === recipeId;
  })

  /**
   * @return {undefined}
   * @param {number} id
   */
  toggleFav = (id) => {
    this.props.toggleFav(id);
  }

  /**
   * @return {React} RecipeGrid
   */
  renderRecipeGrid = () => {
    const { loading, history } = this.props;
    return (
      <RecipeGrid
        recipes={this.state.recipes}
        loading={loading}
        toggleFav={this.toggleFav}
        isUserFav={this.isUserFav}
        history={history}
      />
    );
  }

  /**
   * @return {React} Paginator
   */
  renderPagination = () => {
    const {
      pageCount,
      getRecipes,
      loading
    } = this.props;

    if (pageCount > 1) {
      return (
        <Paginator
          loading={loading}
          pageCount={pageCount}
          handlePageClick={({ selected }) => {
            getRecipes(selected + 1);
          }}
        />
      );
    } return null;
  }

  /**
   * @return {React} NotFound
   */
  renderNotFound = () => {
    const {
      loading,
      recipes
    } = this.props;

    if (recipes.length < 1 && !loading) {
      return (
        <NotFound message="No recipe found" />
      );
    } return null;
  }

  /**
   * @return {undefined}
   */
  render() {
    const { loading, recipes, title } = this.props;
    return (
      <div className="container-fluid no-padding" id="recipes">
        <HeroArea image={DEFAULT_PIX} title={title} />
        <div className="row recipes-board d-flex flex-column">
          {!loading && recipes.length > 0 &&
            <div
              id="display-1"
              className={
                `bold
                text-dark
                d-flex
                justify-content-between`
              }
            >
              <span className="lead">
                {`Total Recipes: ${recipes.length}`}
              </span>

            </div>
          }
          {this.renderRecipeGrid()}
          {this.renderPagination()}
          {this.renderNotFound()}
        </div>
      </div>
    );
  }
}

RecipesDisplay.propTypes = {
  loading: PropTypes.bool.isRequired,
  recipes: PropTypes.arrayOf(PropTypes.shape).isRequired,
  user: PropTypes.objectOf(PropTypes.shape).isRequired,
  history: PropTypes.objectOf(PropTypes.shape).isRequired,
  pageCount: PropTypes.number,
  title: PropTypes.string,
  resetPageCount: PropTypes.func.isRequired,
  getRecipes: PropTypes.func.isRequired,
  toggleFav: PropTypes.func.isRequired
};

RecipesDisplay.defaultProps = {
  pageCount: 0,
  title: ''
};

const mapStateToProps = state => ({
  user: state.user,
  loading: state.networkRequest.loading,
  requestCount: state.networkRequest.requestCount,
  auth: state.auth,
  pageCount: state.pageCount,
});

export { RecipesDisplay as PureRecipesDisplay };

export default connect(mapStateToProps, {
  toggleFav,
  resetPageCount
})(RecipesDisplay);
