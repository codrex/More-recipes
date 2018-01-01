import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { connect } from 'react-redux';
import SearchBox from '../../common/searchBox';
import getInitials from '../../../utils/getInitials';
import { userLogout } from '../../../actions/userActions';
import Dropdown from '../dropdown';

/**
 * @name SecondaryNavBar
 */
class SecondaryNavBar extends React.Component {
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
      >
        {initials}
      </div>
    )
  )

  /**
   * @return {React} jsx
   */
  render() {
    const {
      className,
      handleSubmit,
      handleChange,
      fullname,
      username
    } = this.props;
    return (
      <div className={classnames('col-12 top-bar', className)}>
        <div className="top-bar-top flex">
          <SearchBox
            handleSubmit={handleSubmit}
            handleChange={handleChange}
          />
          <Dropdown
            options={this.options}
            Trigger={this.renderTrigger(getInitials(fullname))}
            headerText={`Signed in as ${username}`}
          />
        </div>
      </div>
    );
  }
}

SecondaryNavBar.defaultProps = {
  handleSubmit: () => {},
  handleChange: () => {},
  search: false,
  className: '',
  title: '',
  avatar: false,
  bottom: false,
};

SecondaryNavBar.propTypes = {
  handleSubmit: PropTypes.func,
  handleChange: PropTypes.func,
  className: PropTypes.string,
  fullname: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  history: PropTypes.objectOf(PropTypes.shape).isRequired,
  logout: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  fullname: state.user.fullname,
  username: state.user.username
});

export default connect(mapStateToProps, {
  logout: userLogout
})(SecondaryNavBar);
