import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Icon from '../../common/icon/icon';
import Loader from '../../common/loader/loader';
import { bindActionCreators } from 'redux';
import { ajaxRedirect } from '../../../actions/ajaxActions';
import {
  getAllRecipes,
  getFavRecipes,
  getTopRecipes,
  findRecipes
} from '../../../actions/recipeActions';
import { getUserProfile } from '../../../actions/userActions';
import TopBar from '../../common/topbar/topbar';
import Sidebar from './sidebar/sidebar';
import RecipeGrid from './recipesGrid/recipesGrid';
import './dashboard.scss';

/**
 * Dashboard component
 */
class Dashboard extends React.Component {
  /**
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.state = {
      allRecipes: props.recipes,
      showSidebar: false,
      activeStates: ['All recipes', 'top recipes', 'Favorite recipes'],
      active: 0,
    };
    this.setShowSidebar = this.setShowSidebar.bind(this);
    this.recipeSearch = this.recipeSearch.bind(this);
    this.setActive = this.setActive.bind(this);
  }

  /**
   * @return {undefined}
   */
  componentDidMount() {
    this.props.actions.getProfile();
    this.props.actions.getAllRecipes();
  }

  /**
   *
   * @param {object} nextProps
   * @return {bool} true or false
   */
  shouldComponentUpdate(nextProps) {
    if (nextProps.redirectUrl === '/') {
      // redirect authenticated user to home page
      // in other to login pr signup
      // the current page url is save via the redirect action creator
      // doing this will enable the user to be re-route back to this page
      // after a successful authentication
      this.props.actions.redirect('/recipes');
      this.props.history.push(nextProps.redirectUrl);
      return false;
    }
    return true;
  }

  /**
   * @return{undefined}
   */
  setShowSidebar() {
    this.setState({ showSidebar: !this.state.showSidebar });
  }

   /**
   * @return {undefined}
   * @param {active} active
   */
  setActive(active) {
    this.setState({ active });
  }

   /**
   * @return{undefined}
   * @param {string} value
   */
  recipeSearch(value) {
    const activeStates = [...this.state.activeStates];
    activeStates[3] = `search for ${value}`;
    this.setState({
      activeStates,
      active: 3,
    });
    this.props.actions.search(value);
  }

  /**
   * @return {undefined}
   */
  render() {
    const { actions } = this.props;
    const show = this.state.showSidebar && 'show';
    return (
      <div className="container-fluid dashboard" id="dashboard">
        <div
          className={`overlay ${this.state.showSidebar && 'overlay-active'}`}
        >
          <Icon
            iconClass="fa fa-times "
            parentClass="mobile right animate"
            handleClick={this.setShowSidebar}
          />
        </div>
        <div className="row dashboard">
          <div
            className={`col-xs-12 col-sm-12 col-md-3 col-lg-2 sidebar-wrapper d-flex ${show}`}
          >
            <Sidebar
              actions={[
                actions.getAllRecipes,
                actions.getTopRecipes,
                actions.getFavRecipes,
              ]}
              active={this.setActive}
              redirect={this.props.actions.redirect}
              history={this.props.history}
              user={this.props.user}
            />
          </div>
          <div
            className={`col-xs-12 col-sm-12 col-md-9 col-lg-10
            recipes-wrapper d-flex no-padding align-items-center`}
          >
            <TopBar
              search
              handleSubmit={this.recipeSearch}
              className="justify-content-end"
            >
              <Icon
                iconClass="fa fa-bars"
                parentClass="mobile left"
                handleClick={this.setShowSidebar}
              />
            </TopBar>
            {!this.props.loading &&
              <div className="row grid-list-wrapper d-flex col-md-12 col-lg-12">
                {this.props.recipes.length > 0 &&
                  <h1 className="display-4 text-capitalize text-left">
                    {this.state.activeStates[this.state.active]}
                  </h1>
                }
                <RecipeGrid
                  recipes={this.props.recipes}
                  loading={this.props.loading}
                />
                <div className="row pagination-wrapper d-flex" />
              </div>}
              {this.props.loading &&
                <Loader loading={this.props.loading} />
              }
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  actions: PropTypes.object,
  history: PropTypes.object,
  recipes: PropTypes.array,
  user: PropTypes.object,
  loading: PropTypes.bool
};

const mapStateToProps = state => ({
  redirectUrl: state.redirectUrl,
  recipes: state.recipes,
  user: state.user,
  loading: state.ajaxCall > 0
});
const mapDispatchToProps = dispatch => ({
  actions: {
    redirect: bindActionCreators(ajaxRedirect, dispatch),
    getAllRecipes: bindActionCreators(getAllRecipes, dispatch),
    getFavRecipes: bindActionCreators(getFavRecipes, dispatch),
    getTopRecipes: bindActionCreators(getTopRecipes, dispatch),
    getProfile: bindActionCreators(getUserProfile, dispatch),
    search: bindActionCreators(findRecipes, dispatch),
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
