import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import authReducer from "./AuthReducer/reducer";

const rootReducer = combineReducers({
  authReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
