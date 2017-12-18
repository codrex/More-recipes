import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import toastr from 'toastr';
import LandingPage from './pages/landingPage/landingPage';
import AddRecipePage from './pages/addRecipePage/addRecipePage';
import Navbar from '../components/common/navbar/navbar';
import TopBar from '../components/common/topbar/topbar';
import toastrConfig from '../toastr/config';
import { resetReqCount } from '../actions/ajaxActions';
import Recipes from '../components/pages/recipes/recipes';
import Recipe from '../components/pages/viewRecipePage/recipe';
import ProfilePage from '../components/pages/ProfilePage/index';
import Footer from '../components/common/footer/footer';
import NotFound from '../components/pages/notFound/notFound';
import { getUserProfile } from '../actions/userActions';

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
    if (request.requestCount > 0) {
      toastr.clear();
      if (!request.success) {
        toastr.error(request.msg, 'Error', toastrConfig);
      } else if (request.success && request.msg) {
        toastr.success(request.msg, 'Success', toastrConfig);
      }
      this.props.resetReqCount();
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
        <TopBar {...match} />
        <Component {...match} />
      </div>
    ) : <Redirect to="/" />;
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
      <TopBar {...match} />
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
              path="/create"
              extact
              render={match => this.onAuthenticated(AddRecipePage, match)}
            />
            <Route
              static
              path="/modify/:id"
              extact
              render={match => this.onAuthenticated(AddRecipePage, match)}
            />
            <Route
              static
              path="/recipe/:id"
              extact
              render={match => this.onAuthenticated(Recipe, match)}
            />
            <Route
              static
              extact
              path="/recipes"
              render={match => this.onAuthenticated(Recipes, match)}
            />
            <Route
              path="/user"
              render={match => this.onAuthenticated(ProfilePage, match)}
            />
            <Route
              static
              extact
              path="/login"
              render={match => this.isLoggedIn(LandingPage, match)}
            />
            <Route
              static
              extact
              path="/create-account"
              render={match => this.isLoggedIn(LandingPage, match)}
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
              render={match => this.isLoggedIn(LandingPage, match)}
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
  user: PropTypes.objectOf(PropTypes.shape).isRequired,
  resetReqCount: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  request: state.networkRequest,
  auth: state.auth,
  user: state.user
});

export default connect(mapStateToProps, {
  resetReqCount,
  getProfile: getUserProfile
})(App);
