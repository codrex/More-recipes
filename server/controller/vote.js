import { Votes } from '../models/index';
import { serverError, sendSuccess } from '../utils/responder';

/**
 * @name updateVote
 * @function
 * @param {Object} voteInstance
 * @param {Object} voteData
 * @param {Object} next - Express next middleware function
 * @return {*} void
 */
const updateVote = (voteInstance, voteData, next) => {
  voteData.id = voteInstance.dataValues.id;
  voteInstance.update(voteData, {
    fields: ['id', 'upVote', 'downVote']
  })
    .then(() => {
      next();
    }).catch(() => {
    });
};

/**
 * @name VoteHandler
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Object} next - Express next middleware function
 * @return {*} void
 */
export const VoteHandler = (req, res, next) => {
  let { up, down } = req.query;
  if (up) up = JSON.parse(up.toLowerCase());
  if (down) down = JSON.parse(down.toLowerCase());
  const voteData = {
    upVote: up || false,
    downVote: down || false
  };
  Votes.findOne(
    {
      where: {
        voterId: req.requestId,
        recipeId: req.params.id,
      }
    }).then((vote) => {
    voteData.voterId = req.requestId;
    voteData.recipeId = req.params.id;
    if (!vote) {
      Votes.create(voteData)
        .then(() => {
          next();
        });
    } else if (up === true) {
      updateVote(vote, voteData, next);
    } else if (down === true) {
      updateVote(vote, voteData, next);
    } else {
      vote.destroy({
        force: true
      }).then(() => {
        next();
      });
    }
  }).catch(() => {
    serverError(res);
  });
};

/**
 * @name countVote
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Object} next - Express next middleware function
 * @return {*} void
 */
export const countVote = (req, res, next) => {
  Votes.count({
    where: {
      upVote: true,
      recipeId: req.params.id
    }
  })
    .then((upvote) => {
      req.body.upVotes = upvote;
      Votes.count({
        where: {
          downVote: true,
          recipeId: req.params.id
        }
      })
        .then((downvote) => {
          req.body.downVotes = downvote;
          next();
        });
    }).catch(() => {
      serverError(res);
    });
};

/**
 * @name fetchVotes
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Object} next - Express next middleware function
 * @return {*} void
 */
export const fetchVotes = (req, res) => {
  Votes.findAll({
    attributes: ['upVote', 'recipeId', 'downVote'],
    where: {
      voterId: req.requestId,
      recipeId: {
        $in: req.recipeIds
      },
    }
  }).then((votes) => {
    sendSuccess(res, 200, 'votes', votes);
  }).catch(() => {
    serverError(res);
  });
};

