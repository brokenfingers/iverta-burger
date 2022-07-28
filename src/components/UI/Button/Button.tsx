import classes from "./Button.module.css";

interface Props {
  children: React.ReactNode;
  clicked?: () => void;
  btnType: "Success" | "Danger";
  disabled?: boolean;
}

const Button = (props: Props) => (
  <button
    type="submit"
    disabled={props.disabled}
    className={[classes.Button, classes[props.btnType]].join(" ")}
    onClick={
      props.clicked &&
      ((e) => {
        e.preventDefault();
        if (props.clicked) return props.clicked();
      })
    }
  >
    {props.children}
  </button>
);

export default Button;
