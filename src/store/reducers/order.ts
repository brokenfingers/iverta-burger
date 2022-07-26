import { IOrder } from "../../Interfaces";
import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  orders: [] as IOrder[],
  // orders: [] as { [key: string]: {} },
  loading: false,
  purchased: false,
};

type actionTypes = {
  type: keyof typeof actionTypes;
  orderData: IOrder;
  orderId: string;
  orders: IOrder[];
};

export type orderReducerReturnType = {
  loading: boolean;
  orders: IOrder[];
  purchased: boolean;
};

const pucheseInit = (state: typeof initialState) => {
  return updateObject(state, { purchased: false });
};

const purchaseBurgerStart = (state: typeof initialState) => {
  return updateObject(state, { loading: true });
};

const purchaseBurgerSuccess = (
  state: typeof initialState,
  action: actionTypes
) => {
  const newOrder = updateObject(action.orderData, { id: action.orderId });

  return updateObject(state, {
    loading: false,
    purchased: true,
    orders: state.orders.concat(newOrder),
  });
};

const purchaseBurgerFail = (state: typeof initialState) => {
  return updateObject(state, { loading: false });
};

const fetchOrderStart = (state: typeof initialState) => {
  return updateObject(state, { loading: true });
};

const fetchOrdersSuccess = (
  state: typeof initialState,
  action: actionTypes
) => {
  return updateObject(state, { loading: false, orders: action.orders });
};

const fetchOrdersFail = (state: typeof initialState) => {
  return updateObject(state, { loading: false });
};

const orderReducer = (
  state: typeof initialState = initialState,
  action: actionTypes
): orderReducerReturnType => {
  switch (action.type) {
    case actionTypes.PURCHASE_INIT:
      return pucheseInit(state);
    case actionTypes.PURCHASE_BURGER_START:
      return purchaseBurgerStart(state);
    case actionTypes.PURCHASE_BURGER_SUCCESS:
      return purchaseBurgerSuccess(state, action);
    case actionTypes.PURCHASE_BURGER_FAIL:
      return purchaseBurgerFail(state);
    case actionTypes.FETCH_ORDERS_START:
      return fetchOrderStart(state);
    case actionTypes.FETCH_ORDERS_SUCCESS:
      return fetchOrdersSuccess(state, action);
    case actionTypes.FETCH_ORDERS_FAIL:
      return fetchOrdersFail(state);
    default:
      return state;
  }
};

export default orderReducer;
