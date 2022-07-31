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
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";




export type BurgerBuilderReturnType = ReturnType<typeof BurgerBuilder>;
export type BurgerBuilderType = typeof BurgerBuilder;
export type BurgerBuilderPropsType = mapDispatchToPropsType

export const BurgerBuilder: React.FC<BurgerBuilderPropsType> = (props) => {
  const initState = {
    purchasing: false,
  };

  const navigate = useNavigate();
  const [state, setState] = useState(initState);

  const dispatch = useDispatch()

  const ings = useSelector((state: RootState) => {
    return state.burgerBuilder.ingredients
  })
  const price = useSelector((state: RootState) => {
    return state.burgerBuilder.totalPrice
  })
  const error = useSelector((state: RootState) => {
    return state.burgerBuilder.error
  })
  const isAuth = useSelector((state: RootState) => {
    return state.auth.token !== null
  })


  const onIngredientAdded = (ingredientName: IngredientNames) =>
    dispatch(actions.addIngredient(ingredientName))

  const onIngredientRemoved = (ingredientName: IngredientNames) =>
    dispatch(actions.removeIngredient(ingredientName))

  const onInitPurches = () => dispatch(actions.purchaseInit())

  const onSetAuthRedirectPath = (path: string) =>
    dispatch(actions.setAuthRedirectPath(path))



  const purchaseHandler = () => {
    if (isAuth) {
      setState((prev) => ({ ...prev, purchasing: true }));
    } else {
      onSetAuthRedirectPath("/checkout");
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
    onInitPurches();
    navigate({ pathname: "/checkout" });
  };

  const disabledInfo: { [key: string]: number | boolean } = {
    ...ings,
  };

  for (let key in disabledInfo) {
    disabledInfo[key] = disabledInfo[key] <= 0;
  }
  let orderSummary = null;

  let burger = error ? <p>Ingredients can't be loaded!</p> : <Spinner />;
  if (Object.keys(ings).length) {
    burger = (
      <Aux>
        <Burger ingredients={ings} />
        <BuildControls
          ingredientAdded={onIngredientAdded}
          ingredientRemove={onIngredientRemoved}
          disabled={disabledInfo}
          price={price}
          purchasable={updatePurchaseState(ings)}
          ordered={purchaseHandler}
          isAuth={isAuth}
        />
      </Aux>
    );

    orderSummary = (
      <OrderSummary
        ingredients={ings}
        purchaseCanceled={purchaseCancelHandler}
        purchaseContinued={purchaseContinueHandler}
        price={price}
      />
    );
  }


  const { onInitIngredients } = props
  useEffect(() => {
    onInitIngredients()
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


type mapDispatchToPropsType = ReturnType<typeof mapDispatchToProps>

const mapDispatchToProps = (dispatch: TDispatch) => {
  return {
    onInitIngredients: () => dispatch(actions.initIngredients())
  }
}

export default connect(
  null,
  mapDispatchToProps
)(
  withErrorHandler<BurgerBuilderType, BurgerBuilderPropsType>(
    BurgerBuilder,
    Axios
  )
);
