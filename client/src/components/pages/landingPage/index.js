import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { userSignup, userLogin } from '../../../actions/userActions';
import Modal from '../../common/modal/modal';
import LoginForm from '../../common/form/loginForm';
import RegForm from '../../common/form/regForm';
import Carousel from './carousel/carousel';
import Cta from './cta/cta';
import Loader from '../../common/preloader/loader';


/**
 * Landing page with signin and signup forms
 */
class LandingPage extends React.Component {
/**
 *
 * @param {object} props
 */
  constructor(props) {
    super(props);
    this.state = {
      signin: false,
      signup: false,
      modalTitle: '',
    };
    this.signin = this.signin.bind(this);
    this.signup = this.signup.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }
  /**
   * @return {undfined} undefined
   */
  signin() {
    this.setState({
      signin: true,
      signup: false,
      modalTitle: 'Login'
    });
  }

  /**
   * @return {undfined} undefined
   */
  signup() {
    this.setState({
      signin: false,
      signup: true,
      modalTitle: 'Create account'
    });
  }

  /**
   * @return {undfined} undefined
   */
  closeModal() {
    this.setState({
      signin: false,
      signup: false,
      modalTitle: ''
    });
  }


  /**
   * @return {object} object
   */
  render() {
    return (
      <div>
        <Carousel >
          <Cta signin={this.signin} signup={this.signup} />
        </Carousel>
        <Modal
          id="loginModal"
          center
          rightBtnText="Login"
          title={this.state.modalTitle}
          closeBtnClicked={this.closeModal}
        >
          {
            this.state.signin &&
              <LoginForm
                login={this.props.actions.loginAction}
                loading={this.props.loading}
              />
          }
         {
           this.state.signup &&
             <RegForm
               signup={this.props.actions.signupAction}
               loading={this.props.loading}
             />
          }

          <Loader loading={this.props.loading} />
        </Modal>
      </div>
      );
  }
}


LandingPage.propTypes = {
  actions: PropTypes.object,
  loading: PropTypes.bool,
};

const mapDispatchToProps = (dispatch) => (
  {
    actions: {
      loginAction: bindActionCreators(userLogin, dispatch),
      signupAction: bindActionCreators(userSignup, dispatch),
    },
  }
);

const mapStateToProps = (state) => (
  {
    loading: state.ajaxCall > 0,
  }

);

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);
