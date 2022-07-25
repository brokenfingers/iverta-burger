import { IOrder } from "../../Interfaces";
import * as actionTypes from "../actions/actionTypes";

const initialState = {
  orders: [] as IOrder[],
  // orders: [] as { [key: string]: {} },
  loading: false,
  purchased: false
};

type actionTypes = {
  type: keyof typeof actionTypes;
  orderData: IOrder;
  orderId: string;
};

type orderReducerReturnType = { loading: boolean, orders: IOrder[], purchased: boolean }

const orderReducer = (state: typeof initialState = initialState, action: actionTypes): orderReducerReturnType => {
  switch (action.type) {
    case actionTypes.PURCHASE_INIT:
      return {
        ...state,
        purchased: false
      }
    case actionTypes.PURCHASE_BURGER_START:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.PURCHASE_BURGER_SUCCESS:
      const newOrder = { ...action.orderData, id: action.orderId };
      // return { ...state, loading: false }

      return { ...state, loading: false, purchased: true, orders: state.orders.length ? [...state.orders, newOrder] : [newOrder] }

    case actionTypes.PURCHASE_BURGER_FAIL:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
  return state
};

export default orderReducer;
