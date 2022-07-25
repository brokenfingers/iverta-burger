import * as actionTypes from "../actions/actionTypes";

const initialState = {
  orders: [],
  loading: false,
};

type actionTypes = {
  type: keyof typeof actionTypes;
  orderData: {};
  orderId: string;
};

const orderReducer = (state = initialState, action: actionTypes) => {
  switch (action.type) {
    case actionTypes.PURCHASE_BURGER_START:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.PURCHASE_BURGER_SUCCESS:
      const newOrder = { ...action.orderData, id: action.orderId };
      // return {...state, loading:false, orders: {...action.orderData} }
      //   console.log(state);
      return state;

    case actionTypes.PURCHASE_BURGER_FAIL:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

export default orderReducer;
