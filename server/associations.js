const Groups = require('./models/index.js').Groups;
const Members = require('./models/index.js').Members;
const Messages = require('./models/index.js').Messages;
const GroupMembers = require('./models/index.js').GroupMembers;
const UserGroup = require('./models/index.js').UserGroup;
const Viewers = require('./models/index.js').Viewers;
const GroupMessages = require('./models/index.js').GroupMessages;

module.exports = {
  associate: () => {
    Members.belongsToMany(Groups, { through: GroupMembers, as: 'joinedGroups' });
    Members.belongsToMany(Groups, { through: UserGroup, as: 'createdGroups' });
    Members.sync();

    Groups.belongsToMany(Members, { through: GroupMembers, as: 'groupMembers' });
    Groups.belongsToMany(Members, { through: UserGroup, as: 'admin' });
    Groups.belongsToMany(Messages, { through: GroupMessages });
    Groups.sync();

    Messages.belongsTo(Groups, { as: 'group' });
    Messages.belongsToMany(Members, { through: Viewers, as: 'viewers' });
    Messages.belongsTo(Members, { as: 'sender' });
    Messages.sync();
  },

};
