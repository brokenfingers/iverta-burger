import { createReducer } from "@reduxjs/toolkit";
import * as actions from '../bookActions/actions'

const initState = {
    ingredients: [] as string[]
}

const ingredientReducer = createReducer(initState, (builder) => {
    builder.addCase(actions.addIngredients, (state, action) => {
        state.ingredients.push('add')  //action.payload
    }).addCase(actions.removeIngredients, (state, action) => {
        state.ingredients.push('remove')  //action.payload
    })
})

export default ingredientReducer