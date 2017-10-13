import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import Form from './form';
import Textarea from './textarea';
import { postReview } from '../../../actions/recipeActions';
import { review } from '../../../validator/validator';

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
    * @param {object} value (form values)
   * @return {undefined} undefined
  */
  review(value) {
    this.props.postReview(this.props.id, value);
  }

  /**
   * @returns {object} the form
   */
  render() {
    const { handleSubmit } = this.props;
    return (
      <Form
        submitBtnText="Post review"
        onSubmit={handleSubmit(this.review)}
        className={this.props.loading ? 'hide' : ''}
        secondary
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
  loading: PropTypes.bool,
  id: PropTypes.number,
};

const mapDispatchToProps = (dispatch) => ({
  postReview: bindActionCreators(postReview, dispatch)
});

export default reduxForm({
  form: 'reviewForm'
})(connect(null, mapDispatchToProps)(CommentForm));
