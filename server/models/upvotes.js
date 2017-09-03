module.exports = (sequelize, DataTypes) => {
  const UpVotes = sequelize.define('UpVotes', {
    UserId: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    RecipeId: {
      allowNull: true,
      type: DataTypes.INTEGER,
    },
    vote: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
    },
  });
  return UpVotes;
};
