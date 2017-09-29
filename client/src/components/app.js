import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import LandingPage from './pages/landingPage/index';
import AddRecipePage from './pages/addRecipePage/index';
import Navbar from '../components/common/navbar/navbar';
import toastr from 'toastr';
import toastrConfig from '../toastr/config';
import { loginOrRegSuccess } from '../actions/userActions';

/**
 * App component
 */
class App extends React.Component {

  /**
   * @return{undefined}
   */
  render() {
    const { error } = this.props.reqError;
    const { success } = this.props.reqSuccess;

    error && !this.props.loading && toastr.error(error, 'Error', toastrConfig);
    success && !this.props.loading && toastr.success(success, '', toastrConfig);

    return (
      <BrowserRouter>
        <div className="container-fluid  no-padding">
          <Navbar />
          <Switch>
            <Route path="/recipe/create" component={AddRecipePage} />
            <Route path="/" component={LandingPage} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  reqError: PropTypes.object,
  reqSuccess: PropTypes.object,
  loading: PropTypes.bool,
};

const mapStateToProps = (state) => (
  {
    loading: state.ajaxCall > 0,
    reqError: state.ajaxError,
    reqSuccess: state.ajaxSuccess
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

