module.exports = (sequelize, DataTypes) => {
  const FavRecipe = sequelize.define('FavRecipe', {
    UserId: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    RecipeId: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
  });
  return FavRecipe;
};
