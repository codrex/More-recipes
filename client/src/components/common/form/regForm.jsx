import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { email, username, password } from '../../../utils/validator/validator';
import Form from './form';
import Input from './input';
/**
 * User registration form
 */
class RegForm extends React.Component {
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
    this.props.signup(value);
  }

  /**
   * @returns {object} form
   */
  render() {
    const { handleSubmit } = this.props;
    return (
      <Form
        submitBtnText="Register"
        onSubmit={handleSubmit(this.signup)}
        className={this.props.loading ? 'hide' : ''}
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

RegForm.propTypes = {
  signup: PropTypes.func,
  handleSubmit: PropTypes.func,
  loading: PropTypes.bool

};

export default reduxForm({
  form: 'RegForm',
})(RegForm);
