// import React, { Component } from "react";


// class Burger extends Component {
//     render() {
//         return <div></div>
//     }
// }

// export default Burger

import classes from './Burger.module.css'
import BurgerIngredients from './BurgerIngredients/BurgerIngredients';

interface Props {
    ingredients: {}
}


const Burger = (props:Props) => {

    return (
        <div className={classes.Burger}>
            <BurgerIngredients type="bread-top"/>
            <BurgerIngredients type="cheese"/>
            <BurgerIngredients type="meat"/>
            <BurgerIngredients type="bread-bottom"/>
        </div>
    );
}

export default Burger

