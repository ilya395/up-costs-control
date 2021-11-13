import { combineReducers } from "redux";
import { AuthReducer } from "../../modules/auth";

export const rootReducer = combineReducers({
  auth: AuthReducer
});