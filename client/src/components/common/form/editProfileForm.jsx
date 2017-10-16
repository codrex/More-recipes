import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { fullname, email, username } from '../../../utils/validator/validator';
import Form from './form';
import Input from './input';


let EditProfile = (props) => {
  const { handleSubmit } = props;
  return (
    <Form
      submitBtnText={props.loading && 'Updating...' || 'Update'}
      onSubmit={handleSubmit(props.update)}
      secondary
      disabled={props.loading}
    >
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
    </Form>
  );
};

EditProfile.propTypes = {
  update: PropTypes.func,
  handleSubmit: PropTypes.func,
  loading: PropTypes.bool,
};

const mapStateToProps = (state) => ({ initialValues: state.user });

EditProfile = reduxForm({
  form: 'editProfileForm',
})(EditProfile);

const EditProfileForm = connect(mapStateToProps)(EditProfile);


export default EditProfileForm;
