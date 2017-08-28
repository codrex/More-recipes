module.exports = (sequelize, DataTypes) => {
  const PostedRecipes = sequelize.define('PostedRecipes', {
    recipeId: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
  });
  return PostedRecipes;
};
