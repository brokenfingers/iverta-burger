import {
  IBurgerBuilderActionType,
  IngredientNames,
  Ingredients,
} from "../../Interfaces";
import { axiosOrders } from "../../axios-orders";
import * as actionTypes from "./actionTypes";

export const addIngredient = (name: IngredientNames) => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    ingredientName: name,
  };
};

type removeIngredientsType = IBurgerBuilderActionType & {
  ingredientName: IngredientNames;
};

export const removeIngredient = (name: IngredientNames) => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    ingredientName: name,
  };
};

type setIngredientsType = IBurgerBuilderActionType & {
  ingredients: Ingredients;
};

// export type burgerBuilderActionTypes =
//   | (IBurgerBuilderActionType & { ingredients: Ingredients })
//   | {
//       ingredientName: IngredientNames;
//     };

export const setIngredients = (ingredients: Ingredients) => {
  return {
    type: actionTypes.SET_INGREDIENTS,
    ingredients,
  };
};

export const fetchIngredientsFailed = () => {
  return {
    type: actionTypes.FETCH_INGREDIENTS_FAILED,
  };
};

type InitIngredients = () => (dispatch: Function) => void;

export const initIngredients: InitIngredients = () => {
  return (dispatch) => {
    axiosOrders
      .getIngredients()
      .then((response) => {
        dispatch(setIngredients(response));
      })
      .catch((error) => {
        dispatch(fetchIngredientsFailed());
      });
  };
};
