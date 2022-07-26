import { useState } from "react";
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";
import { InputTypes } from "../../Interfaces";
import classes from "./Auth.module.css";
import * as actions from "../../store/actions";
import { TDispatch } from "../../store/store";
import { connect } from "react-redux";

const Auth = (props: mapDispatchToPropsType) => {
  const initState = {
    controls: {
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Mail Address",
        },
        value: "",
        touched: false,
        validation: {
          rules: {
            required: true,
            isEmail: true,
          },
          valid: false,
        },
      },
      password: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "Password",
        },
        value: "",
        touched: false,
        validation: {
          rules: {
            required: true,
            minLength: 6,
          },
          valid: false,
        },
      },
    },
    isSignUp: true,
  };
  const [authState, setAuthState] = useState(initState);

  const formElementsArray = [];
  type controlNames = keyof typeof initState.controls;
  for (let key in authState.controls) {
    formElementsArray.push({
      id: key,
      config: authState.controls[key as controlNames],
    });
  }

  const form = formElementsArray.map((formElement) => (
    <Input
      key={formElement.id}
      touched={formElement.config.touched}
      invalid={!formElement.config.validation.valid}
      value={formElement.config.value}
      elementType={formElement.config.elementType}
      elementConfig={formElement.config.elementConfig}
      changed={(e) => inputChangeHandler(e, formElement.id as controlNames)}
    />
  ));

  interface IValidRules {
    required: boolean;
    minLength?: number;
    maxLength?: number;
    isEmail?: boolean;
  }

  const checkValidity = (value: string, rules: IValidRules): boolean => {
    let isValid = true;
    if (!rules.required) return isValid;
    if (rules.required) isValid = value.trim() !== "";
    if (rules.minLength) {
      isValid = value.trim().length >= rules.minLength && isValid;
    }
    if (rules.isEmail) {
      isValid =
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value) && isValid;
    }
    if (rules.maxLength) {
      isValid = value.trim().length <= rules.maxLength && isValid;
    }
    return isValid;
  };

  const inputChangeHandler = (
    e: React.ChangeEvent<InputTypes>,
    controlName: controlNames
  ) => {
    let updatedControls = {
      ...authState.controls,
      [controlName]: {
        ...authState.controls[controlName],
        value: e.target.value,
        validation: {
          ...authState.controls[controlName].validation,
          valid: checkValidity(
            e.target.value,
            authState.controls[controlName].validation.rules
          ),
        },

        touched: true,
      },
    };
    setAuthState((prev) => ({ ...prev, controls: { ...updatedControls } }));
  };

  const submitHandler = (e: React.SyntheticEvent) => {
    e.preventDefault();
    props.onAuth(
      authState.controls.email.value,
      authState.controls.password.value,
      authState.isSignUp
    );
  };

  const switchAuthHandler = () => {
    setAuthState((prev) => ({ ...prev, isSignUp: !prev.isSignUp }));
  };
  return (
    <div className={classes.Auth}>
      <form onSubmit={submitHandler}>
        {form}
        <Button btnType={"Success"}>SUBMIT</Button>
        <Button clicked={switchAuthHandler} btnType={"Danger"}>
          SWITCH TO {authState.isSignUp ? "SIGN IN" : "SIGN UP"}
        </Button>
      </form>
    </div>
  );
};

type mapDispatchToPropsType = ReturnType<typeof mapDispatchToProps>;
const mapDispatchToProps = (dispatch: TDispatch) => {
  return {
    onAuth: (email: string, passord: string, isSignUp: boolean) =>
      dispatch(actions.auth(email, passord, isSignUp)),
  };
};

export default connect(null, mapDispatchToProps)(Auth);
