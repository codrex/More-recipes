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

 /**
   *  landing page
   */
class LandingPage extends React.Component {
   /**
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.state = {
      modalActive: false,
    };
    this.modalActiveChanged = this.modalActiveChanged.bind(this);
  }

  /**
   * @return {undefined}
   */
  modalActiveChanged() {
    this.setState({ modalActive: !this.modalActive });
  }

  /**
   * @return {object} landing page
   */
  render() {
    return (
      <div>
        <Navbar />
        <Carousel >
          <Cta />
        </Carousel>
        <Modal id="loginModal" center rightBtnText="Login" title="Login">
          <LoginForm login={this.props.actions.loginAction} />
        </Modal>
        <Modal id="regModal" center rightBtnText="Create account" title="Create account">
          <RegForm signup={this.props.actions.signupAction} />
        </Modal>
      </div>
    );
  }
}

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
