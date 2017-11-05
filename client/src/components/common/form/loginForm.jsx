import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import Form from './form';
import Input from './input';
import { username, password } from '../../../utils/validator/validator';

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
      <Form
        submitBtnText="Login"
        onSubmit={handleSubmit(this.props.login)}
        disabled={this.props.loading}
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
LoginForm.propTypes = {
  login: PropTypes.func,
  handleSubmit: PropTypes.func,
  loading: PropTypes.bool,
};

export default reduxForm({
  form: 'LoginForm'
})(LoginForm);
