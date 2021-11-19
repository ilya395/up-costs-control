import { all } from "@redux-saga/core/effects";
import { watchAuth } from "../modules";
import { watchAddCosts, watchAddExpenseItem, watchChangeExpenseItem, watchDeleteExpenseItem, watchGetCosts } from "../modules/costs";

export function* rootSaga() {
  yield all([
    watchAuth(),
    watchGetCosts(),
    watchDeleteExpenseItem(),
    watchAddExpenseItem(),
    watchChangeExpenseItem(),
    watchAddCosts(),
  ]);
}