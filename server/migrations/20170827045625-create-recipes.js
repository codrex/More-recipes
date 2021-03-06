module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Recipes', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    category: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    ingredients: {
      type: Sequelize.ARRAY(Sequelize.STRING),
      allowNull: false,
    },
    stringIngredients: {
      type: Sequelize.TEXT,
    },
    directions: {
      type: Sequelize.ARRAY(Sequelize.STRING),
      allowNull: false,
    },
    image: {
      type: Sequelize.TEXT,
      allowNull: false,
      defaultValue: 'none'
    },
    upVotes: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    downVotes: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    views: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    ownerId: {
      allowNull: true,
      type: Sequelize.INTEGER,
    },
    favRecipesId: {
      allowNull: true,
      type: Sequelize.INTEGER,
    },
    createdRecipesId: {
      allowNull: true,
      type: Sequelize.INTEGER,
    },
    UserId: {
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
  down: queryInterface => queryInterface.dropTable('Recipes'),
};
