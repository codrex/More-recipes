import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import abbr from '../../../../utils/nameAbbr/nameAbbr';

const Comment = props => (
  <div className="media-object comment">
    <div className="avatar avatar-sm">{abbr(props.fullname)}</div>
    <div className="media-body">
      <div className="d-flex justify-content-between align-items-center">
        <h1>
          {`@${props.username}`}
        </h1>
        <span className="text-center bold">
          {moment(props.createdAt).fromNow()}
        </span>
      </div>
      {/* <h6 className="text-dark lead">{`@${props.username}`}</h6> */}
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

const Comments = (props) => {
  const { comments } = props;
  return (
    <div className="col-12">
      {comments.map(({
        id,
        Reviewer,
        review,
        createdAt
      }, i) => (<Comment
        key={id}
        review={review}
        createdAt={createdAt}
        fullname={Reviewer.fullname}
        username={Reviewer.username}
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
  comments: PropTypes.arrayOf(PropTypes.shape),
};

export default Comments;
