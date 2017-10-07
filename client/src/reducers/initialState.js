const initailState = {
  Recipes: [],
  newRecipe: {
    id: undefined,
    recipeName: '',
    category: '',
    ingredients: [],
    directions: [],
  },
  ajaxRequestRunning: 0
};

export default initailState;
