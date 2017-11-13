import React from 'react';
import PropTypes from 'prop-types';
import abbr from '../../../../utils/nameAbbr/nameAbbr';

const Comment = props => (
  <div className="media-object comment">
    <div className="avatar avatar-sm">{abbr(props.fullname)}</div>
    <div className="media-body">
      <h1>{props.fullname}</h1>
      <h6 className="text-dark lead">{`@${props.username}`}</h6>
      <p className="media-text no-margin">
        {props.review}
      </p>
    </div>
  </div>
);

Comment.propTypes = {
  review: PropTypes.string.isRequired,
  fullname: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
};

const Comments = props => {
  const comments = props.comments;
  return (
    <div className="col-12">
      {comments.map((comment, i) => (<Comment
        key={i}
        review={comment.review}
        fullname={comment.Reviewer.fullname}
        username={comment.Reviewer.username}
        index={i}
      />)
      )}
      {comments.length === 0 &&
        <h1 className="text-uppercase display-4 msg-display no-comment no-margin">
          Sorry..<br />this recipe have no review.
        </h1>
      }
    </div>
  );
};

Comments.defaultProps = {
  comments: []
};
Comments.propTypes = {
  comments: PropTypes.array,
};

export default Comments;
