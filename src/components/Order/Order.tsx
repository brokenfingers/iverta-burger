import { useSelector } from "react-redux";
import { IngredientNames, Ingredients } from "../../Interfaces";
import classes from "./Order.module.css";

interface IProps {
  price: number;
  ingredients: Ingredients;
}

const Order = (props: IProps) => {
  const ingredients = [] as { name: string; amount: number }[];
  for (let ingredientName in props.ingredients) {
    ingredients.push({
      name: ingredientName,
      amount: props.ingredients[ingredientName as IngredientNames],
    });
  }

  const ingredientOutput = ingredients.map((ig, i) => (
    <span key={i}>
      {ig.name} ({ig.amount})
    </span>
  ));

  return (
    <div className={classes.Order}>
      <p>Ingredients: {ingredientOutput}</p>
      <p>
        Price: <strong>{props.price.toFixed(2)} EUR</strong>
      </p>
    </div>
  );
};

export default Order;
