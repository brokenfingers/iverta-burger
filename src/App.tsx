import { Component } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Checkout from "./containers/BurgerBuilder/Checkout/Checkout";
import ContactData from "./containers/BurgerBuilder/Checkout/ContactData/ContactData";
import Orders from "./containers/BurgerBuilder/Orders/Orders";
import Auth from "./containers/Auth/Auth";
import Logout from "./containers/Auth/Logout/Logout";
import { connect } from "react-redux";
import { TDispatch } from "./store/store";
import * as actions from "./store/actions/index";

class App extends Component<mapDispatchToPropsType> {
  constructor(props: mapDispatchToPropsType) {
    super(props);
  }

  componentDidMount() {
    this.props.onTryAutoSignup();
  }
  render() {
    return (
      <div>
        <Layout>
          <Routes>
            <Route path="checkout" element={<Checkout />}>
              <Route path="contact-data" element={<ContactData />} />
            </Route>
            <Route path="/orders" element={<Orders />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/" element={<BurgerBuilder />} />
          </Routes>
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

export default connect(null, mapDispatchToProps)(App);
