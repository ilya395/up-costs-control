import { all } from "@redux-saga/core/effects";
import { watchAuth } from "../modules";

export function* rootSaga() {
  yield all([
    watchAuth(),
  ]);
}