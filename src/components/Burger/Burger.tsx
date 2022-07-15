// import React, { Component } from "react";

// class Burger extends Component {
//     render() {
//         return <div></div>
//     }
// }

// export default Burger

// import { number } from 'prop-types';
import classes from "./Burger.module.css";
import BurgerIngredients from "./BurgerIngredients/BurgerIngredients";

interface Props {
  ingredients: Ingredients;
}

interface Ingredients {
  // salad?: number;
  // meat?: number;
  // bacon?: number;
  // cheese?: number
  [key: string]: number;
}

const Burger = (props: Props) => {
  const ingredients: Ingredients = props.ingredients;
  let transformedIngredients: JSX.Element[] | JSX.Element = Object.keys(
    props.ingredients
  )
    .map((ingrKey) => {
      return [...Array(ingredients[ingrKey])].map((_, i) => {
        return <BurgerIngredients key={ingrKey + i} type={ingrKey} />;
      });
    })
    .reduce((prev, curr) => prev.concat(curr), []);
  if (transformedIngredients.length === 0) {
    transformedIngredients = <p>Please start adding ingredients!</p>;
  }

  return (
    <div className={classes.Burger}>
      <BurgerIngredients type="bread-top" />
      {transformedIngredients}
      <BurgerIngredients type="bread-bottom" />
    </div>
  );
};

export default Burger;
