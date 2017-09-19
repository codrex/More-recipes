import React from 'react';
import './navbar.scss';

/**
 * @returns{Object} list item component
 * @param{object} props
 */

const ListItem = props => (
  <li className="nav-item">
    <a className="nav-link text-uppercase" href="./index.html">{props.text}</a>
  </li>
);

/**
 * Navigation component
 */

class Navbar extends React.Component {

  /**
   * @returns{Object} a Navbar component
   */
  render() {
    const linkList = ['Home', 'Recipes', 'Add Recipe'];
    return (
      <nav
        className="navbar navbar-toggleable-md navbar-light justify-content-center align-items-center flex-row flex-wrap"
      >
        <a
          className="navbar-brand d-flex justify-content-center align-items-center" href="#"
        >
          <h1 className="display-4 no-margin">More-Recipes</h1>
        </a>
        <ul
          className="navbar-nav mr-auto col-xs-12 col-sm-10 col-md-7 col-lg-7"
        >
          {linkList.map((link, i) => <ListItem key={i} text={link} />)}
        </ul>
      </nav>
    );
  }
}

export default Navbar;
