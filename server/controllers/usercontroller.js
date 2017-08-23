const Members = require('../models/index').Members;
const db = require('../models/index');
const validator = require('../validators/validator.js');
const constraints = require('../validators/constraints');
const generateToken = require('../auth/auth').generateToken;
const UserGroups = require('../models/index').UserGroup;
const reply = require('./reply');

const whitelist = {
  id: true,
  username: true,
  fullname: true,
  phone: true,
  email: true,
  isOnline: true,
};
const whitelistLogin = {
  username: true,
  fullname: true,
  phone: true,
  email: true,
  isOnline: true,
};

module.exports = {
  getMembers: (req, res) => {
    Members.findAll({
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'password'],
      },
    }).then(Users => {
      if (Users === null) {
        reply.sendFail(res, 404, 'no member found');
        return;
      }
      reply.sendSuccess(res, 200, 'Users', Users);
    });
  },
  validateSignup: (req, res, next) => {
    req.body.fullname = req.body.fullname && req.body.fullname.replace(/\s+/, ' ');
    const user = {
      username: req.body.username,
      password: req.body.password,
      fullname: req.body.fullname,
      phone: req.body.phone,
      email: req.body.email,
    };
    const validate = validator.validateSignup(user);
    if (validate.valid) {
      req.body = user;
      next();
    } else {
      reply.sendValidationError(res, validate);
      res.end();
    }
  },
  checkEmailUniqueness: (req, res, next) => {
    Members.findOne({
      where: { email: req.body.email },
    }).then(member => {
      if (member === null) {
        next();
      } else {
        reply.sendFail(res, 400, 'Email supplied is already in use');
      }
    }).catch(() => {
      reply.serverError(res);
    });
  },
  checkUsernameUniqueness: (req, res, next) => {
    Members.findOne({
      where: { username: req.body.username },
    }).then(member => {
      if (member === null) {
        next();
      } else {
        reply.sendFail(res, 400, 'Username supplied is already in use');
      }
    }).catch(() => {
      reply.serverError(res);
    });
  },
  signUp: (req, res) => {
    Members.create(req.body)
      .then(member => {
        const User = validator.cleanUp(whitelist, member.dataValues);
        reply.sendSuccess(res, 200, 'User', User);
      }).catch(() => {
        reply.serverError(res);
      });
  },

    // authenticate user
  login: (req, res) => {
    const user = {
      username: req.body.username,
      password: req.body.password,
    };
    const validate = validator.validateLogin(user);
    // this section logins in a user into the system
    if (validate.valid) {
      Members.findOne({
        where: { username: user.username },
      }).then(member => {
        if (member === null) {
          // username was not found in dbase
          reply.sendFail(res, 400, 'Invalid username');
        } else {
          // verify password
          if (validator.comparePwd(member.dataValues.password, user.password)) {
            const User = validator.cleanUp(whitelistLogin, member.dataValues);
            User.token = (generateToken({ id: member.dataValues.id }));
            reply.sendSuccess(res, 200, 'User', User);
          } else {
            reply.sendFail(res, 400, 'Invalid username or password');
          }
        }
      });
    } else {
      res.sendValidationError(res, validate);
    }
  },
  isUserValid: (req, res, next) => {
    /*
      checking if user is valid
      prevent unregister user from been added to a group
     */

    if (typeof req.body !== 'object') {
      reply.sendFail(res, 404, 'User not found');
    }
    if (!req.body.username && !req.body.email && !req.body.id) {
      reply.sendFail(res, 404, 'User not found');
      return;
    }
    Members.findOne({
      where: req.body.username && { username: req.body.username }
      || req.body.email && { email: req.body.email } || req.body.id && { id: req.body.id },
    }).then(user => {
      if (user === null) {
        reply.sendFail(res, 404, 'User not found');
        res.end();
      } else {
        req.body.newGroupMemberId = user.dataValues.id;
        next();
      }
    }).catch(() => {
      reply.serverError(res);
    });
  },
  isGroupAdmin: (req, res, next) => {
    /*  checking if the user that is adding another user
        to a group is the admin of the group
        **Only an admin have the right to add member to a group**
     */
    const ids = {
      GroupId: req.params.groupid,
      MemberId: req.requestId,
    };
    const validate = validator.validateAll(ids, constraints.addMemberConstraint);
    if (validate.valid) {
      UserGroups.findOne({
        where: ids,
      }).then(admin => {
        if (admin === null) {
          reply.sendFail(res, 404, 'No group admin found for user');
        } else {
          next();
        }
      }).catch(() => {
        reply.serverError(res);
      });
    } else {
      reply.sendValidationError(res);
    }
  },

  getCreatedGroups: (req, res) => {
    Members.findOne({
      where: { id: req.requestId },
      attributes: ['username', 'id'],
      include: [{
        model: db.Groups, as: 'createdGroups',
        attributes: {
          exclude: ['createdAt', 'updatedAt'],
        },
        through: {
          attributes: [],
        },
      }],
    }).then(member => {
      if (member === null) {
        reply.sendFail(res, 404, 'User not found');
        return;
      }
      res.status(200).send({
        status: 'success',
        User: member,
      });
    }).catch(() => {
      reply.serverError(res);
    });
  },
  getGroupsJoined: (req, res) => {
    Members.findOne({
      where: { id: req.requestId },
      attributes: ['username', 'id'],
      include: [{
        model: db.Groups, as: 'joinedGroups',
        attributes: {
          exclude: ['createdAt', 'updatedAt'],
        },
        through: {
          attributes: [],
        },
      }],
    }).then(User => {
      if (User === null) {
        reply.sendFail(res, 404, 'User not found');
        return;
      }
      reply.sendSuccess(res, 200, 'User', User);
    }).catch(() => {
      reply.serverError(res);
    });
  },
  validateIds: (req, res, next) => {
    const data = {
      MemberId: req.requestId,
      GroupId: req.body.groupId || req.params.groupid,
    };
    const validate =
    validator.validateAll(data, constraints.addMemberConstraint);
    if (validate.valid) {
      next();
    } else {
      reply.sendValidationError(res, validate);
      res.end();
    }
  },
  leaveGroup: (req, res) => {
    Members.findById(req.requestId)
      .then(member => {
        member.removeJoinedGroups(req.body.groupId)
        .then(() => {
          reply.sendSuccess(res, 200, 'Leave group request was successful ');
        }).catch(() => {
          reply.sendFail(res, 400, 'Leave group request was not successful');
        });
      }).catch(error => {
        reply.serverError(res);
      });
  },
};
