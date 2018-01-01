import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import toastr from 'toastr';
import Navbar from '../components/common/navbar';
import SecondaryNavBar from '../components/common/secondaryNavBar';
import Footer from '../components/common/footer';
import NotFound from '../components/common/notFound';
import FavouriteRecipes from '../components/pages/favouriteRecipes';
import CreatedRecipes from '../components/pages/createdRecipes';
import TopRecipes from '../components/pages/topRecipes';
import Recipes from '../components/pages/recipes';
import RecipeDetails from '../components/pages/recipeDetails';
import Profile from '../components/pages/profile';
import Landing from './pages/landing';
import ModifyRecipe from './pages/modifyRecipe';
import CreateRecipe from './pages/createRecipe';
import { getUserProfile } from '../actions/userActions';
import toastrConfig from '../toastr/config';
import { resetReqCount, resetSuccess } from '../actions/ajaxActions';
import { findRecipes } from '../actions/recipeActions';
import Dropdown from '../components/common/dropdown';
/**
 * App component
 */
class App extends React.Component {
  /**
   * @return {undefined}
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.onAuthenticated = this.onAuthenticated.bind(this);
  }
  /**
   * @return {undefined}
   */
  componentDidMount() {
    const { user, auth, getProfile } = this.props;
    if (auth.authenticated && !user.id) {
      getProfile();
    }
  }
  /**
   * @return {bool} true or false
   * @param {Object} nextProps
   */
  shouldComponentUpdate(nextProps) {
    const { request } = nextProps;
    if (request.msg) {
      toastr.clear();
      if (!request.success && request.msg) {
        toastr.error(request.msg, 'Error', toastrConfig);
        this.props.resetMessage();
      } else if (request.success && request.msg) {
        toastr.success(request.msg, 'Success', toastrConfig);
      }
    }

    return true;
  }
  /**
   * @return {undefined}
   * @param {jsx} Component
   * @param {object} match
   * @summary check if user is authenticated before accessing protected page
              else redirect user to the landing page where user can login or signup
   */
  onAuthenticated(Component, match) {
    const { authenticated } = this.props.auth;
    // passing match to Navbar will enable it render when path changes
    return authenticated ? (
      <div>
        <Navbar {...match} />
        <SecondaryNavBar
          {...match}
          handleChange={value => this.handleRecipeSearch(match.history.push, value)}
        />
        <Component {...match} />
      </div>
    ) : <Redirect to="/" />;
  }

  /**
   * @param {object} push
   * @param {string} value
   * @return {undefined}
   */
  handleRecipeSearch = (push, value) => {
    push('/recipes');
    this.props.searchRecipes(value);
  }

  /**
   * @return {undefined}
   * @param {jsx} Component
   * @param {object} match
   */
  isLoggedIn(Component, match) {
    const { authenticated } = this.props.auth;
    // passing match to Navbar will enable it render when path changes
    return !authenticated ? (
      <div>
        <Navbar {...match} />
        <Component {...match} />
      </div>
    ) : <Redirect to="/recipes" />;
  }

  /**
   * @return {undefined}
   * @param {object} match
   */
  renderNotFound = match => (
    <div>
      <Navbar {...match} />
      <SecondaryNavBar
        {...match}
        handleChange={value => this.handleRecipeSearch(match.history.push, value)}
      />
      <div className="not-found-wrapper">
        <NotFound message="page not found" />
      </div>
    </div>
  )

  /**
   * @return{undefined}
   */
  render() {
    return (
      <BrowserRouter>
        <div className="container-fluid  no-padding">
          <Switch>
            <Route
              static
              path="/drop"
              extact
              component={Dropdown}
            />
            <Route
              static
              path="/create"
              extact
              render={match => this.onAuthenticated(CreateRecipe, match)}
            />
            <Route
              static
              path="/modify/:id"
              extact
              render={match => this.onAuthenticated(ModifyRecipe, match)}
            />
            <Route
              static
              path="/recipe/:id"
              extact
              render={match => this.onAuthenticated(RecipeDetails, match)}
            />
            <Route
              static
              extact
              path="/created-recipes"
              render={match => this.onAuthenticated(CreatedRecipes, match)}
            />
            <Route
              static
              extact
              path="/favourite-recipes"
              render={match => this.onAuthenticated(FavouriteRecipes, match)}
            />
            <Route
              static
              extact
              path="/top-recipes"
              render={match => this.onAuthenticated(TopRecipes, match)}
            />
            <Route
              static
              extact
              path="/recipes"
              render={match => this.onAuthenticated(Recipes, match)}
            />
            <Route
              path="/user"
              render={match => this.onAuthenticated(Profile, match)}
            />
            <Route
              static
              extact
              path="/login"
              render={match => this.isLoggedIn(Landing, match)}
            />
            <Route
              static
              extact
              path="/create-account"
              render={match => this.isLoggedIn(Landing, match)}
            />
            <Route
              static
              extact
              path="/not-found"
              render={match => this.renderNotFound(match)}
            />
            <Route
              extact
              path="/"
              render={match => this.isLoggedIn(Landing, match)}
            />
          </Switch>
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  auth: PropTypes.objectOf(PropTypes.shape).isRequired,
  getProfile: PropTypes.func.isRequired,
  resetMessage: PropTypes.func.isRequired,
  user: PropTypes.objectOf(PropTypes.shape).isRequired,
  resetReqCount: PropTypes.func.isRequired,
  searchRecipes: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  request: state.networkRequest,
  auth: state.auth,
  user: state.user
});

export default connect(mapStateToProps, {
  resetReqCount,
  getProfile: getUserProfile,
  searchRecipes: findRecipes,
  resetMessage: resetSuccess
})(App);
