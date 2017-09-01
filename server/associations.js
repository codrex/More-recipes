import db from './models/index';

const Users = db.Users;
const Recipes = db.Recipes;
const PostedRecipes = db.PostedRecipes;
const FavRecipe = db.FavRecipe;

const associate = () => {
  Users.belongsToMany(Recipes, { through: PostedRecipes });
  Users.belongsToMany(Recipes, { through: FavRecipe, as: 'favRecipes' });
  Users.sync();

  Recipes.belongsTo(Users);
  Recipes.sync();
};
export default associate;
