import React, { Component } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Checkout from "./containers/BurgerBuilder/Checkout/Checkout";

class App extends Component {
  state: { redirLink: boolean } = {
    redirLink: false,
  };

  setLink = () => {
    this.setState({ redirLink: true });
  };

  render() {
    return (
      <div>
        <Layout>
          <Routes>
            <Route
              path="/"
              element={
                !this.state.redirLink ? (
                  <BurgerBuilder redir={this.setLink} />
                ) : (
                  <Navigate to="/checkout" replace={false} />
                )
              }
            />
            <Route path="/checkout" element={<Checkout />} />
          </Routes>
        </Layout>
      </div>
    );
  }
}

export default App;
