import React from 'react';
import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';
import './sidebar.scss';

const SidebarListItem = (props) => {
  return (
    <h4 className="lead sidebar-text sidebar-list-item">
      {props.name}
    </h4>
  );
};
SidebarListItem.propTypes = {
  name: PropTypes.string,
};

const Sidebar = (props) => {
  return (
    <div className="sidebar col-12 ">
      <div className="sidebar-header">
        <h4 className="lead sidebar-text">
          Recipes
        </h4>
        <div className="avatar avatar-sm" >
          RO
        </div>
      </div>
      <div className="sidebar-body">
        <SidebarListItem name="All recipes" />
        <SidebarListItem name="My recipes" />
        <SidebarListItem name="Favorite recipes" />
        <SidebarListItem name="Top recipes" />
      </div>
    </div>
  );
};

Sidebar.propTypes = {

};

export default Sidebar;
