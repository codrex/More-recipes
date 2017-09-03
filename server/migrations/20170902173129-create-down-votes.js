module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('DownVotes', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    UserId: {
      allowNull: false,
      type: Sequelize.INTEGER,
    },
    RecipeId: {
      allowNull: true,
      type: Sequelize.INTEGER,
    },
    vote: {
      allowNull: false,
      type: Sequelize.BOOLEAN,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  }),

  down: queryInterface => queryInterface.dropTable('DownVotes'),
};
