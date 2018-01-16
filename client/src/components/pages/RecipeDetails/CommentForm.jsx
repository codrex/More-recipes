import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Form, Textarea } from '../../common/FormElements';
import { postReview } from '../../../actions/recipeActions';
import { resetSuccess } from '../../../actions/ajaxActions';
import { review } from '../../../utils/validator';
import { REVIEW_MESSAGE } from '../../../constants';

/**
 * review form
 */
class CommentForm extends React.Component {
  /**
   * constructor
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
    if (nextProps.success) {
      this.props.initialize();
      this.props.resetSuccess();
    }
  }
  /**
   * send review
   * @param {object} value (form values)
   * @return {undefined} undefined
  */
  review(value) {
    return this.props.postReview(this.props.id, value, REVIEW_MESSAGE);
  }

  /**
   * render
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
          row="4"
        />
      </Form>
    );
  }
}

CommentForm.propTypes = {
  postReview: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  id: PropTypes.number.isRequired,
  initialize: PropTypes.func.isRequired,
  success: PropTypes.bool.isRequired,
  resetSuccess: PropTypes.func.isRequired,
};

const mapStateToProps = state => (
  {
    success: state.networkRequest.success,
    message: state.networkRequest.message,
  }
);

export { CommentForm as PureCommentForm };
export default reduxForm({
  form: 'reviewForm'
})(connect(mapStateToProps, {
  postReview,
  resetSuccess
})(CommentForm));
