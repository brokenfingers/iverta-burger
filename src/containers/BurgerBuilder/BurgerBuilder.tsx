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

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

export type mapDispatchToPropsType = ReturnType<typeof mapDispatchToProps>;
export type mapStateToPropsType = ReturnType<typeof mapStateToProsp>;
export type BurgerBuilderType = ReturnType<typeof BurgerBuilder>;
export type BurgerBuilderType2 = typeof BurgerBuilder;
export type BurgerBuilderPropsType = mapDispatchToPropsType &
  mapStateToPropsType;

export const BurgerBuilder = (props: BurgerBuilderPropsType) => {
  const initState: IBugerBuilderState = {
    ingredients: {} as Ingredients,
    totalPrice: 4,
    purchasable: false,
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

  const updatePurchaseState = (ingredients: { [key: string]: number }) => {
    const sum = Object.keys(ingredients)
      .map((igKey) => ingredients[igKey])
      .reduce((newSum, el) => newSum + el, 0);
    setState((prev) => ({ ...prev, purchasable: sum > 0 }));
  };

  const addIngredientHandles = (type: keyof Ingredients) => {
    const oldCount = props.ings[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = {
      ...props.ings,
    };
    updatedIngredients[type] = updatedCount;
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = state.totalPrice;
    const newPrice = oldPrice + priceAddition;
    setState((prev) => ({
      ...prev,
      totalPrice: newPrice,
      ingredients: updatedIngredients,
    }));
    updatePurchaseState(updatedIngredients);
  };
  const purchaseCancelHandler = () => {
    setState((prev) => ({ ...prev, purchasing: false }));
  };

  const purchaseContinueHandler = () => {
    const search = Object.entries(props.ings).map((arr) =>
      arr.map((arr2) => arr2)
    ) as ParamKeyValuePair[];
    search.push(["price", state.totalPrice.toString()]);

    navigate({
      pathname: "/checkout",
      search: `?${createSearchParams(search)}`,
    });
  };

  const removeIngredientHandles = (type: keyof Ingredients) => {
    const oldCount = props.ings[type];
    if (oldCount <= 0) {
      return;
    }
    const updatedCount = oldCount - 1;
    const updatedIngredients = {
      ...props.ings,
    };
    updatedIngredients[type] = updatedCount;
    const priceDeduction = INGREDIENT_PRICES[type];
    const oldPrice = state.totalPrice;
    const newPrice = oldPrice - priceDeduction;
    setState((prev) => ({
      ...prev,
      totalPrice: newPrice,
      ingredients: updatedIngredients,
    }));
    updatePurchaseState(updatedIngredients);
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
          ingredientAdded={addIngredientHandles}
          ingredientRemove={removeIngredientHandles}
          disabled={disabledInfo}
          price={state.totalPrice}
          purchasable={state.purchasable}
          ordered={purchaseHandler}
        />
      </Aux>
    );

    orderSummary = (
      <OrderSummary
        ingredients={props.ings}
        purchaseCanceled={purchaseCancelHandler}
        purchaseContinued={purchaseContinueHandler}
        price={state.totalPrice}
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
