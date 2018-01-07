import React from 'react';
import PropTypes from 'prop-types';
import {
  CAROUSEL_PIX_ONE,
  CAROUSEL_PIX_TWO
} from '../../../constants';

/**
 * Carousel component
 * @param {object} props
 * @return {React} react element
 */
const Carousel = props => (
  <div id="carousel" className={`carousel slide ${props.className}`} data-ride="carousel">
    <ol className="carousel-indicators">
      <li data-target="#carousel" data-slide-to="0" className="active" />
      <li data-target="#carousel" data-slide-to="1" />
    </ol>
    <div className="carousel-inner hero">
      <div className="carousel-item backdrop active">
        <img className="d-block img-fluid" src={CAROUSEL_PIX_ONE} alt="First slide" />
      </div>
      <div className="carousel-item backdrop">
        <img className="d-block img-fluid" src={CAROUSEL_PIX_TWO} alt="First slide" />
      </div>
      {props.children}
    </div>
  </div>
);

Carousel.defaultProps = {
  className: ''
};

Carousel.propTypes = {
  children: PropTypes.objectOf(PropTypes.shape).isRequired,
  className: PropTypes.string,
};

export default Carousel;
