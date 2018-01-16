import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { fullname, email, username } from '../../../utils/validator';
import { Form, Input } from '../../common/FormElements';

/**
 * EditProfile component
 * @param {object} props
 * @return {React} react element
 */
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
  update: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  initialValues: state.user
});
const PureEditProfileForm = EditProfile;
export { PureEditProfileForm };

EditProfile = reduxForm({
  form: 'editProfileForm',
})(EditProfile);


const EditProfileForm = connect(mapStateToProps)(EditProfile);

export default EditProfileForm;
