import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { validateProfileUpdate } from '../../../validator/validator';
import Form from './form';
import Input from './input';


let EditProfile = (props) => {
  const { handleSubmit } = props;
  return (
    <Form
      submitBtnText="Update"
      onSubmit={handleSubmit(props.update)}
      className={props.loading ? 'hide' : ''}
      primary
    >
      <Field
        component={Input}
        name="fullname"
        type="text"
        id="fullname"
        placeholder="Enter fullname"
      />
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
  validate: validateProfileUpdate,
  form: 'editProfileForm',
})(EditProfile);

const EditProfileForm = connect(mapStateToProps)(EditProfile);


export default EditProfileForm;
