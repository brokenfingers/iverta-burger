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

class App extends Component {
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

export default App;
