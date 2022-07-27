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
    idToken: token,
    userId,
  };
};
export const authFail = (error: TError) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error,
  };
};

export const logout = () => {
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

export const checkAuthTimeout = (expirationTime: number) => {
  return (dispatch: TDispatch) => {
    setTimeout(() => {
      console.log(expirationTime);
      dispatch(logout());
    }, expirationTime + 1000);
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
        dispatch(authSuccess(response.data.idToken, response.data.localId));
        dispatch(checkAuthTimeout(response.data.expiresIn));
      })
      .catch((err) => {
        console.log(err);
        dispatch(authFail(err.response.data.error));
      });
  };
};

export const setAuthRedirectPath = (path: string) => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT,
    path: path,
  };
};
