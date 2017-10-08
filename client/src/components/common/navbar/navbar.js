import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './navbar.scss';

/**
 * @returns{Object} list item component
 * @param{object} props
 */

const ListItem = props => (
  <li className="nav-item">
    <Link
      className="nav-link text-uppercase"
      activeClassName="nav-link-active"
      to={props.to}
      replace
    >
      {props.text}
    </Link>
  </li>
);

ListItem.propTypes = {
  text: PropTypes.string,
};

const Navbar = () => {
  const linkList = ['Home', 'Recipes', 'Add Recipe'];
  const links = ['/', '/recipes', '/recipe/create'];
  return (
    <nav
      className="navbar navbar-toggleable-md navbar-light justify-content-center align-items-center flex-row flex-wrap"
    >
      <a
        className="navbar-brand d-flex justify-content-center align-items-center" href="#"
      >
        <h1 className="display-4 ">More-Recipes</h1>
      </a>
      <ul
        className="navbar-nav mr-auto col-xs-12 col-sm-10 col-md-7 col-lg-7"
      >
        {linkList.map((link, i) => <ListItem key={i} text={link} to={links[i]} />)}
      </ul>
    </nav>
    );
};


export default Navbar;
