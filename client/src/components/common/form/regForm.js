import React from 'react';
import { Form, Input } from './form';

/**
 * User registration form
 */
class RegForm extends React.Component {
  /**
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      reEnterPassword: '',
      fullname: ''
    };
    this.handelEmailChange = this.handelEmailChange.bind(this);
    this.handelPasswordChange = this.handelPasswordChange.bind(this);
    this.handelReEnterPasswordChange = this.handelReEnterPasswordChange.bind(this);
    this.handelUsernameChange = this.handelUsernameChange.bind(this);
    this.handleFullnameChange = this.handleFullnameChange.bind(this);
  }

   /** changes the state.fullname
   * @param {e} e  event object
   * @return {undefined} undefined
  */
  handleFullnameChange(e) {
    this.setState({ fullname: e.target.value });
  }

  /** changes the state.password
   * @param {e} e  event object
   * @return {undefined} undefined
  */
  handelPasswordChange(e) {
    this.setState({ password: e.target.value });
  }

   /** changes the state.reEnterPassword
   * @param {e} e  event object
   * @return {undefined} undefined
  */
  handelReEnterPasswordChange(e) {
    this.setState({ reEnterPassword: e.target.value });
  }

  /** changes the state.email
   * @param {e} e  event object
   * @return {undefined} undefined
  */
  handelEmailChange(e) {
    this.setState({ email: e.target.value });
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
          id="fullname"
          placeholder="Fullname"
          value={this.state.fullname}
          handleChange={this.handleFullnameChange}
        />
        <Input
          type="text"
          id="username"
          placeholder="Username"
          value={this.state.username}
          handleChange={this.handelUsernameChange}
        />
        <Input
          type="email"
          id="email"
          placeholder="Email"
          value={this.state.email}
          handleChange={this.handelEmailChange}
        />
        <Input
          type="password"
          id="password"
          placeholder="Password"
          value={this.state.password}
          handleChange={this.handelPasswordChange}
        />
        <Input
          type="password"
          id="password"
          placeholder="Re-enter password"
          value={this.state.reEnterPassword}
          handleChange={this.handelReEnterPasswordChange}
        />
      </Form>
    );
  }
}

export default RegForm;
