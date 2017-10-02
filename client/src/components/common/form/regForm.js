import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { validateSignup } from '../../../validator/validator';
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
    const state = Object.assign({}, value);
    delete state.reEnterPassword;
    this.props.signup(state);
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
        />
        <Field
          component={Input}
          name="email"
          type="email"
          id="email"
          placeholder="Enter email"
        />
        <Field
          component={Input}
          name="password"
          type="password"
          id="password"
          placeholder="Enter password"
        />
        <Field
          component={Input}
          type="password"
          name="reEnterPassword"
          id="reEnterPassword"
          placeholder="Re-enter password"
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
  validate: validateSignup,
  form: 'RegForm',
})(RegForm);
