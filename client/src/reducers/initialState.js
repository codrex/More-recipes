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
  user: {
    email: '',
    username: '',
    fullname: '',
    profilePicture: '',
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
