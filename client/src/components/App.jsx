import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import toastr from 'toastr';
import Navbar from '../components/common/Navbar';
import SecondaryNavBar from '../components/common/SecondaryNavBar';
import Footer from '../components/common/Footer';
import NotFound from '../components/common/NotFound';
import FavouriteRecipes from '../components/pages/FavouriteRecipes';
import CreatedRecipes from '../components/pages/CreatedRecipes';
import TopRecipes from '../components/pages/TopRecipes';
import Recipes from '../components/pages/Recipes';
import RecipeDetails from '../components/pages/RecipeDetails';
import Profile from '../components/pages/Profile';
import Landing from './pages/Landing';
import ModifyRecipe from './pages/ModifyRecipe';
import CreateRecipe from './pages/CreateRecipe';
import { getUserProfile } from '../actions/userActions';
import toastrConfig from '../toastr/toastrConfig';
import { resetReqCount, resetSuccess } from '../actions/ajaxActions';

/**
 * App component
 */
class App extends React.Component {
  /**
   * constructor
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
      if (!request.success && request.msg) {
        toastr.error(request.msg, 'Error', { ...toastrConfig });
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
              else redirect user to the landing page where
              user can login or signup
   */
  onAuthenticated(Component, match) {
    const { authenticated } = this.props.auth;
    const searchTerm = match.location.search.replace('?q=', '');
    return authenticated ? (
      <div>
        <Navbar {...match} />
        <SecondaryNavBar
          {...match}
          initialSearchTerm={searchTerm}
          handleChange={
            value => this.handleRecipeSearch(match.history.push, value)
          }
        />
        <Component {...match} searchTerm={searchTerm} />
      </div>
    ) : <Redirect to="/" />;
  }

  /**
   * checks if user is logged in
   * @return {undefined}
   * @param {jsx} Component
   * @param {object} match
   */
  isLoggedIn(Component, match) {
    const pathname = match.location.pathname;
    const validPaths = ['/', '/create-account', '/login'];

    if (!validPaths.includes(pathname)) {
      return (<Redirect to="/not-found" />);
    }

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
   * handle recipe search
   * @param {object} push
   * @param {string} value
   * @return {undefined}
   */
  handleRecipeSearch = (push, value) => {
    const trimmedValue = value && value.trim();
    if (trimmedValue) {
      return push(`/recipes?q=${trimmedValue}`);
    }
    push('/recipes');
  }


  /**
   * render not found
   * @return {undefined}
   * @param {object} match
   */
  renderNotFound = match => (
    <div>
      <Navbar {...match} />
      <SecondaryNavBar
        {...match}
        handleChange={
          value => this.handleRecipeSearch(match.history.push, value)
        }
      />
      <div className="not-found-wrapper">
        <NotFound message="page not found" />
      </div>
    </div>
  )

  /**
   * @return {React} react component
   */
  render() {
    return (
      <BrowserRouter>
        <div className="container-fluid  no-padding">
          <Switch>
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
};

const mapStateToProps = state => ({
  request: state.networkRequest,
  auth: state.auth,
  user: state.user,
});

export default connect(mapStateToProps, {
  resetReqCount,
  getProfile: getUserProfile,
  resetMessage: resetSuccess
})(App);
