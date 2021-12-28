import { all } from "@redux-saga/core/effects";
import { watchAuth, watchNotification, watchUser, watchUserData } from "../modules";
import { watchAddCosts, watchAddExpenseItem, watchChangeExpenseItem, watchDeleteExpenseItem, watchGetCosts } from "../modules/costs";
import { watchSupportMessage } from "../modules/support";


export function* rootSaga() {
  yield all([
    watchAuth(),
    watchGetCosts(),
    watchDeleteExpenseItem(),
    watchAddExpenseItem(),
    watchChangeExpenseItem(),
    watchAddCosts(),
    watchUser(),
    watchUserData(),
    watchNotification(),
    watchSupportMessage(),
  ]);
}