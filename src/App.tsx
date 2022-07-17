import { Component } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Checkout from "./containers/BurgerBuilder/Checkout/Checkout";
import ContactData from "./containers/BurgerBuilder/Checkout/ContactData/ContactData";

class App extends Component {

  render() {
    return (
      <div>
        <Layout>
          <Routes>
            <Route
              path="/"
              element={<BurgerBuilder />}
            />
            <Route path="checkout" element={<Checkout />}>
              <Route path="contact-data" element={<ContactData />} />
            </Route>


          </Routes>
        </Layout>
      </div>
    );
  }
}

export default App;
