import React from 'react';
import PropTypes from 'prop-types';
import getInitials from '../../../../utils/getInitials';
import Button from '../../../common/button';


const UserInfo = (props) => {
  const initials = getInitials(props.user.fullname).toUpperCase();
  return (
    <div className="info-wrapper mr-auto d-flex flex-column col-xs-12 col-sm-10 col-md-8 col-lg-6">
      <div className=" d-flex justify-content-around flex-column align-items-center">
        <div className="avatar avatar-md">{initials}</div>
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
        id="editProfile"
        handleClick={() => props.editBtnClicked('Update profile')}

      />
    </div>
  );
};

UserInfo.propTypes = {
  user: PropTypes.objectOf(PropTypes.shape).isRequired,
  editBtnClicked: PropTypes.func.isRequired,
};

export default UserInfo;
