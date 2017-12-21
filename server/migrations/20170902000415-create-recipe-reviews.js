module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('RecipeReviews', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    review: {
      allowNull: false,
      type: Sequelize.TEXT,
    },
    ReviewerId: {
      allowNull: false,
      type: Sequelize.INTEGER,
    },
    RecipeId: {
      allowNull: true,
      type: Sequelize.INTEGER,
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
  down: queryInterface => queryInterface.dropTable('RecipeReviews'),
};
