import { FunctionComponent, useEffect, useState } from "react";
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";
import { InputTypes } from "../../Interfaces";
import classes from "./Auth.module.css";
import * as actions from "../../store/actions";
import { TDispatch, TRootReducer } from "../../store/store";
import { connect } from "react-redux";
import Spinner from "../../components/UI/Spinner/Spinner";
import { Navigate } from "react-router-dom";
import { checkValidity, updateObject } from "../../shared/utility";

type autProps = mapDispatchToPropsType & mapStateToPropsType;

const Auth: FunctionComponent<autProps> = (props) => {
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

  let form = formElementsArray.map((formElement) => (
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

  if (props.loading) {
    form = [<Spinner key={new Date().getTime()} />];
  }

  let errorMessage = null;
  if (props.error) {
    errorMessage = <p>{props.error.message}</p>;
  }




  const inputChangeHandler = (
    e: React.ChangeEvent<InputTypes>,
    controlName: controlNames
  ) => {
    const updatedValidation = updateObject(authState.controls[controlName].validation, {
      valid: checkValidity(e.target.value, authState.controls[controlName].validation.rules)
    })
    const updatedSelectedController = updateObject(authState.controls[controlName], {
      value: e.target.value,
      validation: updatedValidation,
      touched: true
    })
    const updatedControls = updateObject(authState.controls, { [controlName]: updatedSelectedController })
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

  let authRedirect = null;
  if (props.isAuth) authRedirect = <Navigate to={props.authRedirectPath} />;


  useEffect(() => {

    if (!props.buildingBurger && props.authRedirectPath !== "/") {
      props.onSetAuthRedirect();
    }
  }, []);

  return (
    <div className={classes.Auth}>
      {authRedirect}
      {errorMessage}
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
    onSetAuthRedirect: () => dispatch(actions.setAuthRedirectPath("/")),
  };
};

type mapStateToPropsType = ReturnType<typeof mapStateToProps>;
const mapStateToProps = (state: TRootReducer) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuth: state.auth.token !== null,
    buildingBurger: state.burgerBuilder.building,
    authRedirectPath: state.auth.authRedirectPath,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
