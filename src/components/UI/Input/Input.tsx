import { InputTypes } from "../../../Interfaces";
import classes from "./Input.module.css";

interface IConfig {
  [key: string]: string;
}

interface Props {
  value: string;
  elementType: string;
  touched: boolean;
  invalid: boolean;
  elementConfig: {
    placeholder?: string;
    type?: string;
    options?: IConfig[];
  };

  changed: (
    e: React.ChangeEvent<InputTypes>
  ) => void;
}

type inputElementType = JSX.Element | null;

const Input = (props: Props) => {
  let inputElement: inputElementType = null;
  const inputClassesArr = [classes.InputElement];
  if (props.invalid && props.touched) {
    inputClassesArr.push(classes.Invalid);
  }
  const inputClasses = inputClassesArr.join(" ");
  switch (props.elementType) {
    case "input":
      inputElement = (
        <input
          className={inputClasses}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    case "textArea":
      inputElement = (
        <textarea
          className={inputClasses}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    case "select":
      inputElement = (
        <select
          className={inputClasses}
          {...props.elementConfig}
          onChange={props.changed}
          value={props.value}
        >
          {props.elementConfig.options
            ? props.elementConfig.options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.displayValue}
              </option>
            ))
            : null}
        </select>
      );
      break;
    default:
      inputElement = (
        <input
          className={inputClasses}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
  }

  return (
    <div className={classes.Input}>
      <label className={classes.Label}></label>
      {inputElement}
    </div>
  );
};

export default Input;
