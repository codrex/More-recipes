import db from '../models/index';
import { serverError } from '../reply/reply';

const Votes = db.Votes;

export const createUpVote = (req, res, next) => {
  const upVote = {
    upVote: true,
    downVote: false,
    voterId: req.requestId,
    RecipeId: req.params.id,
  };
  Votes.findOne({
    where: {
      voterId: req.requestId,
      RecipeId: req.params.id,
    },
  }).then(vote => {
    if (!vote) {
      Votes.create(upVote)
      .then(() => {
        next();
      });
    } else {
      if (vote.dataValues.downVote) {
        upVote.id = vote.dataValues.id;
        vote.update(upVote, { fields: ['id', 'upVote', 'downVote'] })
        .then(() => {
          next();
        });
      } else {
        vote.destroy({ force: true }).then(() => {
          next();
        });
      }
    }
  }).catch(error => {
    serverError(res, error);
  });
};

export const createDownVote = (req, res, next) => {
  const downVote = {
    upVote: false,
    downVote: true,
    voterId: req.requestId,
    RecipeId: req.params.id,
  };
  Votes.findOne({
    where: {
      voterId: req.requestId,
      RecipeId: req.params.id,
    },
  }).then(vote => {
    if (!vote) {
      Votes.create(downVote)
      .then(() => {
        next();
      });
    } else {
      if (vote.dataValues.upVote) {
        downVote.id = vote.dataValues.id;
        vote.update(downVote, { fields: ['id', 'upVote', 'downVote'] })
        .then(() => {
          next();
        });
      } else {
        vote.destroy({ force: true }).then(() => {
          next();
        });
      }
    }
  }).catch(error => {
    serverError(res, error);
  });
};

export const countVote = (req, res, next) => {
  Votes.count({ where: { upVote: true, RecipeId: req.params.id } })
  .then(upvote => {
    req.body.upVotes = upvote;
    Votes.count({ where: { downVote: true, RecipeId: req.params.id } })
    .then(downvote => {
      req.body.downVotes = downvote;
      next();
    });
  }).catch(error => {
    serverError(res, error);
  });
};
