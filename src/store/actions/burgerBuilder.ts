import { IBurgerBuilderActionType, IngredientNames } from '../../Interfaces'
import * as actionTypes from './actionTypes'

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