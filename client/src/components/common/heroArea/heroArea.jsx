import React from 'react';
import PropTypes from 'prop-types';

const HeroArea = props => (
  <div className="hero-half backdrop">
    <img src={props.image} alt="heroimage" />
    <h1
      id="display-1"
      className={
        `display-4
          text-capitalize
          col-8
          bold
          text-center
          `
      }
    >
      {props.title}
      {props.children}
    </h1>
  </div>
);

HeroArea.propTypes = {
  image: PropTypes.string,
  title: PropTypes.string,
  children: PropTypes.node
};

HeroArea.defaultProps = {
  image: '',
  title: '',
  children: null
};

export default HeroArea;
