import React from 'react';
import PropTypes from 'prop-types';
import nameAbbr from '../../../../nameAbbr/nameAbbr';
import Button from '../../../common/button/button';
import './userInfo.scss';

const UserInfo = (props) => {
  const abbr = nameAbbr(props.fullname).toUpperCase();
  return (
    <div className="info-wrapper mr-auto d-flex flex-column">
      <div className=" d-flex justify-content-around flex-column align-items-center">
        <div className="avatar avatar-sm">{abbr}</div>
        <h3 className=" text-capitalize s-padding no-margin ">{props.fullname}</h3>
      </div>
      <div className="d-flex no-margin flex-column align-items-center justify-content-center info">
        <li className="info-item">{props.email}</li>
        <li className="info-item">{props.username}</li>
      </div>
      <Button
        type="button"
        className="btn-secondary btn-lg"
        data-toggle="modal"
        data-target="#editProfile"
        text="edit profile"
      />
    </div>
  );
};

UserInfo.propTypes = {
  email: PropTypes.string,
  username: PropTypes.string,
  fullname: PropTypes.string,
};

export default UserInfo;
