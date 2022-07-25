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

export const purchaseBurger = (orderData: IOrder) => {
  return (dispatch: TDispatch) => {
    dispatch(purchaseBurgerStart());
    axiosOrders
      .addOrder(orderData)
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
    type: actionTypes.PURCHASE_INIT
  }
}