import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import Form from '../../../common/form/form';
import Textarea from '../../../common/form/textarea';
import { postReview } from '../../../../actions/recipeActions';
import { resetSuccess } from '../../../../actions/ajaxActions';
import { review } from '../../../../utils/validator/validator';

/**
 * review form
 */
class CommentForm extends React.Component {
  /**
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.review = this.review.bind(this);
  }
  /**
   * @return {undefined}
   * @param {object} nextProps
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.message === 'Review posted' && nextProps.success) {
      this.props.reset();
      this.props.resetSuccess();
    }
  }
  /**
    * @param {object} value (form values)
   * @return {undefined} undefined
  */
  review(value) {
    return this.props.postReview(this.props.id, value, 'Review posted');
  }

  /**
   * @returns {object} the form
   */
  render() {
    const { handleSubmit, submitting } = this.props;
    return (
      <Form
        submitBtnText={(!submitting && 'Post review') || 'Loading...'}
        onSubmit={handleSubmit(this.review)}
        secondary
        disabled={submitting}
      >
        <Field
          component={Textarea}
          name="review"
          id="review"
          placeholder="Enter your review"
          validate={review}
        />
      </Form>
    );
  }
}
CommentForm.propTypes = {
  postReview: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool,
  id: PropTypes.number,
  reset: PropTypes.func,
  clearSuccessMsg: PropTypes.func,
  success: PropTypes.bool.isRequired,
  resetSuccess: PropTypes.func.isRequired,
  message: PropTypes.string,
};

const mapStateToProps = (state) => (
  {
    success: state.networkRequest.success,
    message: state.networkRequest.message,
  }
);

export default reduxForm({
  form: 'reviewForm'
})(connect(mapStateToProps, {
  postReview,
  resetSuccess
})(CommentForm));
