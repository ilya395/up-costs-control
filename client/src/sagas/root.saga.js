import { all } from "@redux-saga/core/effects";
import { watchAuth, watchUser, watchUserData } from "../modules";
import { watchAddCosts, watchAddExpenseItem, watchChangeExpenseItem, watchDeleteExpenseItem, watchGetCosts } from "../modules/costs";

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
  ]);
}