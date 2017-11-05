const initailState = {
  Recipes: [],
  Recipe: {
    id: undefined,
    recipeName: '',
    category: '',
    ingredients: [],
    directions: []
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
    authenticated: false,
    token: '',
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
