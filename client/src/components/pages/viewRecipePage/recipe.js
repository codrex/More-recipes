import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ajaxRedirect } from '../../../actions/ajaxActions';
import { getRecipe, vote, addToFav } from '../../../actions/recipeActions';
import Comments from './comments/comments';
import Icon from '../../common/icon/icon';
import Button from '../../common/button/button';
import Modal from '../../common/modal/modal';
import CommentForm from '../../common/form/commentForm';
import Directions from './directions/directions';
import Ingredients from './ingredients/ingredients';

import './recipe.scss';
/**
 * Recipes component
 */
class Recipe extends React.Component {

  /**
   * @return {undefined}
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.state = {
      vote: '',
      addToFav: false,
    };
    this.vote = this.vote.bind(this);
    this.addToFav = this.addToFav.bind(this);
  }

/**
 * @return {undefined}
 */
  componentDidMount() {
    this.recipeId = this.props.match.params.id;
    this.props.actions.getRecipe(this.recipeId);
  }

  /**
   *
   * @param {object} nextProps
   * @return {bool} true or false
   */
  shouldComponentUpdate(nextProps) {
    if (nextProps.redirectUrl === '/') {
      // redirect unauthenticated user to home page
      // in other to login pr signup
      // the current page url is save via the redirect action creator
      // doing this will enable the user to be re-route back to this page
      // after a successful authentication
      this.props.actions.redirect('/recipe');
      this.props.history.push(nextProps.redirectUrl);
      return false;
    }
    return true;
  }

  /**
 * @return {undefined}
 * @param {string} type
 */
  vote(type) {
    this.setState({ vote: type === this.state.vote ? '' : type });
    this.props.actions.vote(this.recipeId, type);
  }

  /**
 * @return {undefined}
 */
  addToFav() {
    this.setState({ addToFav: true });
    this.props.actions.addToFav({ recipeId: this.recipeId });
  }

  /**
   * @return {undefined}
   */
  render() {
    const { ingredients, directions, RecipeReviews, recipeName } = this.props.recipe;
    return (
      <div className="container-fluid">
        <div className="row flex-column recipe">
          {!this.props.loading && this.props.recipe.Owner &&
            <h4 className="lead items-header-text top-bar justify-content-between">
              {recipeName}
              <span>posted by <em>{this.props.recipe.Owner.username}</em></span>
            </h4>
          }
          <div className="col-xs-12 col-sm-12 col-md-10 col-lg-9 ingredients-wrapper d-flex ">
            <h5 className="display-4">Ingredients </h5>
            <Ingredients ingredients={ingredients} />
          </div>
          <div className="col-xs-12 col-sm-12 col-md-10 col-lg-9 directions-wrapper d-flex">
            <h5 className="display-4">Directions </h5>
            <Directions directions={directions} />
          </div>
          <div className="col-xs-12 col-sm-12 col-md-10 col-lg-9 comments-wrapper d-flex">
            <h5 className="display-4">Reviews and comments
              <Button
                text="post a review"
                className="btn-secondary btn-lg"
                dataToggle="modal"
                dataTarget="#modal"
              />
            </h5>
            <Comments comments={RecipeReviews} loading={this.props.loading} />
          </div>
        </div>
        <div className="d-flex justify-content-around lead topbar flex-column icon-bar" >
          <Icon
            iconClass="fa fa-thumbs-o-up"
            active={this.state.vote === 'up' ? 'active' : ''}
            handleClick={() => this.vote('up')}
          />
          <Icon
            iconClass="fa fa-thumbs-o-down"
            active={this.state.vote === 'down' ? 'active' : ''}
            handleClick={() => this.vote('down')}
          />
          <Icon
            iconClass="fa fa-heart-o"
            active={this.state.addToFav ? 'active' : ''}
            handleClick={this.addToFav}
          />
        </div>
        <Modal
          id="modal"
          center
          rightBtnText="Post review"
          title="Review"

        >
          <CommentForm id={this.recipeId} />
        </Modal>
      </div>
    );
  }
}

Recipe.propTypes = {
  actions: PropTypes.object,
  history: PropTypes.object,
  recipe: PropTypes.object,
  loading: PropTypes.bool,
  match: PropTypes.object,
};

const mapStateToProps = (state) => (
  {
    redirectUrl: state.redirectUrl,
    recipe: state.selectedRecipe,
    loading: state.ajaxCall > 0
  }
);
const mapDispatchToProps = (dispatch) => (
  {
    actions: {
      redirect: bindActionCreators(ajaxRedirect, dispatch),
      getRecipe: bindActionCreators(getRecipe, dispatch),
      vote: bindActionCreators(vote, dispatch),
      addToFav: bindActionCreators(addToFav, dispatch)
    }
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(Recipe);
