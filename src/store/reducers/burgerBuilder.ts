import { IngredientNames, Ingredients } from "../../Interfaces";
import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  ingredients: {} as Ingredients,
  totalPrice: 4,
  error: false,
};

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

export type actionAddIngredients = {
  type: typeof actionTypes.ADD_INGREDIENT;
  ingredientName: IngredientNames;
};

export type actionRemoveIngredients = {
  type: typeof actionTypes.REMOVE_INGREDIENT;
  ingredientName: IngredientNames;
};

export type actionSetIngredients = {
  type: typeof actionTypes.SET_INGREDIENTS;
  ingredients: Ingredients;
};
export type actionFetchIngredients = {
  type: typeof actionTypes.FETCH_INGREDIENTS_FAILED;
};

type actionTypeSelection =
  | actionAddIngredients
  | actionRemoveIngredients
  | actionSetIngredients
  | actionFetchIngredients;

const addIngredient = (
  state: typeof initialState,
  action: actionAddIngredients
) => {
  const updateAddIngredient = {
    [action.ingredientName]: state.ingredients[action.ingredientName] + 1,
  };
  const updateAddedIngredients = updateObject(
    state.ingredients,
    updateAddIngredient
  );
  const updateAddIngredientState = {
    ingredients: updateAddedIngredients,
    totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
  };
  return updateObject(state, updateAddIngredientState);
};
const removeIngredient = (
  state: typeof initialState,
  action: actionRemoveIngredients
) => {
  const updateRemoceIngredient = {
    [action.ingredientName]: state.ingredients[action.ingredientName] - 1,
  };
  const updateRemoveIngredients = updateObject(
    state.ingredients,
    updateRemoceIngredient
  );
  const updateRemoveIngredientsState = {
    ingredients: updateRemoveIngredients,
    totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
  };
  return updateObject(state, updateRemoveIngredientsState);
};

const setIngredient = (
  state: typeof initialState,
  action: actionSetIngredients
) => {
  return updateObject(state, {
    ingredients: {
      salad: action.ingredients.salad,
      bacon: action.ingredients.bacon,
      cheese: action.ingredients.cheese,
      meat: action.ingredients.meat,
    },
    totalPrice: 4,
    error: false,
  });
};

const fetchIngredientsFail = (state: typeof initialState) => {
  return updateObject(state, { error: true });
};

const reducer = (state = initialState, action: actionTypeSelection) => {
  let newState = { ...state };
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return addIngredient(state, action);
    case actionTypes.REMOVE_INGREDIENT:
      return removeIngredient(state, action);
    case actionTypes.SET_INGREDIENTS:
      return setIngredient(state, action);
    case actionTypes.FETCH_INGREDIENTS_FAILED:
      return fetchIngredientsFail(state);
    default:
      return newState;
  }
};

export default reducer;
