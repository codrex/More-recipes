import React from 'react';
import { Form, Input } from './form';

/**
 * Edit user profile form
 */
class EditProfileForm extends React.Component {
  /**
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.state = {
      fullname: '',
      username: '',
      email: ''
    };
    this.handelEmailChange = this.handelEmailChange.bind(this);
    this.handelFullnameChange = this.handelFullnameChange.bind(this);
    this.handelUsernameChange = this.handelUsernameChange.bind(this);
  }

  /** changes the state.fullname
   * @param {e} e  event object
   * @return {undefined} undefined
  */
  handelFullnameChange(e) {
    this.setState({ fullname: e.target.value });
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
      <Form submitBtnText="Update">
        <Input
          type="text"
          id="fullname"
          placeholder="Firstname"
          value={this.state.fullname}
          handleChange={this.handelFullnameChange}
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
          value={this.state.username}
          handleChange={this.handelEmailChange}
        />
      </Form>
    );
  }
}

export default EditProfileForm;
