import { Ingredients } from "../Interfaces";
import * as actionTypes from "./actions";

const initialState = {
  ingredients: {
    salad: 0,
    bacon: 0,
    cheese: 0,
    meat: 0,
  },
  totalPrice: 4,
};

interface IAction {
  type: string;
  ingredientName: keyof Ingredients;
}

const reducer = (state = initialState, action: IAction) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients["salad"] + 1,
        },
      };
    case actionTypes.REMOVE_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients["salad"] - 1,
        },
      };
    default:
      return state;
  }
  return state;
};

export default reducer;
