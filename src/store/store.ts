import { useDispatch } from "react-redux";
import { createStore, compose, applyMiddleware, AnyAction, Store } from "redux";
import thunk, { ThunkDispatch } from "redux-thunk";

import reducer from "./reducers/burgerBuilder";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

export type TAppState = ReturnType<typeof reducer>;
export type TDispatch = ThunkDispatch<TAppState, void, AnyAction>;
export type TStore = Store<TAppState, AnyAction> & { dispatch: TDispatch };

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
