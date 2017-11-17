import { getToken, hasToken } from '../utils/auth/auth';

const initailState = {
  Recipes: [],
  Recipe: {
    id: undefined,
    recipeName: '',
    category: '',
    ingredients: [],
    directions: [],
    RecipeReviews: [],
    upVotes: 0,
    downVotes: 0,
  },
  User: {
    email: '',
    username: '',
    fullname: '',
    profilePix: '',
    favRecipes: [],
    createdRecipes: []
  },
  auth: {
    authenticated: hasToken(),
    token: getToken(),
    redirectTo: '/recipes'
  },
  networkRequest: {
    success: false,
    msg: '',
    loading: false,
    requestCount: 0,
  }
};

export default initailState;
