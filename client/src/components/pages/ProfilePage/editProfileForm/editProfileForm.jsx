import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { fullname, email, username } from '../../../../utils/validator/validator';
import Form from '../../../common/form/form';
import Input from '../../../common/form/input';


let EditProfile = (props) => {
  const { handleSubmit } = props;
  return (
    <Form
      submitBtnText={props.submitting ? 'Updating...' : 'Update'}
      onSubmit={handleSubmit(props.update)}
      secondary
      disabled={props.submitting}
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
  submitting: PropTypes.bool,
};

const mapStateToProps = state => ({
  initialValues: state.user
});

EditProfile = reduxForm({
  form: 'editProfileForm',
})(EditProfile);

const EditProfileForm = connect(mapStateToProps)(EditProfile);


export default EditProfileForm;
