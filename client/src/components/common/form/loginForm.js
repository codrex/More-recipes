import React from 'react';
import { Form, Input } from './form';

/**
 * User login form
 */
class LoginForm extends React.Component {
  /**
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
    this.handelPasswordChange = this.handelPasswordChange.bind(this);
    this.handelUsernameChange = this.handelUsernameChange.bind(this);
  }

  /** changes the state.password
   * @param {e} e  event object
   * @return {undefined} undefined
  */
  handelPasswordChange(e) {
    this.setState({ password: e.target.value });
  }

  /** changes the state.username
   * @param {e} e  event object
   * @return {undefined} undefined
  */
  handelUsernameChange(e) {
    this.setState({ username: e.target.value });
  }

  /**
   * @returns {object} the form
   */
  render() {
    return (
      <Form>
        <Input
          type="text"
          id="username"
          placeholder="Username"
          value={this.state.username}
          handleChange={this.handelUsernameChange}
        />
        <Input
          type="password"
          id="password"
          placeholder="Password"
          value={this.state.password}
          handleChange={this.handelPasswordChange}
        />
      </Form>
    );
  }
}

export default LoginForm;
