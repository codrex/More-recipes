import React from 'react';
import PropTypes from 'prop-types';
import jwt from 'jsonwebtoken';
// import { Link } from 'react-router-dom';
import './sidebar.scss';


const SidebarListItem = (props) => (
  <h4
    className="lead sidebar-text sidebar-list-item"
    onClick={() => {
      props.onClick();
    }}
  >
    {props.name}
  </h4>
  );

SidebarListItem.propTypes = {
  name: PropTypes.string,
  onClick: PropTypes.func,
  id: PropTypes.number,
};

const Sidebar = (props) => {
  const { actions } = props;
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
        <SidebarListItem name="All recipes" onClick={actions[0]} />
        <SidebarListItem name="Top recipes" onClick={actions[1]} />
        <SidebarListItem
          name="Favorite recipes"
          onClick={actions[2]}
        />
      </div>
    </div>
  );
};

Sidebar.propTypes = {
  actions: PropTypes.array,
  id: PropTypes.number,
};

export default Sidebar;
