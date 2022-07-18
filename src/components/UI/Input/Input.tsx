import classes from "./Input.module.css";

interface IConfig {
  [key: string]: string;
}

interface Props {

  value: string;
  elementType: string;
  elementConfig: {
    placeholder?: string
    type?: string
    options?: IConfig[]

  };
  changed: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void
}

type inputElementType = JSX.Element | null;

const Input = (props: Props) => {
  let inputElement: inputElementType = null;
  switch (props.elementType) {
    case "input":
      inputElement = (
        <input
          className={classes.InputElement}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    case "textArea":
      inputElement = (
        <textarea
          className={classes.InputElement}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    case "select":
      inputElement = (
        <select
          className={classes.InputElement}
          {...props.elementConfig}
          onChange={props.changed}
          value={props.value}>
          {props.elementConfig.options ? props.elementConfig.options.map(option => (<option key={option.value} value={option.value}>{option.displayValue}</option>)) : null}
        </select>
      );
      break;
    default:
      inputElement = (
        <input
          className={classes.InputElement}
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
