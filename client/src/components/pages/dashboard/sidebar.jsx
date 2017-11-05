import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import nameAbbr from '../../../utils/nameAbbr/nameAbbr';


const SidebarListItem = (props) => (
  <h4
    className={classnames('lead sidebar-text sidebar-list-item', props.active && 'active')}
    onClick={() => {
      props.onClick(props.index);
    }}
  >
    {props.name}
  </h4>
  );

SidebarListItem.propTypes = {
  name: PropTypes.string,
  onClick: PropTypes.func,
  index: PropTypes.number,
};
/**
 * sidebar
 */
class Sidebar extends React.Component {
  /**
   * @return {undefined}
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.state = {
      active: 0,
    };
    this.setActive = this.setActive.bind(this);
  }

  /**
   * @return {undefined}
   * @param {number} current
   */
  setActive(current) {
    this.setState({ active: current });
    this.props.actions[current]();
    this.props.active(current);
  }

  /**
   * @return {undefined}
   */
  render() {
    const abbr = nameAbbr(this.props.user.fullname).toUpperCase();
    return (
      <div className="sidebar col-12 ">
        <div className="sidebar-header">
          <div className="avatar avatar-sm" >
            {abbr}
          </div>
          <h4 className="lead sidebar-text">
            Dashboard
          </h4>
          <Link to="/user">
            <p className="small text-white text-capitalize">
              my profile
            </p>
          </Link>
        </div>
        <div className="sidebar-body">
          <SidebarListItem
            name="All recipes"
            onClick={this.setActive}
            active={this.state.active === 0}
            index={0}
          />
          <SidebarListItem
            name="Top recipes"
            onClick={this.setActive}
            active={this.state.active === 1}
            index={1}
          />
          <SidebarListItem
            name="Favorite recipes"
            onClick={this.setActive}
            active={this.state.active === 2}
            index={2}

          />

        </div>
      </div>
  );
  }
}

Sidebar.propTypes = {
  actions: PropTypes.array,
  id: PropTypes.number,
  avatar: PropTypes.string,
  user: PropTypes.object,
  active: PropTypes.func,
};

export default Sidebar;
