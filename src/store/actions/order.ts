import * as actionTypes from "./actionTypes";
import { axiosOrders } from "../../axios-orders";
import { TDispatch } from "../store";
import { IOrder } from "../../Interfaces";

export const purchaseBurgerSuccess = (id: number, orderData: IOrder) => {
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

export const purchaseBurgerStart = (orderData: IOrder) => {
  return (dispatch: TDispatch) => {
    axiosOrders
      .addOrder(orderData)
      .then((response) => {
        if (response.id) {
          dispatch(purchaseBurgerSuccess(+response.id, orderData));
        }
      })
      .catch((err) => {
        dispatch(purchaseBurgerFail(err));
      });
  };
};
