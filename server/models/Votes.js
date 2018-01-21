module.exports = (sequelize, DataTypes) => {
  const UpVotes = sequelize.define('Votes', {
    voterId: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    recipeId: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    upVote: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
    },
    downVote: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
    },
  });
  return UpVotes;
};

