import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Animation from '../../../common/Animation';
import getInitials from '../../../../utils/getInitials';

/**
 * Comment component
 * @param {object} props
 * @return {React} react element
 */
const Comment = props => (
  <Animation>
    <div className="media-object comment">
      <div className="avatar avatar-sm">{getInitials(props.fullname)}</div>
      <div className="media-body">
        <div className="d-flex justify-content-between align-items-center">
          <h4 className="no-margin">
            {`@${props.username}`}
          </h4>
          <span className="text-center bold time">
            {moment(props.createdAt).fromNow()}
          </span>
        </div>
        <p className="media-text no-margin">
          {props.review}
        </p>
      </div>
    </div>
  </Animation>
);

Comment.propTypes = {
  review: PropTypes.string.isRequired,
  fullname: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired
};

export default Comment;

