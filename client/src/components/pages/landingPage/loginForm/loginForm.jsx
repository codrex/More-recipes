import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import Form from '../../../common/form/form';
import Input from '../../../common/form/input';
import { username, password } from '../../../../utils/validator/validator';

/**
 * User login form
 */
export class LoginForm extends React.Component {
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
    const { handleSubmit, submitting } = this.props;
    return (
      <Form
        submitBtnText={submitting ? 'loading...' : 'Login'}
        onSubmit={handleSubmit(this.props.login)}
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
  login: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
};

export default reduxForm({
  form: 'LoginForm'
})(LoginForm);
