import { connect } from "react-redux";
import { RootState } from "../../../store/store";
import { useNavigate, Outlet, Navigate } from "react-router-dom";
import CheckoutSummary from "../../../components/Order/CheckoutSummary/CheckoutSummary";

type Props = mapStateToPropsType;

const Checkout = (props: Props) => {
  const navigate = useNavigate();

  let checkoutJSX = <Navigate to="/" />;
  const purchasedRedirect = props.purchased ? <Navigate to="/" /> : null;
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
      {purchasedRedirect}
      {checkoutJSX}
      <Outlet context={props} />
    </div>
  );
};

type mapStateToPropsType = ReturnType<typeof mapStateToProps>;

const mapStateToProps = (state: RootState) => {
  return {
    ings: state.burgerBuilder.ingredients,
    purchased: state.order.purchased,
  };
};

export default connect(mapStateToProps)(Checkout);
