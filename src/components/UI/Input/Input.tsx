import classes from "./Input.module.css";

interface IConfig {
  [key: string]: string;
}

interface Props {
  //   label: string;
  //   inputType: string;
  value: string;
  elementType: string;
  elementConfig: { [key: string]: string | IConfig[] };
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
        />
      );
      break;
    case "textArea":
      inputElement = (
        <textarea
          className={classes.InputElement}
          {...props.elementConfig}
          value={props.value}
        />
      );
      break;
    default:
      inputElement = (
        <input
          className={classes.InputElement}
          {...props.elementConfig}
          value={props.value}
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
