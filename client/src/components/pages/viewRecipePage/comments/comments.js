import React from 'react';
import PropTypes from 'prop-types';
import './comments.scss';
import nameAbbr from '../../../../nameAbbr/nameAbbr';

const Comment = (props) => {
  const abbrivation = nameAbbr(props.fullname);
  return (
    <div className="media-object comment">
      <div className="avatar avatar-sm">{abbrivation.toUpperCase()}</div>
      <div className="media-body">
        <h1>{props.fullname}</h1>
        <p className="media-text no-margin">
            {props.review}
        </p>
      </div>
    </div>
  );
};
Comment.propTypes = {
  review: PropTypes.string,
  fullname: PropTypes.string,
  loading: PropTypes.string,
};

const Comments = (props) => {
  const comments = props.comments || [];
  return (
    <div className="col-12">
      {comments.map((comment, i) => {
        return (<Comment
          key={i}
          review={comment.review}
          fullname={comment.Reviewer.fullname}
          index={i}
        />); }
      )}
      {comments.length === 0 &&
        <h1 className="text-uppercase msg-display no-comment no-margin">
          Sorry..<br />No review was found.
        </h1>
      }
    </div>
  );
};

Comments.propTypes = {
  comments: PropTypes.array,
};

export default Comments;
