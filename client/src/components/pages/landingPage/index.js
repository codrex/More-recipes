import React from 'react';
import Navbar from '../../common/navbar/navbar';
import Modal from '../../common/modal/modal';
import LoginForm from '../../common/form/loginForm';
import RegForm from '../../common/form/regForm';
import Carousel from './carousel/carousel';
import Cta from './cta/cta';


const LandingPage = () => (
  <div>
    <Navbar />
    <Carousel >
      <Cta />
    </Carousel>
    <Modal id="loginModal" center rightBtnText="Login" title="Login">
      <LoginForm />
    </Modal>
    <Modal id="regModal" center rightBtnText="Create account" title="Create account">
      <RegForm />
    </Modal>
  </div>
);


export default LandingPage;
