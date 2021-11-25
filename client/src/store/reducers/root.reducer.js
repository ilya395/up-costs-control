import { combineReducers } from "redux";
import { UserReducer } from "../../modules";
import { AuthReducer } from "../../modules/auth";
import { AddCostsReducer, AddExpenseItemsReducer, ChangeExpenseItemsReducer, CostsReducer, DeleteExpenseItemsReducer } from "../../modules/costs";
import { ModalReducer } from "../../modules/modal";
import { MonthReducer } from "../../modules/month";

export const rootReducer = combineReducers({
  auth: AuthReducer,
  costsGet: CostsReducer,
  costsAdd: AddCostsReducer,
  date: MonthReducer,
  modal: ModalReducer,
  expenseItemsDelete: DeleteExpenseItemsReducer,
  expenseItemsAdd: AddExpenseItemsReducer,
  expenseItemsChange: ChangeExpenseItemsReducer,
  user: UserReducer
});