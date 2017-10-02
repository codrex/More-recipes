import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import './sidebar.scss';


const SidebarListItem = (props) => (
  <h4
    className={classnames('lead sidebar-text sidebar-list-item', props.active && 'active')}
    onClick={() => {
      props.onClick(props.index);
      console.log(props.active, 'jjj');
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
      active: null,
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
  }

  /**
   * @return {undefined}
   */
  render() {
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
          <Link to="/recipe/create">
            <SidebarListItem
              name="add recipe"
            />
          </Link>
          <Link to="/recipe/create">
            <SidebarListItem
              name="my profile"
            />
          </Link>

        </div>
      </div>
  );
  }
}

Sidebar.propTypes = {
  actions: PropTypes.array,
  id: PropTypes.number,
};

export default Sidebar;
