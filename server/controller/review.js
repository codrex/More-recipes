import db from '../models/index';
import getParams from '../utils/pagination';
import { serverError, sendPaginatedData } from '../utils/responder';

const RecipeReviews = db.RecipeReviews;

/**
 * @name createReview
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Object} next - Express next middleware function
 * @return {*} void
 */
export const createReview = (req, res, next) => {
  RecipeReviews.create({
    review: req.body.review,
    reviewerId: req.requestId
  })
    .then((review) => {
      review.reload({
        attributes: ['id', 'review'],
        include: [{
          model: db.Users,
          as: 'reviewer',
          attributes: ['id', 'username', 'fullname']
        }],
      }).then((createdReview) => {
        req.createdReview = createdReview;
        next();
      });
    }).catch(() => {
      serverError(res);
    });
};

/**
 * @name fetchReviews
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Object} next - Express next middleware function
 * @return {*} void
 */
export const fetchReviews = (req, res, next) => {
  const { limit, offset } = getParams(req);
  RecipeReviews.findAndCountAll({
    where: {
      RecipeId: req.params.id
    },
    attributes: ['id', 'RecipeId', 'createdAt', 'review'],
    include: [{
      model: db.Users,
      as: 'reviewer',
      attributes: ['id', 'username', 'fullname']
    }],
    limit,
    offset,
    order: [['id', 'DESC']],
  }).then(({ count, rows }) => {
    sendPaginatedData('reviews', { rows, count, limit }, res);
    if (req.createdReview) next();
  }).catch(() => {
    serverError(res);
  });
};
