import { IBurgerBuilderActionType, IngredientNames, Ingredients } from "../../Interfaces";
import * as actionTypes from "../actions/actionTypes";

const initialState = {
  ingredients: {} as Ingredients,
  totalPrice: 4,
  error: false
};



const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

const reducer = (state = initialState, action: IBurgerBuilderActionType) => {
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
    default:
      return state;
  }
  return state;
};

export default reducer;
