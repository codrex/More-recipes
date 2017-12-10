import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';
import SearchBox from '../../common/searchBox/searchbox';
import abbr from '../../../utils/nameAbbr/nameAbbr';
import { userLogout } from '../../../actions/userActions';

const TopBar = (props) => {
  const { fullname, logout } = props;
  return (
    <div className={classnames('col-12 top-bar', props.className)}>
      <div className="top-bar-top 'flex">
        <nav className="nav">
          <Link className="nav-link" to="/user">
              profile
          </Link>
        </nav>

        <div
          id="myPopover"
          className="avatar avatar-sm"
          data-toggle="tooltip"
          data-placement="right"
          title="Tooltip on right"
        >
          {fullname && abbr(fullname)}
        </div>
        <SearchBox
          handleSubmit={props.handleSubmit}
          handleChange={props.handleChange}
        />

      </div>
      <div className="top-bar-bottom">
        <nav className="nav">
          <NavLink
            className="nav-link text-capitalize "
            activeClassName="nav-link-active"
            to={'/recipes/top-recipes'}
            exact
            id="getTopRecipes"
          >
            Top recipes
          </NavLink>
          <NavLink
            className="nav-link text-capitalize "
            activeClassName="nav-link-active"
            to={'/recipes/created-recipes'}
            exact
            id="getMyRecipes"
          >
            created recipes
          </NavLink>
          <NavLink
            className="nav-link text-capitalize "
            activeClassName="nav-link-active"
            to={'/recipes/favourite-recipes'}
            exact
            id="getFavRecipes"
          >
            Favourite recipes
          </NavLink>
        </nav>
        <nav className="nav">
          <a
            className="nav-link logout text-capitalize"
            onClick={logout}
            id="logout"
            role="button"
            tabIndex="0"
          >
          logout</a>
        </nav>
      </div>
    </div>
  );
};

TopBar.defaultProps = {
  handleSubmit: () => {},
  handleChange: () => {},
  search: false,
  className: '',
  title: '',
  avatar: false,
  bottom: false,
};

TopBar.propTypes = {
  handleSubmit: PropTypes.func,
  handleChange: PropTypes.func,
  className: PropTypes.string,
  fullname: PropTypes.string.isRequired,
  logout: PropTypes.func.isRequired,
};
const mapStateToProps = state => ({
  fullname: state.user.fullname,
});
export default connect(mapStateToProps, {
  logout: userLogout
})(TopBar);
