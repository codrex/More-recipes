import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import SearchBox from '../../common/searchBox/searchbox';
import abbr from '../../../utils/nameAbbr/nameAbbr';

const TopBar = (props) => (
  <div className={classnames('col-12 top-bar', props.className)}>
    <div className="top-bar-top">
      {props.title && <h1 className="text-white text-capitalize">{props.title}</h1>}
      {props.avatar &&
        <nav className="nav">
          <a className="nav-link" href="#" onClick={() => props.push('/user')}>my profile</a>
        </nav>
      }
      {props.avatar &&
        <div
          id="myPopover"
          className="avatar avatar-sm"
          data-toggle="tooltip" data-placement="right" title="Tooltip on right"
        >
          {props.fullname && abbr(props.fullname)}
        </div>}
      {props.search &&
        <SearchBox handleSubmit={props.handleSubmit} handleChange={props.handleChange} />
      }
    </div>
    <div className="top-bar-bottom">
      {props.children}
    </div>
  </div>
);

TopBar.propTypes = {
  children: PropTypes.any,
  handleSubmit: PropTypes.func,
  handleChange: PropTypes.func,
  search: PropTypes.bool,
  className: PropTypes.string,
  title: PropTypes.string,
  avatar: PropTypes.bool,
  fullname: PropTypes.string,
  push: PropTypes.func,
};

export default TopBar;
