import { IngredientNames, Ingredients } from "../../Interfaces";
import classes from "./Burger.module.css";
import BurgerIngredients from "./BurgerIngredients/BurgerIngredients";

interface Props {
  ingredients: Ingredients;
}

const Burger = (props: Props) => {
  const ingredients = props.ingredients;
  let transformedIngredients: JSX.Element[] | JSX.Element = Object.keys(
    ingredients
  )
    .map((ingrKey) => {
      return [...Array(ingredients[ingrKey as IngredientNames])].map(
        (_, i) => {
          return <BurgerIngredients key={ingrKey + i} type={ingrKey} />;
        }
      );
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
