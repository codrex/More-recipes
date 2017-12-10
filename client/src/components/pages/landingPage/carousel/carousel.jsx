import React from 'react';
import PropTypes from 'prop-types';

const pixTwo = 'https://res.cloudinary.com/resycom/image/upload/c_scale,q_57,w_2057/v1509718828/eaters-collective-172257_qxlazk.jpg';
const pixOne = 'https://res.cloudinary.com/resycom/image/upload/c_scale,q_53,w_2543/v1509718851/eaters-collective-132773_izkarh.jpg';

const Carousel = props => (
  <div id="carousel" className={`carousel slide ${props.className}`} data-ride="carousel">
    <ol className="carousel-indicators">
      <li data-target="#carousel" data-slide-to="0" className="active" />
      <li data-target="#carousel" data-slide-to="1" />
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

Carousel.defaultProps = {
  className: ''
};

Carousel.propTypes = {
  children: PropTypes.objectOf(PropTypes.shape).isRequired,
  className: PropTypes.string,
};

export default Carousel;
