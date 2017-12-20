import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  getAllRecipes,
  getTopRecipes,
  getCreatedRecipes,
  getFavouriteRecipes,
  findRecipes,
  toggleFav,
} from '../../../actions/recipeActions';
import { getUserProfile } from '../../../actions/userActions';
import RecipeGrid from './recipesGrid';
import Paginator from '../../common/paginator/paginator';
import NotFound from '../../common/notFound/notFound';
import HeroArea from '../../common/heroArea/heroArea';
import { DEFAULT_PIX } from '../../../constants/constants';

/**
 * @return {React} Recipes
 */
export class Recipes extends React.Component {
  /**
   * @param {object} props
   */
  constructor(props) {
    super(props);
    const {
      actions,
      location,
      history
    } = props;
    const currentPath = this.editPathName(location.pathname);
    this.mapPathToActions = {
      'recipestop-recipes': actions.getTopRecipes,
      'recipesfavourite-recipes': actions.getFavouriteRecipes,
      recipes: actions.getAllRecipes
    };
    this.mapPathToTitle = {
      'recipestop-recipes': 'top recipe',
      'recipesfavourite-recipes': 'favorite recipes',
      recipes: 'recipes'
    };
    this.paths = Object.keys(this.mapPathToActions);
    this.state = {
      allRecipes: (
        currentPath === this.paths[1]
          ? props.favoriteRecipes : props.recipes
      ) || [],
      currentActions: getTopRecipes,
      currentPath,
      isValidPath: this.paths.includes(this.editPathName(location.pathname))
    };
    if (this.state.isValidPath) {
      this.mapPathToActions[this.state.currentPath](1);
    } else history.push('/not-found');
  }

  /**
   * @return {undefined}
   * @param {object} nextProps
   */
  componentWillReceiveProps(nextProps) {
    let { pathname } = nextProps.location;
    pathname = this.editPathName(pathname);
    const { currentPath } = this.state;
    const {
      favoriteRecipes,
      recipes
    } = nextProps;
    if (recipes !== this.props.recipes || favoriteRecipes !== this.props.favoriteRecipes) {
      this.setState({
        allRecipes: pathname === 'recipesfavourite-recipes' ? favoriteRecipes : recipes,
      });
    }
    if (currentPath !== pathname) {
      const isValidPath = this.paths.includes(pathname);
      this.setState({
        currentPath: pathname,
        isValidPath
      });
      if (isValidPath) {
        this.mapPathToActions[pathname](1);
      }
    }
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
    this.props.actions.toggleFav(id);
  }
  /**
   * @return {string} name
   * @param {string} name
   */
  editPathName = name => name.replace(/\//g, '').trim();

  /**
   * @return {React} RecipeGrid
   */
  renderRecipeGrid = () => {
    const { loading, history } = this.props;
    return (
      <RecipeGrid
        recipes={this.state.allRecipes}
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
    const { pageCount } = this.props;
    const { currentPath } = this.state;
    if (pageCount > 1) {
      return (
        <Paginator
          pageCount={pageCount}
          handlePageClick={({ selected }) => {
            this.mapPathToActions[currentPath](selected + 1);
          }}
        />
      );
    } return null;
  }

  /**
   * @return {React} NotFound
   */
  renderNotFound = () => {
    const { pageCount, loading } = this.props;
    if (pageCount < 1 && !loading) {
      return (
        <NotFound message="No recipe found" />
      );
    } return null;
  }

  /**
   * @return {undefined}
   */
  render() {
    const { loading, recipes } = this.props;
    const { currentPath } = this.state;
    return (
      <div className="container-fluid no-padding" id="dashboard">
        <HeroArea image={DEFAULT_PIX} title={this.mapPathToTitle[currentPath]} />
        <div className="row recipes-board d-flex flex-column">
          {!loading && recipes.length > 0 &&
            <div
              id="display-1"
              className={
                `bold text-dark
                d-flex
                justify-content-between`
              }
            >
              {
                this.state.allRecipes &&
                <span className="lead">
                  {`Total Recipes: ${this.state.allRecipes.length}`}
                </span>
              }
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

Recipes.propTypes = {
  actions: PropTypes.objectOf(PropTypes.shape).isRequired,
  loading: PropTypes.bool.isRequired,
  recipes: PropTypes.arrayOf(PropTypes.shape).isRequired,
  favoriteRecipes: PropTypes.arrayOf(PropTypes.shape).isRequired,
  user: PropTypes.objectOf(PropTypes.shape).isRequired,
  location: PropTypes.objectOf(PropTypes.shape).isRequired,
  history: PropTypes.objectOf(PropTypes.shape).isRequired,
  pageCount: PropTypes.number
};

Recipes.defaultProps = {
  pageCount: 0
};

const mapStateToProps = state => ({
  redirectUrl: state.redirectUrl,
  recipes: state.recipes,
  user: state.user,
  loading: state.networkRequest.loading,
  auth: state.auth,
  pageCount: state.pageCount,
  favoriteRecipes: state.favoriteRecipes
});
const mapDispatchToProps = dispatch => ({
  actions: {
    getAllRecipes: bindActionCreators(getAllRecipes, dispatch),
    getTopRecipes: bindActionCreators(getTopRecipes, dispatch),
    getProfile: bindActionCreators(getUserProfile, dispatch),
    search: bindActionCreators(findRecipes, dispatch),
    toggleFav: bindActionCreators(toggleFav, dispatch),
    getCreatedRecipes: bindActionCreators(getCreatedRecipes, dispatch),
    getFavouriteRecipes: bindActionCreators(getFavouriteRecipes, dispatch),
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Recipes);
