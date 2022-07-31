import {
  createStore,
  compose,
  applyMiddleware,
  AnyAction,
  Store,
  combineReducers,

} from "redux";
import thunk, { ThunkDispatch } from "redux-thunk";
import orderReducer, { orderActionTypes } from "./reducers/order";
import burgerBuilderReducer, { actionTypeSelection } from "./reducers/burgerBuilder";
import authReducer, { authActionType } from "./reducers/auth";


declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}



const rootReducer = combineReducers({
  order: orderReducer,
  burgerBuilder: burgerBuilderReducer,
  auth: authReducer
});

const composeEnhancers = (process.env.NODE_ENV === 'development' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

export type AllActionTypes = authActionType | actionTypeSelection | orderActionTypes

export type TRootReducer = ReturnType<typeof rootReducer>;
export type TAppState = ReturnType<typeof burgerBuilderReducer>;
export type TDispatch = ThunkDispatch<TAppState, void, AnyAction>
export type TStore = Store<TAppState, AnyAction> & { dispatch: TDispatch };

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;



export default store;
