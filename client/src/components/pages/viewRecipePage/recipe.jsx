import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ajaxRedirect } from '../../../actions/ajaxActions';
import { getUserProfile } from '../../../actions/userActions';
import { getRecipe, vote, toggleFav } from '../../../actions/recipeActions';
import Comments from './comments/comments';
import Icon from '../../common/icon/icon';
import Button from '../../common/button/button';
import Modal from '../../common/modal/modal';
import CommentForm from './commentform/commentForm';
import Directions from './directions/directions';
import Ingredients from './ingredients/ingredients';
import Loader from '../../common/loader/loader';

/**
 * Recipes component
 */
export class Recipe extends React.Component {
  /**
   * @return {undefined}
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.state = {
      vote: '',
      addToFav: false
    };
    this.vote = this.vote.bind(this);
    this.addToFav = this.addToFav.bind(this);
    this.isUserFav = this.isUserFav.bind(this);
    this.recipeId = parseInt(this.props.match.params.id, 10);
  }

  /**
 * @return {undefined}
 */
  componentDidMount() {
    const { actions, recipe } = this.props;
    if (recipe.id === undefined || this.recipeId !== recipe.id) {
      actions.getRecipe(this.recipeId);
    }
  }
  /**
 * @return {undefined}
 * @param {string} type
 */
  vote(type) {
    this.setState({
      vote: type === this.state.vote ? '' : type
    });
    this.props.actions.vote(this.recipeId, type);
  }

  /**
 * @return {undefined}
 */
  addToFav() {
    this.props.actions.toggleFav(this.recipeId);
  }
  /**
   * @return {bool} true / false
   */
  isUserFav() {
    return this.props.favRecipes.find(recipe => this.recipeId === recipe.id) !== undefined;
  }

  /**
   * @return {undefined}
   */
  render() {
    const {
      id,
      ingredients,
      directions,
      RecipeReviews,
      upVotes,
      downVotes,
      views,
      Owner
    } = this.props.recipe;
    const { history, userId } = this.props;
    const isOwner = Owner && Owner.id === userId;
    return (
      <div className="container-fluid no-padding">
        {this.props.loading && <Loader loading={this.props.loading} />}
        <div className="row flex-column recipe">
          <div className="col-xs-12 col-sm-12 col-md-10 col-lg-9 ingredients-wrapper d-flex ">
            {isOwner &&
              <div className="col-12 modify-recipe-wrapper">
                <Button
                  text="Modify recipe"
                  handleClick={() => {
                    history.push(`/modify/${id}`);
                  }}
                />
              </div>
            }
            <h5 className="display-4">Ingredients </h5>
            <Ingredients ingredients={ingredients} />
          </div>
          <div className="col-xs-12 col-sm-12 col-md-10 col-lg-9 directions-wrapper d-flex">
            <h5 className="display-4">Directions </h5>
            <Directions directions={directions} />
          </div>
          <div className="col-xs-12 col-sm-12 col-md-10 col-lg-9 comments-wrapper d-flex">
            <h5 className="display-4">
              Reviews and comments
              <Button
                text="post a review"
                className="btn-secondary"
                dataToggle="modal"
                dataTarget="#modal"
                id="reviewBtn"
              />
            </h5>
            <Comments comments={RecipeReviews} />
          </div>
        </div>

        <div className="d-flex justify-content-around lead topbar flex-column icon-bar">
          <Icon iconClass="fa fa-eye recipe-card-icon">{views}</Icon>
          <Icon
            iconClass={this.state.vote === 'up' ? 'fa fa-thumbs-up' : 'fa fa-thumbs-o-up'}
            handleClick={() => this.vote('up')}
            id="upvote"
          >
            {upVotes}
          </Icon>
          <Icon
            iconClass={this.state.vote === 'down' ? 'fa fa-thumbs-down' : 'fa fa-thumbs-o-down'}
            handleClick={() => this.vote('down')}
            id="downvote"
          >
            {downVotes}
          </Icon>
          <Icon
            iconClass={this.isUserFav() ? 'fa fa-heart fav' : 'fa fa-heart-o fav'}
            handleClick={this.addToFav}
            id="toggleFav"
          />
        </div>
        <Modal id="modal" center rightBtnText="Post review" title="Review">
          <CommentForm
            id={parseInt(this.recipeId, 10)}
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
  userId: PropTypes.number.isRequired,
};

const mapStateToProps = state => ({
  redirectUrl: state.redirectUrl,
  recipe: state.recipe,
  loading: state.networkRequest.loading,
  favRecipes: state.user.favRecipes,
  userId: state.user.id
});
const mapDispatchToProps = dispatch => ({
  actions: {
    redirect: bindActionCreators(ajaxRedirect, dispatch),
    getRecipe: bindActionCreators(getRecipe, dispatch),
    vote: bindActionCreators(vote, dispatch),
    toggleFav: bindActionCreators(toggleFav, dispatch),
    getUser: bindActionCreators(getUserProfile, dispatch),
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Recipe);
