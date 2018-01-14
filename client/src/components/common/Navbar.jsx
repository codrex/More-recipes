import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import ReactToolTip from 'react-tooltip';
import { userLogout } from '../../actions/userActions';
import getInitials from '../../utils/getInitials';
import Dropdown from './Dropdown';
import { PROTECTED_ROUTES, UNPROTECTED_ROUTES } from '../../constants';

/**
 * Navbar component
 * @param {object} props
 * @return {React} react element
 */
class Navbar extends React.Component {
  /**
   * @return {undefined}
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.options = [
      { label: 'profile', action: this.profile },
      { label: 'favourite recipes', action: this.favouriteRecipe },
      { label: 'created recipes', action: this.createdRecipes },
      { label: 'separator' },
      { label: 'signout', action: this.logout },
    ];
    this.state = {
      names: props.authenticated ? Object.keys(PROTECTED_ROUTES) : Object.keys(UNPROTECTED_ROUTES),
      url: props.authenticated ? Object.values(PROTECTED_ROUTES) : Object.values(UNPROTECTED_ROUTES)
    };
  }

  /**
   * @return {undefined}
   */
  profile = () => {
    this.props.history.push('/user');
  }

  /**
   * @return {undefined}
   */
  favouriteRecipe = () => {
    this.props.history.push('/favourite-recipes');
  }

  /**
   * @return {undefined}
   */
  createdRecipes = () => {
    this.props.history.push('/created-recipes');
  }

  /**
   * @return {undefined}
   */
  logout = () => {
    this.props.logout();
  }

  /**
   * @param {string} initials
   * @return {React} jsx
   */
  renderTrigger = initials => (
    props => (
      <div
        className="avatar avatar-sm"
        onClick={props.onClick}
        role="button"
        tabIndex="0"
        data-tip={this.props.fullname.toUpperCase()}
        data-for="avatar-tooltip"
      >
        {initials}
        <ReactToolTip
          id="avatar-tooltip"
          type="dark"
          effect="solid"
        />
      </div>
    )
  )

  /**
   * @return {Object} list item component
   * @param {object} props
   */
  renderNavItem = props => (
    <li className="nav-item" id={`${props.text.replace(' ', '-')}-nav-link`}>
      <NavLink
        className="nav-link text-capitalize "
        activeClassName="nav-link-active"
        to={props.to}
        exact
      >
        {props.text}
      </NavLink>
    </li>
  )

  /**
   * @return {React} jsx
   */
  render() {
    const NavItem = this.renderNavItem;
    const { names, url } = this.state;
    const { username, fullname, authenticated } = this.props;
    return (
      <nav
        className={
          `navbar navbar-toggleable-md navbar-light
        justify-content-sm-between justify-content-center
        align-items-center flex-row flex-wrap`
        }
      >
        <a
          className="navbar-brand d-flex justify-content-center align-items-center display-4"
          href="/"
        >
          More-Recipes
        </a>
        <div className="d-flex">
          <ul className="navbar-nav mr-auto col-xs-12 col-sm-10 col-md-7 col-lg-7" >
            {names.map((name, i) => <NavItem key={name} text={name} to={url[i]} />)}
          </ul>
          {
            authenticated &&
            <Dropdown
              options={this.options}
              Trigger={this.renderTrigger(getInitials(fullname))}
              headerText={`Signed in as ${username}`}
            />
          }
        </div>
      </nav>
    );
  }
}


Navbar.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  history: PropTypes.objectOf(PropTypes.shape).isRequired,
  logout: PropTypes.func.isRequired,
  fullname: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
};

const mapStateToProps = state => (
  {
    authenticated: state.auth.authenticated,
    fullname: state.user.fullname,
    username: state.user.username
  }
);
export default connect(mapStateToProps, {
  logout: userLogout
})(Navbar);
