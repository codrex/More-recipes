import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import LandingPage from './pages/landingPage/index';
import AddRecipePage from './pages/addRecipePage/index';
import Navbar from '../components/common/navbar/navbar';
import toastr from 'toastr';
import toastrConfig from '../toastr/config';
import { resetReqCount } from '../actions/ajaxActions';
import Recipes from '../components/pages/dashboard/dashboard';
import Recipe from '../components/pages/viewRecipePage/recipe';
import ProfilePage from '../components/pages/ProfilePage/index';

/**
 * App component
 */
class App extends React.Component {
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
   * @return{undefined}
   */
  render() {
    return (
      <BrowserRouter>
        <div className="container-fluid  no-padding">
          <Navbar />
          <Switch>
            <Route path="/recipe/create" component={AddRecipePage} />
            <Route path="/recipe/modify/:id" component={AddRecipePage} />
            <Route path="/recipe/:id" component={Recipe} />
            <Route static extact path="/recipes/" component={Recipes} />
            <Route path="/user" component={ProfilePage} />
            <Route static extact path="/" component={LandingPage} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  resetReqCount: PropTypes.func,
  token: PropTypes.string
};

const mapStateToProps = state => ({
  request: state.networkRequest
});

export default connect(mapStateToProps, {
  resetReqCount
})(App);
