import { combineReducers } from "redux";
import { AuthReducer } from "../../modules/auth";
import { CostsReducer, DeleteExpenseItemsReducer } from "../../modules/costs";
import { ModalReducer } from "../../modules/modal";
import { MonthReducer } from "../../modules/month";

export const rootReducer = combineReducers({
  auth: AuthReducer,
  costs: CostsReducer,
  date: MonthReducer,
  modal: ModalReducer,
  expenseItems: {
    delete: DeleteExpenseItemsReducer,
  },
});