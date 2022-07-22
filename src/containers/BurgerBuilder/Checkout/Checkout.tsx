import { connect } from "react-redux";
import { RootState } from "../../../store/store";
import { useNavigate, Outlet } from "react-router-dom";
import CheckoutSummary from "../../../components/Order/CheckoutSummary/CheckoutSummary";
import Spinner from "../../../components/UI/Spinner/Spinner";
import { Ingredients } from "../../../Interfaces";

const Checkout = (props: { ings: Ingredients }) => {
  const navigate = useNavigate();

  let checkoutJSX = <Spinner />;
  if (Object.keys(props.ings).length) {
    checkoutJSX = (
      <CheckoutSummary
        ingredients={props.ings}
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
      <Outlet context={props} />
    </div>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    ings: state.ingredients,
  };
};

export default connect(mapStateToProps)(Checkout);
