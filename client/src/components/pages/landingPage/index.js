import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createAccount, login } from '../../../actions/userActions';
import Navbar from '../../common/navbar/navbar';
import Modal from '../../common/modal/modal';
import LoginForm from '../../common/form/loginForm';
import RegForm from '../../common/form/regForm';
import Carousel from './carousel/carousel';
import Cta from './cta/cta';


const LandingPage = (props) => (
  <div>
    <Navbar />
    <Carousel >
      <Cta />
    </Carousel>
    <Modal id="loginModal" center rightBtnText="Login" title="Login">
      <LoginForm login={props.actions.loginAction} />
    </Modal>
    <Modal id="regModal" center rightBtnText="Create account" title="Create account">
      <RegForm signup={props.actions.signupAction} />
    </Modal>
  </div>
);

LandingPage.propTypes = {
  actions: PropTypes.object,
};

const mapDispatchToProps = (dispatch) => (
  {
    actions: {
      loginAction: bindActionCreators(login, dispatch),
      signupAction: bindActionCreators(createAccount, dispatch)
    },
  }
);

// const mapStateToProps = (state) => (
//   { user: state.user }

// );

export default connect(null, mapDispatchToProps)(LandingPage);
