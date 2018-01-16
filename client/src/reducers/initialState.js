import { getToken, hasToken } from '../utils/auth';

const initialState = {
  currentStatusCode: 0,
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
    success: true,
    msg: '',
    loading: true,
    requestCount: 0,
  },
  recipeValidationError: {
  }
};

export default initialState;
