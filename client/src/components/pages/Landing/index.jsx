import React from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { userSignup, userLogin } from '../../../actions/userActions';
import Modal from '../../common/Modal';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import Carousel from './Carousel';
import Cta from './CallToAction';


/**
 * Landing page with signin and signup forms
 */
class Landing extends React.Component {
/**
 * constructor
 * @param {object} props
 */
  constructor(props) {
    super(props);
    this.state = {
      signin: false,
      signup: false,
      formTitle: '',
      openModal: props.match.path !== '/',
    };
    this.signin = this.signin.bind(this);
    this.signup = this.signup.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.modalOpen = this.modalOpen.bind(this);
  }

  /**
   * componentDidMount
   * @return {undefined}
   */
  componentDidMount() {
    const { path } = this.props.match;
    if (this.state.openModal) {
      this.modalOpen(path);
    }
  }

  /**
   * componentWillReceiveProps
   * @param {object} nextProps
   * @return {undefined}
   */
  componentWillReceiveProps(nextProps) {
    const { path } = nextProps.match;

    if (path !== '/') {
      this.modalOpen(path);
    }
  }
  /**
 *
 * @param {object} nextProps
 * @return {bool} true
 * @summary redirect users to other pages after login or signup was successful
 */
  shouldComponentUpdate(nextProps) {
    const { authenticated, redirectTo } = nextProps.auth;
    if (authenticated && nextProps.auth !== this.props.auth) {
      this.props.history.push(redirectTo);
    }
    return true;
  }

  /**
   * @return {undfined} undefined
   */
  signin() {
    this.setState({
      signin: true,
      signup: false,
      formTitle: 'Log in to your account',
    });
  }

  /**
   * @return {undfined} undefined
   */
  signup() {
    this.setState({
      signin: false,
      signup: true,
      formTitle: 'Create an account',
    });
  }

  /**
   * @return {undfined} undefined
   */
  closeModal() {
    const { history } = this.props;
    this.setState({
      signin: false,
      signup: false,
      formTitle: '',
      openModal: '/'
    });
    history.push('/');
  }

  /**
  * @param {string} path
  * @return {undfined} undefined
  */
  modalOpen(path) {
    if (path === '/create-account') {
      this.signup();
    } else if (path === '/login') {
      this.signin();
    }
    const modal = $('div#modal');
    if (modal.modal) modal.modal('show');
  }

  /**
   * render
   * @return {object} object
   */
  render() {
    const { loading, history, actions } = this.props;
    return (
      <div>
        <Carousel className={this.state.formTitle && 'blur'}>
          <Cta
            signin={this.signin}
            signup={this.signup}
            push={history.push}
          />
        </Carousel>
        <Modal
          id="modal"
          center
          rightBtnText="Login"
          title={this.state.formTitle}
          closeBtnClicked={this.closeModal}
          openModal={this.state.openModal}
        >
          {
            this.state.signin &&
              <LoginForm
                login={actions.loginAction}
                loading={loading}
              />
          }
          {
            this.state.signup &&
            <SignupForm
              signup={actions.signupAction}
              loading={loading}
            />
          }
          {this.state.signin &&
            <p className="form-text">
              {"Don't have an account?"}
              <span
                role="button"
                tabIndex="0"
                onClick={() => {
                  this.signup();
                  history.push('/create-account');
                }}
              >
                <b>
                  Sign up
                </b>
              </span>
            </p>
          }
          {this.state.signup &&
            <p className="form-text">
              Already have an account?
              <span
                role="button"
                tabIndex="0"
                onClick={() => {
                  this.signin();
                  history.push('/login');
                }}
              >
                <b >
                  Sign in
                </b>
              </span>
            </p>
          }
        </Modal>
      </div>
    );
  }
}

Landing.propTypes = {
  actions: PropTypes.objectOf(PropTypes.shape).isRequired,
  history: PropTypes.objectOf(PropTypes.shape).isRequired,
  auth: PropTypes.objectOf(PropTypes.shape).isRequired,
  loading: PropTypes.bool.isRequired,
  match: PropTypes.objectOf(PropTypes.shape).isRequired
};

const mapDispatchToProps = dispatch => (
  {
    actions: {
      loginAction: bindActionCreators(userLogin, dispatch),
      signupAction: bindActionCreators(userSignup, dispatch),
    },
  }
);

const mapStateToProps = state => (
  {
    auth: state.auth,
    loading: state.networkRequest.loading,
  }

);
export { Landing as PureLanding };

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
