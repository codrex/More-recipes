import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { userSignup, userLogin, loginOrRegSuccess } from '../../../actions/userActions';
import Modal from '../../common/modal/modal';
import LoginForm from '../../common/form/loginForm';
import RegForm from '../../common/form/regForm';
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
    if (this.props === nextProps) {
      return true;
    }
    const { redirectUrl, success, actions } = nextProps;
    if (success && !redirectUrl) {
      localStorage.setItem('MRAToken', this.props.token);
      this.props.history.push('/recipe/create');

      document.getElementsByClassName('modal-backdrop')[0].remove();
      document.getElementsByTagName('body')[0].className = ' ';
      setTimeout(() => {
        actions.endSuccess();
      }, 1000);
      return false;
    } else if (success && redirectUrl) {
      // this.props.redirect('');
      // this.props.history.push(redirectUrl);
      // return false;
    } else return true;
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
              />
          }
         {
           this.state.signup &&
             <RegForm
               signup={this.props.actions.signupAction}
             />
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
};

const mapDispatchToProps = (dispatch) => (
  {
    actions: {
      loginAction: bindActionCreators(userLogin, dispatch),
      signupAction: bindActionCreators(userSignup, dispatch),
      endSuccess: bindActionCreators(loginOrRegSuccess, dispatch)

    },
  }
);

const mapStateToProps = (state) => (
  {
    success: state.ajaxSuccess.success ? true : false,
    redirectUrl: state.redirectUrl,
    token: state.user.token,
  }

);

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);
