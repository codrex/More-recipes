import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { email, username, password, fullname } from '../../../../utils/validator/validator';
import Form from '../../../common/form/form';
import Input from '../../../common/form/input';
/**
 * User registration form
 */
class SignupForm extends React.Component {
  /**
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.signup = this.signup.bind(this);
  }

  /**
   *  @param {object} value (signup form values)
   * @return {undefined} undefined
  */
  signup(value) {
    return this.props.signup(value);
  }

  /**
   * @returns {object} form
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

export default reduxForm({
  form: 'RegForm',
})(SignupForm);
