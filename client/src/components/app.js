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

/**
 * App component
 */
class App extends React.Component {

  /**
   * @return {bool} true or false
   * @param {Object} nextProps
   */
  shouldComponentUpdate(nextProps) {
    if (nextProps.reqError !== this.props.reqError && nextProps.reqError.error) {
      toastr.error(nextProps.reqError, 'Error', toastrConfig);
    } else if (nextProps.reqSuccess !== this.props.reqSuccess && nextProps.reqSuccess.success) {
      toastr.success(nextProps.reqSuccess, 'Success', toastrConfig);
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
            <Route path="/" component={LandingPage} />
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

