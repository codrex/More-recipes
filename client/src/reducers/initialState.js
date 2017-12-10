import { getToken, hasToken } from '../utils/auth/auth';

const initailState = {
  recipes: [],
  recipe: {
    id: undefined,
    name: '',
    category: '',
    ingredients: [],
    directions: [],
    recipeReviews: [],
    image: JSON.stringify({
      publicId: '',
      secureUrl: '',
      signature: '',
      thumbnailUrl: '',
      url: '',
    }),
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
  },
  recipeValidationError: {
  }
};

export default initailState;
