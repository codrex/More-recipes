import db from './models/index';

const Users = db.Users;
const Recipes = db.Recipes;
const PostedRecipes = db.PostedRecipes;

const associate = () => {
  Users.belongsToMany(Recipes, { through: PostedRecipes });
  Users.sync();
  Recipes.belongsTo(Users);
  Recipes.sync();
};
export default associate;
