import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ajaxRedirect } from '../../../actions/ajaxActions';
import {
  getUserProfile,
  getVotes
} from '../../../actions/userActions';
import {
  getRecipe,
  vote,
  toggleFav,
  getReviews
} from '../../../actions/recipeActions';
import Comments from './comments/comments';
import Icon from '../../common/icon/icon';
import Button from '../../common/button/button';
import Modal from '../../common/modal/modal';
import CommentForm from './commentform/commentForm';
import Directions from './directions/directions';
import Ingredients from './ingredients/ingredients';
import Loader from '../../common/loader/loader';
import Paginator from '../../common/paginator/paginator';
import HeroArea from '../../common/heroArea/heroArea';
import { DEFAULT_RECIPE_PIX_URL } from '../../../constants/constants';
import imageParser from '../../../utils/imageParser/imageParser';

/**
 * @summary Recipes component
 * @return {React} component
 */
export class Recipe extends React.Component {
  /**
   * @return {undefined}
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.recipeId = parseInt(this.props.match.params.id, 10);
    const {
      upVote = false,
      downVote = false
    } = this.getVote(props.votes) || {};
    this.state = {
      addToFav: false,
      upVote,
      downVote,
    };
  }

  /**
 * @return {undefined}
 */
  componentDidMount() {
    const { actions, recipe } = this.props;
    if (recipe.id === undefined || this.recipeId !== recipe.id) {
      actions.getRecipe(this.recipeId);
      actions.getReviews(this.recipeId, 1);
      actions.getVotes([this.recipeId]);
    }
  }

  /**
 * @return {undefined}
 * @param {object} nextProps
 */
  componentWillReceiveProps(nextProps) {
    if (nextProps.votes === this.props.votes) return;
    const {
      upVote = false,
      downVote = false
    } = this.getVote(nextProps.votes) || {};
    this.setState({
      upVote,
      downVote
    });
  }

 /**
 * @return {undefined}
 * @param {object} votes
 */
 getVote = votes => votes.find(element => element.recipeId === this.recipeId)

 /**
 * @return {undefined}
 * @param {string} type
 * @param {bool} value
 */
  vote =(type, value) => {
    this.setState({
      upVote: type === 'up' && value,
      downVote: type === 'down' && value
    });
    this.props.actions.vote(this.recipeId, type, value);
  }

  /**
 * @return {undefined}
 */
  addToFav = () => {
    this.props.actions.toggleFav(this.recipeId);
  }
  /**

  /**
   * @return {bool} true / false
   */
  isUserFav = () => this.props.favRecipes.some(recipe => recipe.id === this.recipeId)
  renderSidIcons = () => {
    const {
      upVote,
      downVote,
    } = this.state;
    const {
      id,
      owner,
    } = this.props.recipe;
    const { history, userId } = this.props;
    const isOwner = owner && owner.id === userId;
    return (
      <div className="d-flex justify-content-around lead topbar flex-column icon-bar">
        <Icon
          iconClass={upVote ? 'fa fa-thumbs-up' : 'fa fa-thumbs-o-up'}
          handleClick={() => this.vote('up', !upVote)}
          id="upvote"
        />
        <Icon
          iconClass={downVote ? 'fa fa-thumbs-down' : 'fa fa-thumbs-o-down'}
          handleClick={() => this.vote('down', !downVote)}
          id="downvote"
        />
        <Icon
          iconClass={this.isUserFav() ? 'fa fa-heart fav' : 'fa fa-heart-o fav'}
          handleClick={this.addToFav}
          id="toggleFav"
        />
        { isOwner && <Icon
          iconClass="fa fa-pencil"
          handleClick={() => {
            history.push(`/modify/${id}`);
          }}
          id="toggleFav"
        />}
      </div>
    );
  }
  renderIngredients = () => {
    const {
      ingredients,
    } = this.props.recipe;
    return (
      <div className="col-xs-12 col-sm-12 col-md-10 col-lg-9 ingredients-wrapper d-flex ">
        <Ingredients ingredients={ingredients} />
      </div>
    );
  }
  renderRecipeDetails = () => {
    if (!this.props.loading) {
      return (
        <div className="row flex-column recipe">
          {this.renderIngredients()}
          {this.renderDirections()}
          {this.renderReviews()}
        </div>
      );
    }
  }
  renderReviews = () => {
    const { reviews } = this.props.recipe;
    const { loading } = this.props;
    if (loading) {
      return (
        <Loader loading={loading} />
      );
    }
    return (
      <div className="col-xs-12 col-sm-12 col-md-10 col-lg-9 comments-wrapper d-flex">
        <div className="d-flex align-items-start flex-column col-12">
          <h5 className="display-4">
            Reviews
            <Button
              text="post a review"
              className="btn-secondary"
              dataToggle="modal"
              dataTarget="#modal"
              id="reviewBtn"
            />
          </h5>
          {this.renderPagination()}
          <Comments comments={reviews} />
        </div>
      </div>
    );
  }
  renderDirections = () => {
    const { directions } = this.props.recipe;
    return (
      <div className="col-xs-12 col-sm-12 col-md-10 col-lg-9 directions-wrapper d-flex">
        <Directions directions={directions} />
      </div>
    );
  }
  renderRecipeInfo = () => {
    const {
      views,
      owner,
      upVotes,
      downVotes,
      id
    } = this.props.recipe;
    if (!id) return null;
    return (
      <div className="recipe-info-wrapper">
        <h6 className="lead text-capitalize ">
        posted by:
          <span className="bold">{owner && owner.username} </span> </h6>
        <h6 className="lead text-capitalize ">
          Views: <span className="bold">{views}</span>
        </h6>
        <h6 className="lead text-capitalize ">
          likes: <span className="bold">{upVotes}</span>
        </h6>
        <h6 className="lead text-capitalize ">
          dislikes: <span className="bold">{downVotes}</span>
        </h6>
      </div>
    );
  }
  /**
   * @return {React} Paginator
   */
  renderPagination = () => {
    const {
      pageCount,
      actions
    } = this.props;
    if (pageCount > 1) {
      return (
        <Paginator
          pageCount={pageCount}
          handlePageClick={({ selected }) => {
            actions.getReviews(this.recipeId, selected + 1);
          }}
        />
      );
    } return null;
  }
  /**
   * @return {React} component
   */
  render() {
    const { loading, recipe } = this.props;
    const url = imageParser(recipe.image).url || DEFAULT_RECIPE_PIX_URL;
    return (
      <div className="container-fluid no-padding main">
        {loading && <Loader loading={loading} />}
        {!loading && <HeroArea image={url} title={recipe.name} />}
        {this.renderRecipeInfo()}
        {this.renderRecipeDetails()}
        {this.renderSidIcons()}
        <Modal id="modal" center rightBtnText="Post review" title="Review">
          <CommentForm
            id={parseInt(this.recipeId, 0)}
          />
        </Modal>
      </div>
    );
  }
}

Recipe.propTypes = {
  actions: PropTypes.objectOf(PropTypes.shape).isRequired,
  favRecipes: PropTypes.arrayOf(PropTypes.shape).isRequired,
  history: PropTypes.objectOf(PropTypes.shape).isRequired,
  loading: PropTypes.bool.isRequired,
  match: PropTypes.objectOf(PropTypes.shape).isRequired,
  recipe: PropTypes.objectOf(PropTypes.shape).isRequired,
  votes: PropTypes.arrayOf(PropTypes.shape).isRequired,
  userId: PropTypes.number,
  pageCount: PropTypes.number
};
Recipe.defaultProps = {
  userId: 0,
  pageCount: 0
};

const mapStateToProps = state => ({
  redirectUrl: state.redirectUrl,
  recipe: state.recipe,
  loading: state.networkRequest.loading,
  pageCount: state.pageCount,
  favRecipes: state.user.favRecipes,
  userId: state.user.id,
  votes: state.user.votes
});
const mapDispatchToProps = dispatch => ({
  actions: {
    redirect: bindActionCreators(ajaxRedirect, dispatch),
    getRecipe: bindActionCreators(getRecipe, dispatch),
    vote: bindActionCreators(vote, dispatch),
    toggleFav: bindActionCreators(toggleFav, dispatch),
    getUser: bindActionCreators(getUserProfile, dispatch),
    getReviews: bindActionCreators(getReviews, dispatch),
    getVotes: bindActionCreators(getVotes, dispatch)
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Recipe);
