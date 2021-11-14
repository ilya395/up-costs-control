import { all } from "@redux-saga/core/effects";
import { watchAuth } from "../modules";
import { watchGetCosts } from "../modules/costs";

export function* rootSaga() {
  yield all([
    watchAuth(),
    watchGetCosts(),
  ]);
}