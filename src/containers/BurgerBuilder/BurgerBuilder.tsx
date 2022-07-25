import { Dispatch, useEffect, useState } from "react";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Burger from "../../components/Burger/Burger";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Modal from "../../components/UI/Modal/Modal";
import Aux from "../../hoc/Auxx/Auxx";
import { connect } from "react-redux";
import Axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import { Ingredients, IngredientNames } from "../../Interfaces";

import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState, TDispatch } from "../../store/store";
import * as actions from "../../store/actions/index";

type mapDispatchToPropsType = ReturnType<typeof mapDispatchToProps>;
type mapStateToPropsType = ReturnType<typeof mapStateToProsp>;
export type BurgerBuilderType = ReturnType<typeof BurgerBuilder>;
export type BurgerBuilderType2 = typeof BurgerBuilder;
export type BurgerBuilderPropsType = mapDispatchToPropsType &
  mapStateToPropsType;

export const BurgerBuilder = (props: BurgerBuilderPropsType) => {
  const initState = {
    purchasing: false,
  };

  const navigate = useNavigate();
  const [state, setState] = useState(initState);
  const purchaseHandler = () => {
    setState((prev) => ({ ...prev, purchasing: true }));
  };

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
    props.onInitPurches()
    navigate({ pathname: "/checkout" });
  };

  const disabledInfo: { [key: string]: number | boolean } = {
    ...props.ings,
  };

  for (let key in disabledInfo) {
    disabledInfo[key] = disabledInfo[key] <= 0;
  }
  let orderSummary = null;

  let burger = props.error ? <p>Ingredients can't be loaded!</p> : <Spinner />;
  if (Object.keys(props.ings).length) {
    burger = (
      <Aux>
        <Burger ingredients={props.ings} />
        <BuildControls
          ingredientAdded={props.onIngredientAdded}
          ingredientRemove={props.onIngredientAdded}
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
  }
  useEffect(() => {
    props.onInitIngredients();
  }, []);

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
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
  };
};

const mapDispatchToProps = (dispatch: TDispatch) => {
  return {
    onIngredientAdded: (ingredientName: IngredientNames) =>
      dispatch(actions.addIngredient(ingredientName)),
    onIngredientRemoved: (ingredientName: IngredientNames) =>
      dispatch(actions.removeIngredient(ingredientName)),
    onInitIngredients: () => dispatch(actions.initIngredients()),
    onInitPurches: () => dispatch(actions.purchaseInit())
  };
};

export default connect(
  mapStateToProsp,
  mapDispatchToProps
)(
  withErrorHandler<BurgerBuilderType2, BurgerBuilderPropsType>(
    BurgerBuilder,
    Axios
  )
);
