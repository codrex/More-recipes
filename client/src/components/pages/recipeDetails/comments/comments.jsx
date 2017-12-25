import React from 'react';
import PropTypes from 'prop-types';
import NotFound from '../../../common/notFound';
import Comment from './comment';
import Loader from '../../../common/loader';

const Comments = (props) => {
  const { comments, isLoading } = props;
  return (
    <div className="col-12 " style={{ minHeight: '63vh' }}>
      {comments.map(({
        id,
        reviewer,
        review,
        createdAt
      }, i) => (
        <Comment
          key={id}
          review={review}
          createdAt={createdAt}
          fullname={reviewer.fullname}
          username={reviewer.username}
          index={i}
        />
      )
      )}
      {comments.length === 0 && !isLoading &&
        <NotFound message="no review found" />
      }
      { isLoading && <Loader loading={isLoading} />
      }
    </div>
  );
};

Comments.defaultProps = {
  comments: [],
  createdAt: '',
  isLoading: true
};
Comments.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.shape),
  createdAt: PropTypes.string,
  isLoading: PropTypes.bool,
};

export default Comments;
