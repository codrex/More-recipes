import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Loader from '../../common/loader/loader';
import { ajaxRedirect } from '../../../actions/ajaxActions';
import {
  getAllRecipes,
  getTopRecipes,
  findRecipes,
  toggleFav,
} from '../../../actions/recipeActions';
import { getUserProfile } from '../../../actions/userActions';
import RecipeGrid from './recipesGrid';

/**
 * Dashboard component
 */
export class Dashboard extends React.Component {
  /**
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.state = {
      allRecipes: props.recipes || [],
      activeStates: ['top recipes', 'my recipes', 'My Favorite recipes'],
      active: 0,
    };
    this.isUserFav = this.isUserFav.bind(this);
    this.recipeSearch = this.recipeSearch.bind(this);
    this.setActive = this.setActive.bind(this);
    this.getFavRecipes = this.getFavRecipes.bind(this);
    this.getUserRecipes = this.getUserRecipes.bind(this);
    this.toggleFav = this.toggleFav.bind(this);
  }

  /**
   * @return {undefined}
   */
  componentDidMount() {
    this.props.actions.getTopRecipes();
    this.props.actions.getProfile();
  }

  /**
   * @return {undefined}
   * @param {object} nextProps
   */
  componentWillReceiveProps(nextProps) {
    const { allRecipes, active } = this.state;
    if (nextProps.recipes !== this.props.recipes) {
      this.setState({
        allRecipes: nextProps.recipes
      });
    }
    if (nextProps.user.favRecipes.length !== allRecipes.length && active === 2) {
      this.getFavRecipes();
    }
  }

  /**
   * @return {undefined}
   */
  getUserRecipes() {
    this.setState({
      allRecipes: this.props.user.createdRecipes
    });
  }
  /**
   * @return {undefined}
   */
  getFavRecipes() {
    this.setState({
      allRecipes: this.props.user.favRecipes
    });
  }

  /**
   * @return {undefined}
   * @param {active} active
   */
  setActive(active) {
    this.setState({
      active
    });
  }

  /**
   * @return {undefined}
   * @param {number} id
   */
  isUserFav(id) {
    return this.props.user.favRecipes.find((recipe) => {
      const rId = recipe.id;
      return id === rId;
    });
  }

  /**
   * @return {undefined}
   * @param {number} id
   */
  toggleFav(id) {
    this.props.actions.toggleFav(id);
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
    const { loading } = this.props;
    return (
      <div className="container-fluid no-padding" id="dashboard">
        <div className="row dashboard d-flex flex-column">
          {!loading && this.props.recipes.length > 0 &&
          <h1
            id="display-1"
            className={`display-4 text-capitalize text-left
                bold text-dark d-flex justify-content-between align-items-center`}
          >
            {this.state.activeStates[this.state.active]}
            {this.state.allRecipes && <span className="lead">{`Total Recipes: ${this.state.allRecipes.length}`}</span>}
          </h1>
          }
          {!loading &&
          <RecipeGrid
            recipes={this.state.allRecipes}
            loading={loading}
            toggleFav={this.toggleFav}
            isUserFav={this.isUserFav}
          />
          }
          {loading &&
          <Loader loading={loading} />
          }
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  actions: PropTypes.objectOf(PropTypes.shape).isRequired,
  loading: PropTypes.bool.isRequired,
  recipes: PropTypes.arrayOf(PropTypes.shape).isRequired,
  user: PropTypes.objectOf(PropTypes.shape).isRequired,
};

const mapStateToProps = state => ({
  redirectUrl: state.redirectUrl,
  recipes: state.recipes,
  user: state.user,
  loading: state.networkRequest.loading,
  auth: state.auth,
});
const mapDispatchToProps = dispatch => ({
  actions: {
    redirect: bindActionCreators(ajaxRedirect, dispatch),
    getAllRecipes: bindActionCreators(getAllRecipes, dispatch),
    getTopRecipes: bindActionCreators(getTopRecipes, dispatch),
    getProfile: bindActionCreators(getUserProfile, dispatch),
    search: bindActionCreators(findRecipes, dispatch),
    toggleFav: bindActionCreators(toggleFav, dispatch),
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
