module.exports = (sequelize, DataTypes) => {
  const DownVotes = sequelize.define('DownVotes', {
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
  return DownVotes;
};
