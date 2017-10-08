import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import SearchBox from '../../common/searchBox/searchbox';
import './topbar.scss';

const TopBar = (props) => {
  return (
    <div className={classnames('col-12 top-bar', props.className)}>
      {props.children}
      {props.search && <SearchBox handleSubmit={props.handleSubmit} />}
    </div>
  );
};

TopBar.propTypes = {
  children: PropTypes.any,
  handleSubmit: PropTypes.func,
  search: PropTypes.bool,
  className: PropTypes.string,
};

export default TopBar;
