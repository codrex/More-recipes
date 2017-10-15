import React from 'react';
import PropTypes from 'prop-types';
import pixOne from '../../../../images/img-4.jpg';
import pixTwo from '../../../../images/img-2.jpg';
import './carousel.scss';

const Carousel = (props) => (
  <div id="carousel" className="carousel slide" data-ride="carousel">
    <ol className="carousel-indicators">
      <li data-target="#carousel" data-slide-to="0" className="active"></li>
      <li data-target="#carousel" data-slide-to="1"></li>
    </ol>
    <div className="carousel-inner hero">
      <div className="carousel-item hero-img-wrapper active">
        <img className="d-block img-fluid" src={pixOne} alt="First slide" />
      </div>
      <div className="carousel-item hero-img-wrapper">
        <img className="d-block img-fluid" src={pixTwo} alt="First slide" />
      </div>
      {props.children}
    </div>
  </div>
);

Carousel.propTypes = {
  children: PropTypes.object,
};

export default Carousel;
