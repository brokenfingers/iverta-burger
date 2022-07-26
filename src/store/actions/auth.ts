import { TError } from "../../Interfaces";
import { TDispatch } from "../store";
import * as actionTypes from "./actionTypes";
import axios from "axios";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};
export const authSuccess = (token: string, userId: string) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: token, userId
  };
};
export const authFail = (error: TError) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error,
  };
};

export const auth = (email: string, password: string, isSignup: boolean) => {
  return (dispatch: TDispatch) => {
    dispatch(authStart());
    const authData = { email, password, returnSecureToken: true };
    let url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAUlDVIVNrQvDexQ_u1V30FGYShVPFA8Uw";
    if (!isSignup) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAUlDVIVNrQvDexQ_u1V30FGYShVPFA8Uw";
    }
    axios
      .post(url, authData)
      .then((response) => {
        console.log(response.data);
        dispatch(authSuccess(response.data.idToken, response.data.localId));
      })
      .catch((err) => {
        console.log(err);
        dispatch(authFail(err));
      });
  };
};
