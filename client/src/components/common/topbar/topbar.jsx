import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import SearchBox from '../../common/searchBox/searchbox';
import './topbar.scss';

const TopBar = (props) => (
  <div className={classnames('col-12 top-bar', props.className)}>
    {props.title && <h1 className="text-white text-capitalize">{props.title}</h1>}
    {props.children}
    {props.search &&
      <SearchBox handleSubmit={props.handleSubmit} handleChange={props.handleChange} />}
  </div>
);

TopBar.propTypes = {
  children: PropTypes.any,
  handleSubmit: PropTypes.func,
  handleChange: PropTypes.func,
  search: PropTypes.bool,
  className: PropTypes.string,
  title: PropTypes.string,
};

export default TopBar;
