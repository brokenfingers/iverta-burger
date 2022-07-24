import { IBurgerBuilderActionType, IngredientNames, Ingredients } from '../../Interfaces'
import { axiosOrders } from '../../axios-orders'
import * as actionTypes from './actionTypes'
import { AppDispatch } from '../store'
import { Dispatch } from 'react'

export const addIngredient = (name: IngredientNames): IBurgerBuilderActionType => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: name
    }
}

export const removeIngredient = (name: IngredientNames): IBurgerBuilderActionType => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: name
    }
}

export const setIngredients = (ingredients: Ingredients): { type: keyof typeof actionTypes } & { ingredients: Ingredients } => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients
    }
}

type setIngredientsType = typeof setIngredients

export const fetchIngredientsFailed = () => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED
    }
}

type fetchIngredientsFailedType = typeof fetchIngredientsFailed


const nes = store.dispatch


export const initIngredients = () => {
    return (dispatch: (A: fetchIngredientsFailedType) => {}) => {
        axiosOrders
            .getIngredients()
            .then((response) => {
                // dispatch(setIngredients(response))
                dispatch(fetchIngredientsFailed())
            })
        // .catch((error) => {
        //     dispatch(fetchIngredientsFailed())
        // });
    }
}