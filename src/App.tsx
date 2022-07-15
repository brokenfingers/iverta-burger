import React, { Component } from 'react';

import './App.css';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/BurgerBuilder/Checkout/Checkout';

// function App() {
//   return (
//     <div>
//       <Layout>
//         <p>labas</p>
//       </Layout>
//     </div>
//   );

class App extends Component {

  render() {
    return (
      <div>
        <Layout>
            <BurgerBuilder />
            <Checkout/>
        </Layout>
      </div>
    )
  }
}


export default App;
