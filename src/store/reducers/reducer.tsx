import { Ingredients } from "../../Interfaces";
import * as actions from "../bookActions/actions";


interface IActions {
    type: string,
    payload?: {}
}


const initState = {
    ingredients: {} as Ingredients,
    totalPrice: 4,
}

console.log(actions.addIngredients())

const reducer = (state = initState, action: IActions) => {
    switch (action.type) {
        case actions.ADD_INGREDIENT:
            break;
        case actions.REMOVE_INGREDIENT:
            break;
        default:
            return state


    }
}

export default reducer