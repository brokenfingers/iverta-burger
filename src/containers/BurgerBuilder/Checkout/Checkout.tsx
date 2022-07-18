import { useEffect, useState } from "react";
import { useNavigate, useSearchParams, Outlet } from "react-router-dom";
import CheckoutSummary from "../../../components/Order/CheckoutSummary/CheckoutSummary";
import Spinner from "../../../components/UI/Spinner/Spinner";
import { ICheckoutState } from "../../../Interfaces";

const Checkout = () => {
  const initState: ICheckoutState = {
    ingredients: {},
    price: 0,
  };
  const [checkoutState, setCheckoutState] = useState(initState);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    let stateUpdate = { ingredients: {} } as ICheckoutState;
    searchParams.forEach((value, key) => {
      if (key === "price") {
        stateUpdate[key] = +value;
      } else {
        stateUpdate["ingredients"][key] = +value;
      }
    });

    setCheckoutState((prev) => ({
      ...prev,
      ingredients: stateUpdate.ingredients,
      price: stateUpdate.price,
    }));
  }, []);

  let checkoutJSX = <Spinner />;
  if (Object.keys(checkoutState.ingredients).length) {
    checkoutJSX = (
      <CheckoutSummary
        ingredients={checkoutState.ingredients}
        checkoutCanceled={() => {
          navigate(-1);
        }}
        checkoutContinued={() => {
          navigate("contact-data");
        }}
      />
    );
  }

  return (
    <div>
      {checkoutJSX}
      <Outlet context={checkoutState} />
    </div>
  );
};

export default Checkout;
