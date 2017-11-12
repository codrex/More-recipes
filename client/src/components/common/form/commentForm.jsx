import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import Form from './form';
import Textarea from './textarea';
import { postReview } from '../../../actions/recipeActions';
import { ajaxRequestSuccess } from '../../../actions/ajaxActions';
import { review } from '../../../utils/validator/validator';

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
    if (nextProps.success.success === 'Review posted') {
      this.props.reset();
      this.props.clearSuccessMsg({ success: undefined });
    }
  }
  /**
    * @param {object} value (form values)
   * @return {undefined} undefined
  */
  review(value) {
    this.props.postReview(this.props.id, value, 'Review posted');
  }

  /**
   * @returns {object} the form
   */
  render() {
    const { handleSubmit } = this.props;
    return (
      <Form
        submitBtnText={(!this.props.loading && 'Post review') || 'Loading...'}
        onSubmit={handleSubmit(this.review)}
        secondary
        disabled={this.props.submitting}
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
  postReview: PropTypes.func,
  handleSubmit: PropTypes.func,
  submitting: PropTypes.bool,
  id: PropTypes.number,
  reset: PropTypes.func,
  clearSuccessMsg: PropTypes.func,
  success: PropTypes.object,
};

const mapDispatchToProps = dispatch => ({
  postReview: bindActionCreators(postReview, dispatch),
  clearSuccessMsg: bindActionCreators(ajaxRequestSuccess, dispatch),
});

const mapStateToProps = (state) => (
  {
    success: state.ajaxSuccess,
  }
);

export default reduxForm({
  form: 'reviewForm'
})(connect(mapStateToProps, mapDispatchToProps)(CommentForm));
