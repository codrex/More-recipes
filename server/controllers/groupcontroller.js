const Groups = require('../models/index').Groups;
const db = require('../models/index');
const GroupMembers = require('../models/index').GroupMembers;
const validator = require('../validators/validator');
const reply = require('./reply');

module.exports = {
  validateGroupId: (req, res, next) => {
    const gId = { id: req.params.groupid || req.body.groupId };
    const validate = validator.validateAll(gId, validator.constraint.idConstraint);
    if (!validate.valid) {
      validate.error = validate.error.replace('Id', 'group id');
      reply.sendValidationError(res, validate);
      res.end();
    } else {
      next();
    }
  },
  validateGroupData: (req, res, next) => {
    const groupData = {
      name: req.body.name,
      about: req.body.about,
    };
    const validate = validator.validateGroupCreation(groupData);
    if (validate.valid) {
      req.body = groupData;
      next();
    } else {
      reply.sendValidationError(res, validate);
    }
  },
  createGroup: (req, res, next) => {
    Groups.create(req.body)
      .then(group => {
        group.setAdmin(req.requestId)
        .then(() => {
          group.addGroupMembers(req.requestId)
          .then(() => {
            req.body.groupId = group.dataValues.id;
            next();
          });
        });
      }).catch(() => {
        reply.serverError(res);
      });
  },
  addMember: (req, res) => {
    const ids = {
      memberId: req.body.newGroupMemberId,
      groupId: parseInt(req.params.groupid, 10),
    };
    Groups.findById(ids.groupId)
      .then(group => {
        group.addGroupMembers(ids.memberId)
          .then(() => {
            Groups.findOne({
              where: { id: ids.groupId },
              attributes: {
                exclude: ['createdAt', 'updatedAt', 'about'],
              },
              include: [
                {
                  model: db.Members, as: 'groupMembers',
                  where: { id: ids.memberId },
                  attributes: {
                    exclude: ['createdAt', 'updatedAt', 'password'],
                  },
                },
              ],
            }).then(Group => reply.sendSuccess(res, 200, 'Group', Group));
          });
      }).catch(() => {
        reply.serverError(res);
      });
  },
  alreadyAMember: (req, res, next) => {
    GroupMembers.findOne({
      where: {
        MemberId: req.body.newGroupMemberId,
        GroupId: parseInt(req.params.groupid, 10),
      },
    }).then(gMember => {
      if (gMember === null) {
        next();
      } else {
        reply.sendFail(res, 400, 'User already belong to this group');
      }
    });
  },
  isGroupMember: (req, res, next) => {
    GroupMembers.findOne({
      where: {
        MemberId: req.requestId,
        GroupId: req.body.groupId || parseInt(req.params.groupid, 10),
      },
    }).then(gMember => {
      if (gMember === null) {
        reply.sendFail(res, 404, 'User is not a member of this group');
      } else {
        next();
      }
    });
  },
  isValidGroup: (req, res, next) => {
    const groupId = parseInt(req.params.groupid, 10);
    Groups.findById(groupId)
      .then(group => {
        if (group === null) {
          reply.sendFail(res, 404, 'Group was not found');
        } else {
          req.body.groupId = groupId;
          next();
        }
      }).catch(() => {
        reply.serverError(res);
      });
  },
  getGroupMembers: (req, res) => {
    const gId = parseInt(req.params.groupid, 10);
    Groups.findOne({
      where: { id: gId },
      include: [{
        model: db.Members, as: 'groupMembers',
        attributes: {
          exclude: ['createdAt', 'updatedAt', 'password'],
        },
        through: {
          attributes: [],
        },
      }],
    }).then(groupmembers => {
      if (groupmembers === null) {
        reply.sendFail(res, 404, 'Group was not found');
        return;
      }
      const Members = groupmembers.dataValues.groupMembers;
      reply.sendSuccess(res, 200, 'Members', Members);
    });
  },
  getGroupAdmin: (req, res) => {
    const gId = parseInt(req.params.groupid, 10);
    Groups.findOne({
      where: { id: gId },
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'about'],
      },
      include: [{
        model: db.Members, as: 'admin',
        attributes: {
          exclude: ['createdAt', 'updatedAt', 'password'],
        },
        through: {
          attributes: [],
        },
      }],
    }).then(Group => {
      if (Group === null) {
        reply.sendFail(res, 404, 'Group was not found');
        return;
      }
      reply.sendSuccess(res, 200, 'Group', Group);
    }).catch(() => {
      reply.serverError(res);
    });
  },
  getMessages: (req, res) => {
    const gId = parseInt(req.params.groupid, 10);
    Groups.findOne({
      where: { id: gId },
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'about'],
      },
      include: [{
        model: db.Messages,
        attributes: {
          exclude: ['createdAt', 'updatedAt'],
        },
        through: {
          attributes: [],
        },
      }],
    }).then(GroupMessages => {
      reply.sendSuccess(res, 200, 'GroupMessages', GroupMessages);
    }).catch(() => {
      reply.serverError(res);
    });
  },
  getGroups: (req, res) => {
    Groups.findAll({
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
    }).then(AllGroup => {
      reply.sendSuccess(res, 200, 'Groups', AllGroup);
    });
  },
  getGroup: (req, res) => {
    const gId = { id: req.params.groupid || req.body.groupId };
    Groups.findOne({
      where: gId,
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
      include: [
        {
          model: db.Members, as: 'admin',
          attributes: {
            exclude: ['createdAt', 'updatedAt', 'password'],
          },
          through: {
            attributes: [],
          },
        },
        {
          model: db.Members, as: 'groupMembers',
          attributes: {
            exclude: ['createdAt', 'updatedAt', 'password'],
          },
          through: {
            attributes: [],
          },
        },
        {
          model: db.Messages,
          attributes: {
            exclude: ['createdAt', 'updatedAt'],
          },
          through: {
            attributes: [],
          },
        },
      ],
    }).then(Group => {
      if (Group === null) {
        reply.sendFail(res, 404, 'No group found');
        return;
      }
      reply.sendSuccess(res, 200, 'Group', Group);
    });
  },
  removeMember: (req, res) => {
    const ids = {
      memberId: parseInt(req.body.memberId, 10),
      groupId: parseInt(req.params.groupid, 10),
    };
    Groups.findById(ids.groupId)
      .then(group => {
        group.removeGroupMembers(ids.memberId)
          .then(() => {
            Groups.findOne({
              where: { id: ids.groupId },
              attributes: {
                exclude: ['createdAt', 'updatedAt', 'about'],
              },
              include: [
                {
                  model: db.Members, as: 'groupMembers',
                  where: { id: ids.memberId },
                  attributes: {
                    exclude: ['createdAt', 'updatedAt', 'password'],
                  },
                },
              ],
            }).then(Group => reply.sendSuccess(res, 200, 'Group', Group));
          }).catch(() => {
            reply.sendFail(res, 400, 'Request was unsuccessful, please try again');
          });
      }).catch(() => {
        reply.serverError(res);
      });
  },
};
