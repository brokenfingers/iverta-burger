import { useEffect } from "react";
import Order from "../../../components/Order/Order";
import axios from "../../../axios-orders";
import { IOrder } from "../../../Interfaces";
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";
import { TDispatch, TRootReducer } from "../../../store/store";
import * as actions from "../../../store/actions";
import { connect } from "react-redux";
import Spinner from "../../../components/UI/Spinner/Spinner";

type Props = mapDispatchToPropsType & mapStateToPropsType;

const Orders = (props: Props) => {
  const initState = {
    orders: [] as IOrder[],
    loading: true,
  };

  useEffect(() => {
    props.onFetchOrders(props.token, props.userId);
  }, []);
  let orders: JSX.Element[] = [<Spinner key={new Date().getTime()} />];
  if (!props.loading) {
    orders = props.orders.map((order) => (
      <Order
        key={order.id}
        ingredients={order.ingredients}
        price={+order.price}
      />
    ));
  }

  return <div>{orders}</div>;
};

type mapDispatchToPropsType = ReturnType<typeof mapDispatchToProps>;
const mapDispatchToProps = (dispatch: TDispatch) => {
  return {
    onFetchOrders: (token: null | string, userId: string) =>
      dispatch(actions.fetchOrders(token, userId)),
  };
};

type mapStateToPropsType = ReturnType<typeof mapStateToProps>;
const mapStateToProps = (state: TRootReducer) => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Orders, axios));
