import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import abbr from '../../../../utils/nameAbbr/nameAbbr';
import NotFound from '../../../common/notFound/notFound';

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
    <div className="col-12 ">
      {comments.map(({
        id,
        reviewer,
        review,
        createdAt
      }, i) => (<Comment
        key={id}
        review={review}
        createdAt={createdAt}
        fullname={reviewer.fullname}
        username={reviewer.username}
        index={i}
      />)
      )}
      {comments.length === 0 &&
        <NotFound message="no review found" />
      }
    </div>
  );
};

Comments.defaultProps = {
  comments: [],
  createdAt: ''
};
Comments.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.shape),
  createdAt: PropTypes.string,
};

export default Comments;
