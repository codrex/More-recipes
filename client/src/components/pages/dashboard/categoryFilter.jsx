import React from 'react';
import PropTypes from 'prop-types';

const CategoryFilterItem = (props) => (
  <li className="cat-link nav-link nav-item text-capitalize">
    {props.name}
  </li>
);

CategoryFilterItem.propTypes = {
  name: PropTypes.string,
};

const CategoryFilter = () => (
  <nav className="nav justify-content-center" style={{ margin: '0 50px' }}>
    <CategoryFilterItem name="breakfast" />
    <CategoryFilterItem name="launch" />
    <CategoryFilterItem name="dinner" />
    <CategoryFilterItem name="snack" />
    <CategoryFilterItem name="cakes" />
    <CategoryFilterItem name="drinks" />
  </nav>
);

export default CategoryFilter;
