import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { userSignup, userLogin } from '../../../actions/userActions';
import Modal from '../../common/modal/modal';
import LoginForm from './loginForm/loginForm';
import SignupForm from './signupForm/signupForm';
import Carousel from './carousel/carousel';
import Cta from './cta/cta';

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
 *
 * @param {object} nextProps
 * @return {bool} true or false
 */
  shouldComponentUpdate(nextProps) {
    const { authenticated, redirectTo } = nextProps.auth;
    if (authenticated && nextProps.auth !== this.props.auth) {
      this.props.history.push(redirectTo);
    }
    return true;
  }

  /**
 * operations carried after login
 * @param {object} actions
 * @return {undefined}
 */
  afterLogin(actions) {
    this.props.actions.redirect('');
    setTimeout(() => {
    // endSuccess is an action creator that
    // ajaxSuccess value in the store to an empty array
      actions.endSuccess();
    }, 1000);
  }

  /**
   * @return {undfined} undefined
   */
  signin() {
    const { authenticated, redirectTo } = this.props.auth;
    if (authenticated) {
      this.props.history.push(redirectTo);
      return;
    }
    this.setState({
      signin: true,
      signup: false,
      modalTitle: 'Log in to your account'
    });
  }

  /**
   * @return {undfined} undefined
   */
  signup() {
    this.setState({
      signin: false,
      signup: true,
      modalTitle: 'Create an account'
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
    const { loading } = this.props;
    return (
      <div>
        <Carousel className={this.state.modalTitle && 'blur'}>
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
                loading={loading}

              />
          }
         {
           this.state.signup &&
             <SignupForm
               signup={this.props.actions.signupAction}
               loading={loading}
             />
          }
          {this.state.signin &&
            <p className="form-text">
              Don't have an account?
              <b onClick={this.signup}> Sign up</b>
            </p>
          }
          {this.state.signup &&
            <p className="form-text">
              Already have an account?
              <b onClick={this.signin}> Sign in</b>
            </p>
          }
        </Modal>
      </div>
    );
  }
}


LandingPage.propTypes = {
  actions: PropTypes.object,
  success: PropTypes.bool,
  history: PropTypes.object,
  redirectUrl: PropTypes.string,
  token: PropTypes.string,
  redirect: PropTypes.func,
  auth: PropTypes.object,
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
    auth: state.auth,
    loading: state.networkRequest.loading,
  }

);

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);
