import {
  IngredientNames,
  Ingredients,
} from "../../Interfaces";
import { axiosOrders } from "../../axios-orders";
import * as actionTypes from "./actionTypes";
import { TDispatch } from "../store";


export const addIngredient = (name: IngredientNames) => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    ingredientName: name,
  };
};

export const removeIngredient = (name: IngredientNames) => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    ingredientName: name,
  };
};


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

export type setIngredientsType = {
  type: typeof actionTypes.SET_INGREDIENTS,
  ingredients: Ingredients
}

type fetchIngredientsFailedType = {
  type: typeof actionTypes.FETCH_INGREDIENTS_FAILED,
};

export function initIngredients() {
  return async (dispatch: TDispatch) => {

    axiosOrders
      .getIngredients()
      .then((response) => {
        dispatch(setIngredients(response) as setIngredientsType);
      })
      .catch((error) => {
        dispatch(fetchIngredientsFailed() as fetchIngredientsFailedType);
      });


  }
}
