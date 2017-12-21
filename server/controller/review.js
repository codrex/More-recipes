import db from '../models/index';
import { serverError, sendPaginatedRecipes } from '../reply/reply';
import getParams from '../utils/pagination';

const RecipeReviews = db.RecipeReviews;

export const createReview = (req, res, next) => {
  RecipeReviews.create({
    review: req.body.review,
    ReviewerId: req.requestId
  })
    .then((review) => {
      req.reviewId = review.dataValues.id;
      next();
    }).catch(() => {
      serverError(res);
    });
};

// get reviews on a recipe
export const fetchReviews = (req, res) => {
  const { limit, offset } = getParams(req);
  Recipes.findAndCountAll({
    where: {
      recipeId: req.params.id
    },
    limit,
    offset,
    order: [['id', 'DESC']],
  }).then(({ count, rows }) => {
    sendPaginatedRecipes(rows, count, limit, res);
  }).catch(() => {
    serverError(res);
  });
};
