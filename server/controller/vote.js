import { Votes } from '../models/index';
import { sendServerError, sendSuccess } from '../utils/responder';

/**
 * @description update recipe vote
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
 * @description handles the voting proccess for a paticular recipe
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
  let voteData = {
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
    voteData = {
      ...voteData,
      voterId: req.requestId,
      recipeId: req.params.id
    };

    if (!vote) {
      Votes.create(voteData)
        .then(() => {
          next();
        });
    } else if (up || down) {
      updateVote(vote, voteData, next);
    } else {
      vote.destroy({
        force: true
      }).then(() => {
        next();
      });
    }
  }).catch(() => {
    sendServerError(res);
  });
};

/**
 * @name countVote
 * @description get the number of upvotes and downvotes for a particular recipe
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
      sendServerError(res);
    });
};

/**
 * @name fetchVotes
 * @function
 * @description get vote records for an array of recipes
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
    sendServerError(res);
  });
};

