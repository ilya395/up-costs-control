import { combineReducers } from "redux";
import { AuthReducer } from "../../modules/auth";
import { AddCostsReducer, AddExpenseItemsReducer, ChangeExpenseItemsReducer, CostsReducer, DeleteExpenseItemsReducer } from "../../modules/costs";
import { ModalReducer } from "../../modules/modal";
import { MonthReducer } from "../../modules/month";

export const rootReducer = combineReducers({
  auth: AuthReducer,
  // costs: {
  //   get: CostsReducer,
  //   add: AddCostsReducer,
  // },
  costsGet: CostsReducer,
  costsAdd: AddCostsReducer,
  date: MonthReducer,
  modal: ModalReducer,
  // expenseItems: {
  //   delete: DeleteExpenseItemsReducer,
  //   add: AddExpenseItemsReducer,
  //   change: ChangeExpenseItemsReducer,
  // },
  expenseItemsDelete: DeleteExpenseItemsReducer,
  expenseItemsAdd: AddExpenseItemsReducer,
  expenseItemsChange: ChangeExpenseItemsReducer,
});