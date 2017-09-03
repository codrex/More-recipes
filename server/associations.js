import db from './models/index';

const Users = db.Users;
const Recipes = db.Recipes;
const PostedRecipes = db.PostedRecipes;
const FavRecipe = db.FavRecipe;
const RecipeReviews = db.RecipeReviews;
const UpVotes = db.UpVotes;
const DownVotes = db.DownVotes;

const associate = () => {
  Users.belongsToMany(Recipes, { through: PostedRecipes });
  Users.belongsToMany(Recipes, { through: FavRecipe, as: 'favRecipes' });
  Users.sync();

  Recipes.belongsTo(Users);
  Recipes.hasMany(RecipeReviews);
  Recipes.hasMany(UpVotes);
  Recipes.hasMany(DownVotes);
  Recipes.sync();

  RecipeReviews.belongsTo(Users, { as: 'Reviewer' });
  RecipeReviews.sync();
};

export default associate;
