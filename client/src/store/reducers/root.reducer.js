import { combineReducers } from "redux";
import { AuthReducer } from "../../modules/auth";
import { CostsReducer } from "../../modules/costs";

export const rootReducer = combineReducers({
  auth: AuthReducer,
  costs: CostsReducer
});