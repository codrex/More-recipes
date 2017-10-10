import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Icon from '../../common/icon/icon';
import { bindActionCreators } from 'redux';
import { ajaxRedirect } from '../../../actions/ajaxActions';
import { getAllRecipes, getFavRecipes, getTopRecipes } from '../../../actions/recipeActions';
import { getUserProfile } from '../../../actions/userActions';
import CategoryFilter from './categoryFilter/categoryFilter';
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
    // props.actions.getAllRecipes();
    this.state = {
      allRecipes: props.recipes,
      showSidebar: false,
    };
    this.setShowSidebar = this.setShowSidebar.bind(this);
  }

  /**
   * @return {undefined}
   */
  componentDidMount() {
    this.props.actions.getProfile();
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
    if (this.state.showSidebar) {
      document.getElementById('root').className = '';
    } else {
      document.getElementById('root').className = 'no-scroll';
    }
  }

  /**
   * @return {undefined}
   */
  render() {
    const { actions } = this.props;
    const show = this.state.showSidebar && 'show';
    return (
      <div className="container-fluid">
        <div className="row">
          <div className={`col-xs-12 col-sm-12 col-md-3 col-lg-3 sidebar-wrapper d-flex ${show}`}>
            <Sidebar
              actions={[actions.getAllRecipes,
                        actions.getTopRecipes,
                        actions.getFavRecipes]}
              redirect={this.props.actions.redirect}
              history={this.props.history}
              user={this.props.user}
            />
          </div>
          <div className="col-xs-12 col-sm-12 col-md-9 col-lg-9 recipes-wrapper d-flex">
            <div className="row category-filter-wrapper d-flex">
              <CategoryFilter />
              {!this.state.showSidebar && <Icon
                iconClass="fa fa-bars"
                parentClass="mobile left"
                handleClick={this.setShowSidebar}
              />}
              {this.state.showSidebar && <Icon
                iconClass="fa fa-arrow-left"
                parentClass="mobile right"
                handleClick={this.setShowSidebar}
              />}
            </div>
            <div className="row grid-list-wrapper d-flex">
              <RecipeGrid recipes={this.props.recipes} loading={this.props.loading} />
            </div>
            <div className="row pagination-wrapper d-flex">

            </div>
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
  loading: PropTypes.bool,
};

const mapStateToProps = (state) => (
  {
    redirectUrl: state.redirectUrl,
    recipes: state.recipes,
    user: state.user,
    loading: state.ajaxCall > 0
  }
);
const mapDispatchToProps = (dispatch) => (
  {
    actions: {
      redirect: bindActionCreators(ajaxRedirect, dispatch),
      getAllRecipes: bindActionCreators(getAllRecipes, dispatch),
      getFavRecipes: bindActionCreators(getFavRecipes, dispatch),
      getTopRecipes: bindActionCreators(getTopRecipes, dispatch),
      getProfile: bindActionCreators(getUserProfile, dispatch),

    }
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
