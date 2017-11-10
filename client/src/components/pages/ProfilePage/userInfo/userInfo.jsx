import React from 'react';
import PropTypes from 'prop-types';
import nameAbbr from '../../../../utils/nameAbbr/nameAbbr';
import Button from '../../../common/button/button';


const UserInfo = (props) => {
  const abbr = nameAbbr(props.user.fullname).toUpperCase();
  return (
    <div className="info-wrapper mr-auto d-flex flex-column ">
      <div className=" d-flex justify-content-around flex-column align-items-center">
        <div className="avatar avatar-md">{abbr}</div>
        <h3 className=" text-capitalize s-padding no-margin ">{props.user.fullname}</h3>
      </div>
      <div className="d-flex no-margin flex-column align-items-center justify-content-center info">
        <li className="info-item">{props.user.email}</li>
        <li className="info-item">{`@${props.user.username}`}</li>
      </div>
      <Button
        type="button"
        className=" btn-lg center-margin edit-btn btn-secondary"
        dataToggle="modal"
        dataTarget="#modal"
        text="edit profile"
        handleClick={() => props.editBtnClicked('Update profile')}

      />
    </div>
  );
};

UserInfo.propTypes = {
  user: PropTypes.object,
  editBtnClicked: PropTypes.func,
};

export default UserInfo;
