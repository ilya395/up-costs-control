import { combineReducers } from "redux";
import { UserDataReducer, UserReducer } from "../../modules";
import { AuthReducer } from "../../modules/auth";
import { AddCostsReducer, AddExpenseItemsReducer, ChangeExpenseItemsReducer, CostsReducer, DeleteExpenseItemsReducer } from "../../modules/costs";
import { CostsCollectionReducer } from "../../modules/costsCollection/store/reducer/costsCollection.reducer";
import { MainMenyReducer } from "../../modules/main-menu";
import { ModalReducer } from "../../modules/modal";
import { MonthReducer } from "../../modules/month";
import { NotificationReducer } from "../../modules/notification";
import { SupportReducer } from "../../modules/support";

export const rootReducer = combineReducers({
  auth: AuthReducer,
  costsGet: CostsReducer,
  costsAdd: AddCostsReducer,
  date: MonthReducer,
  modal: ModalReducer,
  expenseItemsDelete: DeleteExpenseItemsReducer,
  expenseItemsAdd: AddExpenseItemsReducer,
  expenseItemsChange: ChangeExpenseItemsReducer,
  user: UserReducer,
  mainMenu: MainMenyReducer,
  userData: UserDataReducer,
  notification: NotificationReducer,
  support: SupportReducer,
  costsCollection: CostsCollectionReducer,
});