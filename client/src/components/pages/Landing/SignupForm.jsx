import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { email, username, password, fullname } from '../../../utils/validator';
import { Form, Input } from '../../common/FormElements';


/**
 * User registration form
 */
class SignupForm extends React.Component {
  /**
   * constructor
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.signup = this.signup.bind(this);
  }

  /**
   *  signup
   *  @param {object} value (signup form values)
   *  @return {undefined} undefined
  */
  signup(value) {
    return this.props.signup(value);
  }

  /**
   * render
   * @returns {React} react component
   */
  render() {
    const { handleSubmit, submitting } = this.props;
    return (
      <Form
        submitBtnText={submitting ? 'loading...' : 'Register'}
        onSubmit={handleSubmit(this.signup)}
        disabled={submitting}
        secondary
      >
        <Field
          component={Input}
          name="username"
          type="text"
          id="username"
          placeholder="Enter username"
          validate={username}
        />
        <Field
          component={Input}
          name="fullname"
          type="text"
          id="fullname"
          placeholder="Enter fullname"
          validate={fullname}
        />
        <Field
          component={Input}
          name="email"
          type="email"
          id="email"
          placeholder="Enter email"
          validate={email}
        />
        <Field
          component={Input}
          name="password"
          type="password"
          id="password"
          placeholder="Enter password"
          validate={password}
        />
      </Form>
    );
  }
}

SignupForm.propTypes = {
  signup: PropTypes.func,
  handleSubmit: PropTypes.func,
  submitting: PropTypes.bool
};

SignupForm.defaultProps = {
  signup: () => {},
  handleSubmit: () => {},
  submitting: false
};

export { SignupForm as PureSignupForm };
export default reduxForm({
  form: 'RegForm',
})(SignupForm);
