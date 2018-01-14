module.exports = (sequelize, DataTypes) => {
  const Recipes = sequelize.define('Recipes', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ingredients: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
    stringIngredients: {
      type: DataTypes.TEXT,
      allowNull: false,
      set() {
        const ingredients = this.get('ingredients');
        this.setDataValue('stringIngredients', ingredients.join().toLowerCase());
      },
    },
    directions: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
    image: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: 'none'
    },
    upVotes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    downVotes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    views: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    favRecipesId: {
      allowNull: true,
      type: DataTypes.INTEGER,
    },
    ownerId: {
      allowNull: true,
      type: DataTypes.INTEGER,
    },
    createdRecipesId: {
      allowNull: true,
      type: DataTypes.INTEGER,
    },
    UserId: {
      allowNull: true,
      type: DataTypes.INTEGER,
    },
  });
  return Recipes;
};
