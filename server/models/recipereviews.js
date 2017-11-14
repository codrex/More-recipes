module.exports = (sequelize, DataTypes) => {
  const RecipeReviws = sequelize.define('RecipeReviews', {
    review: {
      allowNull: false,
      type: DataTypes.TEXT,
    },
    ReviewerId: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    RecipeId: {
      allowNull: true,
      type: DataTypes.INTEGER,
    },
  });
  return RecipeReviws;
};
