import { Component, lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";

// import Checkout from "./containers/BurgerBuilder/Checkout/Checkout";
// import ContactData from "./containers/BurgerBuilder/Checkout/ContactData/ContactData";
// import Orders from "./containers/BurgerBuilder/Orders/Orders";
// import Auth from "./containers/Auth/Auth";
import Logout from "./containers/Auth/Logout/Logout";
import { connect } from "react-redux";
import { RootState, TDispatch } from "./store/store";
import * as actions from "./store/actions/index";
import Spinner from "./components/UI/Spinner/Spinner";



const Checkout = lazy(async () => ({ default: (await import('./containers/BurgerBuilder/Checkout/Checkout')).default }))
const ContactData = lazy(async () => ({ default: (await import('./containers/BurgerBuilder/Checkout/ContactData/ContactData')).default }))
const Orders = lazy(async () => ({ default: (await import('./containers/BurgerBuilder/Orders/Orders')).default }))
const Auth = lazy(async () => ({ default: (await import('./containers/Auth/Auth')).default }))

type Props = mapDispatchToPropsType & mapStateToPropsType;

class App extends Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  componentDidMount() {
    this.props.onTryAutoSignup();
  }
  render() {
    return (
      <div>
        <Layout>
          <Suspense fallback={<Spinner />}>
            <Routes>
              {this.props.isAuthenticated && (
                <>
                  <Route path="checkout" element={<Checkout />}>
                    <Route path="contact-data" element={<ContactData />} />
                  </Route>
                  <Route path="/orders" element={<Orders />} />
                  <Route path="/logout" element={<Logout />} />
                </>
              )}
              <Route path="/auth" element={<Auth />} />
              <Route path="/" element={<BurgerBuilder />} />
              <Route path="*" element={<BurgerBuilder />} /> // page-not-found
              route
            </Routes>
          </Suspense>
        </Layout>
      </div>
    );
  }
}

type mapDispatchToPropsType = ReturnType<typeof mapDispatchToProps>;

const mapDispatchToProps = (dispatch: TDispatch) => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState()),
  };
};

type mapStateToPropsType = ReturnType<typeof mapStateToProps>;

const mapStateToProps = (state: RootState) => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
