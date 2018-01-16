module.exports = (sequelize, DataTypes) => {
  const RecipeReviews = sequelize.define('RecipeReviews', {
    review: {
      allowNull: false,
      type: DataTypes.TEXT,
    },
    reviewerId: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    RecipeId: {
      allowNull: true,
      type: DataTypes.INTEGER,
    },
  });
  return RecipeReviews;
};
