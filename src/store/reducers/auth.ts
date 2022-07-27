import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  token: null as null | string,
  userId: "",
  error: null as null | { message: string },
  loading: false,
};

export type authReducerReturn = typeof initialState;

type actionType = {
  type: keyof typeof actionTypes;
  idToken: string;
  userId: string;
  error: string;
};

const authStart = (state: typeof initialState, action: actionType) => {
  return updateObject(state, { error: "", loading: true });
};

const authSuccess = (state: typeof initialState, action: actionType) => {
  return updateObject(state, {
    token: action.idToken,
    userId: action.userId,
    error: "",
    loading: false,
  });
};

const authFail = (state: typeof initialState, action: actionType) => {
  return updateObject(state, { error: action.error, loading: false });
};

const authLogout = (state: typeof initialState) => {
  return updateObject(state, { token: null, userId: null });
};

const authReducer = (state = initialState, action: actionType) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return authStart(state, action);
    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, action);
    case actionTypes.AUTH_FAIL:
      return authFail(state, action);
    case actionTypes.AUTH_LOGOUT:
      return authLogout(state);
    default:
      return state;
  }
  return state;
};

export default authReducer;
