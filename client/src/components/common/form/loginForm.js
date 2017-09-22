import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { Form, Input } from './form';
import { validateLogin } from '../../../validator/validator';

/**
 * User login form
 */
class LoginForm extends React.Component {
  /**
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
  }
   /**
    * @param {object} value (form values)
   * @return {undefined} undefined
  */
  login(value) {
    this.props.login(value);
  }

  /**
   * @returns {object} the form
   */
  render() {
    const { handleSubmit } = this.props;
    return (
      <Form submitBtnText="Login" onSubmit={handleSubmit(this.login)}>
        <Field
          component={Input}
          name="username"
          type="text"
          id="username"
          placeholder="Enter username"
        />
        <Field
          component={Input}
          name="password"
          type="password"
          id="password"
          placeholder="Enter password"
        />
      </Form>
    );
  }
}
LoginForm.propTypes = {
  login: PropTypes.func,
  handleSubmit: PropTypes.func,
};

export default reduxForm({
  validate: validateLogin,
  form: 'LoginForm'
})(LoginForm);
