import { getToken, hasToken } from '../utils/auth/auth';

const initailState = {
  recipes: [],
  favouriteRecipes: [],
  pageCount: 0,
  recipe: {
    id: undefined,
    name: '',
    category: '',
    ingredients: [],
    directions: [],
    reviews: [],
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
    createdRecipes: [],
    votes: []
  },
  auth: {
    authenticated: hasToken(),
    token: getToken(),
    redirectTo: '/recipes'
  },
  networkRequest: {
    success: false,
    msg: ' l',
    loading: false,
    requestCount: 0,
  },
  recipeValidationError: {
  }
};

export default initailState;
