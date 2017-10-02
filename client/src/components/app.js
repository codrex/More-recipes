import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import LandingPage from './pages/landingPage/index';
import AddRecipePage from './pages/addRecipePage/index';
import Navbar from '../components/common/navbar/navbar';
import Loader from '../components/common/preloader/loader';
import toastr from 'toastr';
import toastrConfig from '../toastr/config';
import { loginOrRegSuccess } from '../actions/userActions';
import Recipes from '../components/pages/recipesPage/recipesPage';
import Recipe from '../components/pages/viewRecipePage/recipe';

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
    if (nextProps.reqError !== this.props.reqError && nextProps.reqError.error) {
      toastr.error(nextProps.reqError.error, 'Error', toastrConfig);
    } else if (nextProps.reqSuccess !== this.props.reqSuccess && nextProps.reqSuccess.success) {
      toastr.success(nextProps.reqSuccess.success, 'Success', toastrConfig);
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
            <Route exact path="/recipe/create" component={AddRecipePage} />
            <Route exact path="/recipe/:id" component={Recipe} />
            <Route exact path="/recipes" component={Recipes} />
            <Route exact path="/" component={LandingPage} />
          </Switch>
          <Loader loading={this.props.loading} />

        </div>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  reqError: PropTypes.object,
  reqSuccess: PropTypes.object,
  loading: PropTypes.bool,
  token: PropTypes.string,
};

const mapStateToProps = (state) => (
  {
    loading: state.ajaxCall > 0,
    reqError: state.ajaxError,
    reqSuccess: state.ajaxSuccess,
    token: state.token,
  }

);

const mapDispatchToProps = (dispatch) => (
  {
    actions: {
      loginOrRegSuccess: bindActionCreators(loginOrRegSuccess, dispatch)
    }
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(App);

