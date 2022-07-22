import { Ingredients } from "../../../Interfaces";
import classes from "./BuildControls.module.css";
import BuildControl from "./BuiltControl/BuildControl";

interface Props {
  ingredientAdded: (type: keyof Ingredients) => void;
  ingredientRemove: (type: keyof Ingredients) => void;
  disabled: { [key: string]: number | boolean };
  price: number;
  purchasable: boolean;
  ordered: () => void;
}

const controls: { label: string; type: keyof Ingredients }[] = [
  { label: "Salad", type: "salad" },
  { label: "Bacon", type: "bacon" },
  { label: "Cheese", type: "cheese" },
  { label: "Meat", type: "meat" },
];

const BuildControls = (props: Props) => (
  <div className={classes.BuildControls}>
    <p>
      Current Price: <strong>{props.price.toFixed(2)}$</strong>
    </p>
    {controls.map((ctrl) => (
      <BuildControl
        key={ctrl.label}
        label={ctrl.label}
        added={() => props.ingredientAdded(ctrl.type)}
        removed={() => props.ingredientRemove(ctrl.type)}
        disabled={props.disabled[ctrl.type]}
      />
    ))}
    <button
      className={classes.OrderButton}
      disabled={!props.purchasable}
      onClick={props.ordered}
    >
      ORDER NOW
    </button>
  </div>
);

export default BuildControls;
