import React from 'react';
import PropTypes from 'prop-types';
import toastr from 'toastr';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ajaxRedirect } from '../../../actions/ajaxActions';
import Comments from './comments';
import Icon from '../../common/icon';
import Button from '../../common/button';
import Modal from '../../common/modal';
import CommentForm from './commentForm';
import Directions from './directions';
import Ingredients from './ingredients';
import Loader from '../../common/loader';
import Paginator from '../../common/paginator';
import NotFound from '../../common/notFound';
import HeroArea from '../../common/heroArea';
import toastrConfig from '../../../toastr/config';
import { DEFAULT_RECIPE_PIX_URL } from '../../../constants';
import imageParser from '../../../utils/imageParser';
import resetPageCount from '../../../actions/pageCountActions';
import {
  getUserProfile,
  getVotes
} from '../../../actions/userActions';
import {
  getRecipe,
  vote,
  toggleFav,
  getReviews,
  resetRecipe,
} from '../../../actions/recipeActions';

/**
 * @summary Recipes component
 * @return {React} component
 */
class RecipeDetails extends React.Component {
  /**
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
      hasNotFound: false,
      allowLoading: false
    };
  }

  /**
 * @return {undefined}
 */
  componentDidMount() {
    const { actions, recipe } = this.props;

    if (recipe.id === undefined || this.recipeId !== recipe.id) {
      if (!isNaN(this.recipeId)) {
        actions.resetRecipe();
        actions.resetPageCount();
        actions.getReviews(this.recipeId, 1);
        actions.getVotes([this.recipeId]);
        actions.getRecipe(this.recipeId);
      } else {
        this.setState({ hasNotFound: true });
        toastr.error('Sorry, recipe not found', 'Error', toastrConfig);
      }
    }
  }

  /**
 * @return {undefined}
 * @param {object} nextProps
 */
  componentWillReceiveProps(nextProps) {
    if (nextProps.statusCode === 404 && !this.state.hasNotFound) {
      this.setState({ hasNotFound: true });
    }

    if (this.state.allowLoading) {
      this.setState({ allowLoading: false });
    }

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
 * @return {Object} vote
 * @param {object} votes
 */
 getVote = votes => votes.find(element => element.recipeId === this.recipeId)

 /**
 * @return {undefined}
 * @param {string} type
 * @param {bool} value
 * @param {string} message
 */
  vote = (type, value, message) => {
    this.setState({
      upVote: type === 'up' && value,
      downVote: type === 'down' && value
    });
    this.props.actions.vote(this.recipeId, type, value, message);
  }

  /**
 * @return {undefined}
 */
  addToFav = () => {
    const message = this.isUserFav() ? 'Removed from favourites' : 'Added to favourites';
    this.props.actions.toggleFav(this.recipeId, message);
  }
  /**

  /**
   * @return {bool} true / false
   */
  isUserFav = () => this.props.favRecipes.some(recipe => recipe.id === this.recipeId)

  /**
   * @return {React} SideIcons
   */
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
          handleClick={() => {
            const message = !upVote ? 'You like this recipe' : undefined;
            this.vote('up', !upVote, message);
          }}
          id="upvote"
        />
        <Icon
          iconClass={downVote ? 'fa fa-thumbs-down' : 'fa fa-thumbs-o-down'}
          handleClick={() => {
            const message = !downVote ? 'You dislike this recipe' : undefined;
            this.vote('down', !downVote, message);
          }}
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

  /**
   * @return {React} Ingredients
   */
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

  /**
   * @return {React} Directions
   */
  renderDirections = () => {
    const { directions } = this.props.recipe;
    return (
      <div className="col-xs-12 col-sm-12 col-md-10 col-lg-9 directions-wrapper d-flex">
        <Directions directions={directions} />
      </div>
    );
  }

  /**
   * @return {React} Reviews
   */
  renderReviews = () => {
    const { reviews } = this.props.recipe;
    const { requestCount } = this.props;
    const { allowLoading } = this.state;
    const isLoading = requestCount > 0 && allowLoading;

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
          <Comments comments={isLoading ? [] : reviews} isLoading={isLoading} />
        </div>
      </div>
    );
  }

  /**
   * @return {React} RecipeInfo
   */
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
      actions,
      loading,
    } = this.props;

    const { allowLoading } = this.state;

    if (pageCount > 1) {
      return (
        <Paginator
          pageCount={pageCount}
          loading={loading && allowLoading}
          handlePageClick={({ selected }) => {
            actions.getReviews(this.recipeId, selected + 1);
            this.setState({ allowLoading: true });
          }}
        />
      );
    } return null;
  }

  /**
   * @return {React} Component
   */
  renderRecipeDetails = () => (
    <div className="row flex-column recipe">
      {this.renderIngredients()}
      {this.renderDirections()}
      {this.renderReviews()}
    </div>
  )

  /**
   * @return {React} Paginator
   */
  renderPage = () => {
    const { hasNotFound } = this.state;
    if (hasNotFound) {
      return (
        <div className="container-fluid no-padding main">
          <NotFound message="recipe not found" />
        </div>
      );
    }
    const { recipe, requestCount, loading } = this.props;
    const hasPendingRequest = (requestCount > 0 && loading) || loading;
    const url = imageParser(recipe.image).url || DEFAULT_RECIPE_PIX_URL;

    return (
      <div className="container-fluid no-padding main">
        {hasPendingRequest && <Loader loading={hasPendingRequest} />}
        {!hasPendingRequest &&
          <div>
            <HeroArea image={url} title={recipe.name} />,
            {this.renderRecipeInfo()}
            {this.renderRecipeDetails()}
            {this.renderSidIcons()}
          </div>
        }
        <Modal id="modal" center rightBtnText="Post review" title="Review">
          <CommentForm
            id={parseInt(this.recipeId, 0)}
          />
        </Modal>
      </div>
    );
  }

  /**
   * @return {React} component
   */
  render() {
    return (
      this.renderPage()
    );
  }
}

RecipeDetails.propTypes = {
  actions: PropTypes.objectOf(PropTypes.shape).isRequired,
  favRecipes: PropTypes.arrayOf(PropTypes.shape).isRequired,
  history: PropTypes.objectOf(PropTypes.shape).isRequired,
  loading: PropTypes.bool.isRequired,
  match: PropTypes.objectOf(PropTypes.shape).isRequired,
  recipe: PropTypes.objectOf(PropTypes.shape).isRequired,
  votes: PropTypes.arrayOf(PropTypes.shape).isRequired,
  requestCount: PropTypes.number.isRequired,
  userId: PropTypes.number,
  pageCount: PropTypes.number,
  statusCode: PropTypes.number,
};
RecipeDetails.defaultProps = {
  userId: 0,
  pageCount: 0,
  statusCode: -1,
};

const mapStateToProps = state => ({
  redirectUrl: state.redirectUrl,
  recipe: state.recipe,
  loading: state.networkRequest.loading,
  pageCount: state.pageCount,
  favRecipes: state.user.favRecipes,
  userId: state.user.id,
  votes: state.user.votes,
  statusCode: state.currentStatusCode,
  requestCount: state.networkRequest.requestCount
});
const mapDispatchToProps = dispatch => ({
  actions: {
    redirect: bindActionCreators(ajaxRedirect, dispatch),
    getRecipe: bindActionCreators(getRecipe, dispatch),
    vote: bindActionCreators(vote, dispatch),
    toggleFav: bindActionCreators(toggleFav, dispatch),
    getUser: bindActionCreators(getUserProfile, dispatch),
    getReviews: bindActionCreators(getReviews, dispatch),
    getVotes: bindActionCreators(getVotes, dispatch),
    resetRecipe: bindActionCreators(resetRecipe, dispatch),
    resetPageCount: bindActionCreators(resetPageCount, dispatch),
  }
});

export { RecipeDetails as PureRecipeDetails };

export default connect(mapStateToProps, mapDispatchToProps)(RecipeDetails);
