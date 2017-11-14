module.exports = (sequelize, DataTypes) => {
  const Viewers = sequelize.define('Viewers', {
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    recipeId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
  });
  return Viewers;
};
