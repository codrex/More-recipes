import React from 'react';
import Button from '../../../common/button/button';
import PropTypes from 'prop-types';

const Cta = props => (
  <div className="cta ">
    <h1
      className=" text-uppercase display-4 col-xs-11 col-sm-10 col-md-8 col-lg-9"
    >
        ​share​ and view ​awesome​ ​and​ ​exciting​ ​​recipes
    </h1>
    <div className="cta-btn-wrapper">
      <Button
        id="login"
        handleClick={() => {
          props.signin();
          props.push('/login');
        }}
        className="btn-primary btn-lg login"
        text="Login"
      />
      <Button
        id="signup"
        className=" btn-secondary btn-lg reg text-white"
        text="Create an account"
        handleClick={() => {
          props.signup();
          props.push('/create-account');
        }}
      />
    </div>
  </div>
);

Cta.propTypes = {
  signin: PropTypes.func.isRequired,
  signup: PropTypes.func.isRequired,
  push: PropTypes.func.isRequired,
};

export default Cta;
