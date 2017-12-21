import db from './models/index';

const Users = db.Users;
const Recipes = db.Recipes;
const RecipeReviews = db.RecipeReviews;

const associate = () => {
  Users.hasMany(Recipes, {
    as: 'favRecipes',
    foreignKey: 'favRecipesId',
    sourceKey: 'id'
  });
  Users.hasMany(Recipes, {
    as: 'createdRecipes',
    foreignKey: 'createdRecipesId',
    sourceKey: 'id'
  });
  Users.sync();

  Recipes.belongsTo(Users, {
    as: 'owner'
  });
  Recipes.hasMany(RecipeReviews, {
    as: 'review'
  });
  Recipes.belongsToMany(Users, {
    as: 'favoriteUsers',
    through: db.FavRecipe
  });

  Recipes.sync();

  RecipeReviews.belongsTo(Users, {
    as: 'reviewer'
  });
  RecipeReviews.sync();
};

export default associate;
