import { combineReducers } from "redux";
import { AuthReducer } from "../../modules/auth";
import { CostsReducer } from "../../modules/costs";
import { monthReducer } from "../../modules/month";

export const rootReducer = combineReducers({
  auth: AuthReducer,
  costs: CostsReducer,
  date: monthReducer
});