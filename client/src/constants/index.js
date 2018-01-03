export const RECIPE_ADDED = 'Recipe was successfully posted';
export const RECIPE_MODIFIED = 'Recipe was successfully modified';
export const REVIEW_MESSAGE = 'Review posted';
export const CATEGORIES = [
  { value: 'breakfast', label: 'Breakfast' },
  { value: 'brunch', label: 'Brunch' },
  { value: 'lunch', label: 'Lunch' },
  { value: 'snacks', label: 'Snacks' },
  { value: 'appertisers', label: 'Appertisers' },
  { value: 'dinner', label: 'Dinner' },
  { value: 'soup', label: 'Soup' },
  { value: 'noodles', label: 'Noodles' },
  { value: 'vegeterian', label: 'Vegeterian', },
  { value: 'salads', label: 'Salads' },
  { value: 'sides', label: 'Sides' },
  { value: 'sauces', label: 'Sauces' },
  { value: 'baking', label: 'Baking' },
  { value: 'desserts', label: 'Desserts' },
  { value: 'drinks', label: 'Drinks' },
  { value: 'cookies and candy', label: 'Cookies and Candy' },
  { value: 'miscellaneous', label: 'Miscellaneous' },
];
export const LIMIT = 12;
export const REVIEW_LIMIT = 5;
export const DEFAULT_PIX = 'https://res.cloudinary.com/resycom/image/upload/c_scale,q_53,w_2543/v1509718851/eaters-collective-132773_izkarh.jpg';
export const DEFAULT_RECIPE_PIX = 'recipes/s9ej2m9vcvagobqadebh.jpg';
export const DEFAULT_RECIPE_PIX_URL = 'http://res.cloudinary.com/resycom/image/upload/v1513684501/recipes/s9ej2m9vcvagobqadebh.jpg';
export const PROFILE_PAGE_PIX = 'https://res.cloudinary.com/resycom/image/upload/c_scale,h_728,q_51/v1510430032/lily-lvnatikk-365344_nv94dc.jpg';
export const CAROUSEL_PIX_ONE = 'https://res.cloudinary.com/resycom/image/upload/c_scale,q_57,w_2057/v1509718828/eaters-collective-172257_qxlazk.jpg';
export const CAROUSEL_PIX_TWO = 'https://res.cloudinary.com/resycom/image/upload/c_scale,q_53,w_2543/v1509718851/eaters-collective-132773_izkarh.jpg';
export const PRODUCTION_URL = 'https://more-recipesrex.herokuapp.com';
export const DEVELOPMENT_URL = 'http://127.0.0.1:8000';
export const PROTECTED_ROUTES = {
  Recipes: '/recipes',
  'Top Recipes': '/top-recipes',
  'Add Recipe': '/create'
};
export const UNPROTECTED_ROUTES = {
  login: '/login',
  'create account': '/create-account'
};
