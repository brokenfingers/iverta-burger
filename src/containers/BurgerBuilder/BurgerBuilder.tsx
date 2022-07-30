import { useEffect, useState } from "react";
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
import { RootState, TDispatch } from "../../store/store";
import * as actions from "../../store/actions/index";

type mapDispatchToPropsType = ReturnType<typeof mapDispatchToProps>;
type mapStateToPropsType = ReturnType<typeof mapStateToProsp>;
export type BurgerBuilderReturnType = ReturnType<typeof BurgerBuilder>;
export type BurgerBuilderType = typeof BurgerBuilder;
export type BurgerBuilderPropsType = mapDispatchToPropsType &
  mapStateToPropsType;

export const BurgerBuilder: React.FC<BurgerBuilderPropsType> = (props) => {
  const initState = {
    purchasing: false,
  };

  const navigate = useNavigate();
  const [state, setState] = useState(initState);
  const { onInitIngredients } = props
  const purchaseHandler = () => {
    if (props.isAuth) {
      setState((prev) => ({ ...prev, purchasing: true }));
    } else {
      props.onSetAuthRedirectPath("/checkout");
      navigate({ pathname: "/auth" });
    }
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
    props.onInitPurches();
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
          ingredientRemove={props.onIngredientRemoved}
          disabled={disabledInfo}
          price={props.price}
          purchasable={updatePurchaseState(props.ings)}
          ordered={purchaseHandler}
          isAuth={props.isAuth}
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
    onInitIngredients();
  }, [onInitIngredients]);

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
    isAuth: state.auth.token !== null,
  };
};

const mapDispatchToProps = (dispatch: TDispatch) => {
  return {
    onIngredientAdded: (ingredientName: IngredientNames) =>
      dispatch(actions.addIngredient(ingredientName)),
    onIngredientRemoved: (ingredientName: IngredientNames) =>
      dispatch(actions.removeIngredient(ingredientName)),
    onInitIngredients: () => dispatch(actions.initIngredients()),
    onInitPurches: () => dispatch(actions.purchaseInit()),
    onSetAuthRedirectPath: (path: string) =>
      dispatch(actions.setAuthRedirectPath(path)),
  };
};

export default connect(
  mapStateToProsp,
  mapDispatchToProps
)(
  withErrorHandler<BurgerBuilderType, BurgerBuilderPropsType>(
    BurgerBuilder,
    Axios
  )
);
