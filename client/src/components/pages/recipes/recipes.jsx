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
import NotFound from '../notFound/notFound';
import HeroArea from '../../common/heroArea/heroArea';

const pix = 'https://res.cloudinary.com/resycom/image/upload/c_scale,q_53,w_2543/v1509718851/eaters-collective-132773_izkarh.jpg';

/**
 * Dashboard component
 * @returns {React} react
 */
export class Dashboard extends React.Component {
  /**
   * @param {object} props
   */
  constructor(props) {
    super(props);
    const { actions, location, history } = props;
    this.mapPathToActions = {
      'recipestop-recipes': actions.getTopRecipes,
      'recipesfavourite-recipes': actions.getFavouriteRecipes,
      'recipescreated-recipes': actions.getCreatedRecipes,
      recipes: actions.getAllRecipes
    };
    this.mapPathToTitle = {
      'recipestop-recipes': 'top recipe',
      'recipesfavourite-recipes': 'favorite recipes',
      'recipescreated-recipes': 'created recipes',
      recipes: 'recipes'
    };
    this.paths = Object.keys(this.mapPathToActions);
    this.state = {
      allRecipes: props.recipes || [],
      currentActions: getTopRecipes,
      currentPath: this.editPathName(location.pathname),
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
    const { currentPath } = this.state;
    if (nextProps.recipes !== this.props.recipes) {
      this.setState({
        allRecipes: nextProps.recipes
      });
    }
    pathname = this.editPathName(pathname);
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

  editPathName = value => value.replace(/\//g, '').trim();

  /**
   * @return {undefined}
   * @param {string} value
   */
  recipeSearch = (value) => {
    // const activeStates = [...this.state.activeStates];
    // activeStates[3] = `search for ${value}`;
    // this.setState({
    //   activeStates,
    //   active: 3,
    // });
    this.props.actions.search(value);
  }

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
    const { pageCount, loading } = this.props;
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
        <HeroArea image={pix} title={this.mapPathToTitle[currentPath]} />
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

Dashboard.propTypes = {
  actions: PropTypes.objectOf(PropTypes.shape).isRequired,
  loading: PropTypes.bool.isRequired,
  recipes: PropTypes.arrayOf(PropTypes.shape).isRequired,
  user: PropTypes.objectOf(PropTypes.shape).isRequired,
};

const mapStateToProps = state => ({
  redirectUrl: state.redirectUrl,
  recipes: state.recipes,
  user: state.user,
  loading: state.networkRequest.loading,
  auth: state.auth,
  pageCount: state.pageCount
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

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
