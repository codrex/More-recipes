import React from 'react';
import Button from '../../../common/button/button';
import PropTypes from 'prop-types';
import './cta.scss';

const Cta = props => (
  <div className="cta ">
    <h1
      className=" text-uppercase display-4 col-xs-11 col-sm-10 col-md-8 col-lg-9"
    >
        ​share​ and view ​awesome​ ​and​ ​exciting​ ​​recipes
    </h1>
    <div className="cta-btn-wrapper">
      <Button
        className="btn-primary btn-lg login"
        text="Login"
        dataToggle="modal"
        dataTarget="#modal"
        handleClick={props.signin}
      />
      <Button
        className=" btn-secondary btn-lg reg text-white"
        text="Create an account"
        dataToggle="modal"
        dataTarget="#modal"
        handleClick={props.signup}
      />
    </div>
  </div>
  );

Cta.propTypes = {
  signin: PropTypes.func,
  signup: PropTypes.func,
};

export default Cta;
