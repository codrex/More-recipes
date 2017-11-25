import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import LandingPage from './pages/landingPage/index';
import AddRecipePage from './pages/addRecipePage/index';
import Navbar from '../components/common/navbar/navbar';
import toastr from 'toastr';
import toastrConfig from '../toastr/config';
import { resetReqCount } from '../actions/ajaxActions';
import Recipes from '../components/pages/recipes/recipes';
import Recipe from '../components/pages/viewRecipePage/recipe';
import ProfilePage from '../components/pages/ProfilePage/index';
import Footer from '../components/common/footer/footer';

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
 * @param {object} props
 *
 */
  /**
   * @return {bool} true or false
   * @param {Object} nextProps
   */
  shouldComponentUpdate(nextProps) {
    const { request } = nextProps;
    if (request.requestCount > 0) {
      if (!request.success) {
        toastr.error(request.msg, 'Error', toastrConfig);
      } else if (request.success) {
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
        <Component match={match} />
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
   * @return{undefined}
   */
  render() {
    return (
      <BrowserRouter>
        <div className="container-fluid  no-padding">
          <Switch>
            <Route
              path="/recipe/create"
              render={match => this.onAuthenticated(AddRecipePage, match)}
            />
            <Route
              path="/recipe/modify/:id"
              component={AddRecipePage}
            />
            <Route
              path="/recipe/:id"
              render={match => this.onAuthenticated(Recipe, match)}
            />
            <Route
              static
              extact
              path="/recipes/"
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
              path="/" render={match => this.isLoggedIn(LandingPage, match)}
            />
          </Switch>
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  resetReqCount: PropTypes.func,
  token: PropTypes.string,
  auth: PropTypes.object,
};

const mapStateToProps = state => ({
  request: state.networkRequest,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  resetReqCount
})(App);
