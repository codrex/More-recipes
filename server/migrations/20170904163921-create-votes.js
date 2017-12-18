module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Votes', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    voterId: {
      allowNull: false,
      type: Sequelize.INTEGER,
    },
    recipeId: {
      allowNull: true,
      type: Sequelize.INTEGER,
    },
    upVote: {
      allowNull: false,
      type: Sequelize.BOOLEAN,
    },
    downVote: {
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

  down: queryInterface => queryInterface.dropTable('Votes'),
};
