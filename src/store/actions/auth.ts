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
  localStorage.removeItem("token");
  localStorage.removeItem("expirationDate");
  localStorage.removeItem("localId");
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

export const checkAuthTimeout = (expirationTime: number) => {
  return (dispatch: TDispatch) => {
    setTimeout(() => {
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
        const expirationDate = new Date(
          new Date().getTime() + response.data.expiresIn * 1000
        );
        localStorage.setItem("token", response.data.idToken);
        localStorage.setItem("expirationDate", `${expirationDate}`);
        localStorage.setItem("localId", response.data.localId);
        dispatch(authSuccess(response.data.idToken, response.data.localId));
        dispatch(checkAuthTimeout(response.data.expiresIn));
      })
      .catch((err) => {
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

export const authCheckState = () => {
  return (dispatch: TDispatch) => {
    const token = localStorage.getItem("token");
    const expirationDate = new Date(
      localStorage.getItem("expirationDate") ?? 0
    );
    if (!token || !expirationDate) {
      dispatch(logout());
    } else {
      if (expirationDate < new Date()) {
        dispatch(logout());
      } else {
        const userId = localStorage.getItem("localId") as string;
        dispatch(authSuccess(token, userId));
        checkAuthTimeout(
          (expirationDate.getTime() - new Date().getTime()) / 1000
        );
      }
    }
  };
};
