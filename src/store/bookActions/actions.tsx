import { ActionCreatorWithPayload, createAction } from "@reduxjs/toolkit"

export const addIngredients = createAction('addIngredients')
export const removeIngredients = createAction('removeIngredients')



export const ADD_INGREDIENT = 'ADD_INGREDIENT'
export const REMOVE_INGREDIENT = 'REMOVE_INGREDIENT'
