import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

/**
 * @returns{Object} list item component
 * @param{object} props
 */
const NavItem = props => (
  <li className="nav-item">
    <NavLink
      className="nav-link text-capitalize "
      activeClassName="nav-link-active"
      to={props.to}
      exact
    >
      {props.text}
    </NavLink>
  </li>
);

NavItem.propTypes = {
  text: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
};

const Navbar = (props) => {
  const links = props.authenticated ? ['Recipes', 'Top Recipes', 'Add Recipe'] : ['login', 'create account'];
  const url = props.authenticated ? ['/recipes', '/top-recipes', '/create']
    : ['/login', '/create-account'];
  return (
    <nav
      className={`navbar navbar-toggleable-md navbar-light
      justify-content-md-between justify-content-center align-items-center flex-row flex-wrap`}
    >
      <a
        className="navbar-brand d-flex justify-content-center align-items-center display-4"
        href="/"
      >
        More-Recipes
      </a>
      <ul className="navbar-nav mr-auto col-xs-12 col-sm-10 col-md-7 col-lg-7" >
        {links.map((link, i) => <NavItem key={link} text={link} to={url[i]} />)}
      </ul>
    </nav>
  );
};

Navbar.propTypes = {
  authenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = state => (
  {
    authenticated: state.auth.authenticated
  }
);
export default connect(mapStateToProps)(Navbar);
