import * as actionTypes from "./actionTypes";
import { axiosOrders } from "../../axios-orders";
import { TDispatch } from "../store";
import { IOrder } from "../../Interfaces";

export const purchaseBurgerSuccess = (id: string, orderData: IOrder) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderId: id,
    orderData,
  };
};
export const purchaseBurgerFail = (error: { message: string }) => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAIL,
    error,
  };
};

export const purchaseBurgerStart = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_START,
  };
};

export const purchaseBurger = (
  orderData: IOrder,
  token: string | null = null
) => {
  return (dispatch: TDispatch) => {
    dispatch(purchaseBurgerStart());
    axiosOrders
      .addOrder(orderData, token)
      .then((response) => {
        dispatch(purchaseBurgerSuccess(response.name, orderData));
      })
      .catch((err) => {
        dispatch(purchaseBurgerFail(err));
      });
  };
};

export const purchaseInit = () => {
  return {
    type: actionTypes.PURCHASE_INIT,
  };
};

export const fetchOrderSuccess = (orders: IOrder[]) => {
  return {
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    orders,
  };
};

export const fetchOrdersFail = (error: { message: string }) => {
  return {
    type: actionTypes.FETCH_ORDERS_FAIL,
    error,
  };
};

export const fetchOrdersStart = () => {
  return {
    type: actionTypes.FETCH_ORDERS_START,
  };
};

export const fetchOrders = (token: string | null = "") => {
  return (dispatch: TDispatch) => {
    dispatch(fetchOrdersStart());
    axiosOrders
      .getOrders(token)
      .then((response) => {
        const fetchedOrders = [] as IOrder[];
        for (let key in response) {
          fetchedOrders.push({ ...response[key], id: key });
        }
        dispatch(fetchOrderSuccess(fetchedOrders));
        return { ...response, loading: false };
      })
      .catch((err) => dispatch(fetchOrdersFail(err)));
  };
};
