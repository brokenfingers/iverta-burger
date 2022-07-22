import { useState, useEffect, useCallback } from "react";
import Order from "../../../components/Order/Order";
import axios, { axiosOrders } from "../../../axios-orders";
import { IOrder } from "../../../Interfaces";
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";

const Orders = () => {
  const initState = {
    orders: [] as IOrder[],
    loading: true,
  };
  const [state, setState] = useState(initState);

  const fetchOrders = useCallback(() => {
    axiosOrders
      .getOrders()
      .then((response) => {
        const fetchedOrders = [] as IOrder[];
        for (let key in response) {
          fetchedOrders.push({ ...response[key], id: key });
        }
        setState((prev) => ({ ...prev, orders: fetchedOrders }));
        return { ...response, loading: false };
      })
      .catch((err) => ({ ...state, loading: false }));
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  return (
    <div>
      {state.orders.map((order) => (
        <Order
          key={order.id}
          ingredients={order.ingredients}
          price={+order.price}
        />
      ))}
    </div>
  );
};

export default withErrorHandler(Orders, axios);
