import React from 'react';
import PropTypes from 'prop-types';
import Direction from './direction';

const Directions = (props) => {
  const directions = props.directions || [];
  return (
    <div className="col-12 directions-list-wrapper">
      <h5 className="display-4">Directions </h5>
      {directions.map((item, i) =>
        (<Direction
          key={item + Date.now().toString()}
          content={item}
          index={i}
        />)
      )}
    </div>
  );
};

Directions.propTypes = {
  directions: PropTypes.arrayOf(PropTypes.string).isRequired,
};
export default Directions;
