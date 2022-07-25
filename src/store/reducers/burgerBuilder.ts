
import {
  IngredientNames,
  Ingredients,
} from "../../Interfaces";
import * as actionTypes from "../actions/actionTypes";
// import { burgerBuilderActionTypes } from "../actions/burgerBuilder";

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

const reducer = (state = initialState, action: actionTypeSelection) => {
  let newState = { ...state };
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] + 1,
        },
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
      };
    case actionTypes.REMOVE_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName]
            ? state.ingredients[action.ingredientName] - 1
            : 0,
        },
        totalPrice:
          state.ingredients[action.ingredientName] &&
          state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
      };
    case actionTypes.SET_INGREDIENTS:
      return {
        ...state,
        ingredients: {
          salad: action.ingredients.salad,
          bacon: action.ingredients.bacon,
          cheese: action.ingredients.cheese,
          meat: action.ingredients.meat,
        },
        error: false,
      };
    case actionTypes.FETCH_INGREDIENTS_FAILED:
      return {
        ...state,
        error: true,
      };
    default:
      return newState;
  }
};

export default reducer;
