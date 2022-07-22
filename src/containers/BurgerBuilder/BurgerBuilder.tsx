import { useEffect, useState } from "react";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Burger from "../../components/Burger/Burger";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Modal from "../../components/UI/Modal/Modal";
import Aux from "../../hoc/Auxx/Auxx";
import { connect } from "react-redux";
import Axios, { axiosOrders } from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import { Ingredients, IBugerBuilderState } from "../../Interfaces";
import * as actionTypes from "../../store/actions";
import {
  createSearchParams,
  ParamKeyValuePair,
  useNavigate,
} from "react-router-dom";
import { AppDispatch, RootState } from "../../store/store";

export type mapDispatchToPropsType = ReturnType<typeof mapDispatchToProps>;
export type mapStateToPropsType = ReturnType<typeof mapStateToProsp>;
export type BurgerBuilderType = ReturnType<typeof BurgerBuilder>;
export type BurgerBuilderType2 = typeof BurgerBuilder;
export type BurgerBuilderPropsType = mapDispatchToPropsType &
  mapStateToPropsType;

export const BurgerBuilder = (props: BurgerBuilderPropsType) => {
  const initState = {
    purchasing: false,
    loading: false,
    error: false,
  };

  const navigate = useNavigate();
  const [state, setState] = useState(initState);
  const purchaseHandler = () => {
    setState((prev) => ({ ...prev, purchasing: true }));
  };

  useEffect(() => {
    axiosOrders
      .getIngredients()
      .then((response) =>
        setState((prev) => ({ ...prev, ingredients: response }))
      )
      .catch((error) => {
        setState((prev) => ({ ...prev, error: true }));
      });
  }, []);

  const updatePurchaseState = (ingredients: Ingredients) => {
    const sum = Object.keys(ingredients)
      .map((igKey) => ingredients[igKey as keyof Ingredients])
      .reduce((newSum, el) => newSum + el, 0);
    return sum > 0;
  };

  const purchaseCancelHandler = () => {
    setState((prev) => ({ ...prev, purchasing: false }));
  };

  const purchaseContinueHandler = () => {
    navigate({ pathname: "/checkout" });
  };

  const disabledInfo: { [key: string]: number | boolean } = {
    ...props.ings,
  };

  for (let key in disabledInfo) {
    disabledInfo[key] = disabledInfo[key] <= 0;
  }
  let orderSummary = null;

  let burger = state.error ? <p>Ingredients can't be loaded!</p> : <Spinner />;
  if (Object.keys(props.ings).length) {
    burger = (
      <Aux>
        <Burger ingredients={props.ings} />
        <BuildControls
          ingredientAdded={props.onIngredientAdded}
          ingredientRemove={props.onIngredientRemoved}
          disabled={disabledInfo}
          price={props.price}
          purchasable={updatePurchaseState(props.ings)}
          ordered={purchaseHandler}
        />
      </Aux>
    );

    orderSummary = (
      <OrderSummary
        ingredients={props.ings}
        purchaseCanceled={purchaseCancelHandler}
        purchaseContinued={purchaseContinueHandler}
        price={props.price}
      />
    );
    if (state.loading) {
      orderSummary = <Spinner />;
    }
  }
  console.log(props);
  return (
    <Aux>
      <Modal show={state.purchasing} modalClosed={purchaseCancelHandler}>
        {orderSummary}
      </Modal>
      {burger}
    </Aux>
  );
};

const mapStateToProsp = (state: RootState) => {
  return {
    ings: state.ingredients,
    price: state.totalPrice,
  };
};

const mapDispatchToProps = (dispatch: AppDispatch) => {
  return {
    onIngredientAdded: (ingredientName: keyof Ingredients) =>
      dispatch({ type: actionTypes.ADD_INGREDIENT, ingredientName }),
    onIngredientRemoved: (ingredientName: keyof Ingredients) =>
      dispatch({ type: actionTypes.REMOVE_INGREDIENT, ingredientName }),
  };
};

// export default BurgerBuilder

export default connect(
  mapStateToProsp,
  mapDispatchToProps
)(
  //   withErrorHandler<BurgerBuilderType2>(
  withErrorHandler<BurgerBuilderType2, BurgerBuilderPropsType>(
    BurgerBuilder,
    Axios
  )
);
