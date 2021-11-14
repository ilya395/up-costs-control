import { call, put, takeEvery } from "@redux-saga/core/effects";
import { ADD_COSTS, ADD_EXPENSE_ITEM, CHANGE_EXPENSE_ITEM, costsAwaitAction, costsErrorAction, costsSuccessAction, DELETE_EXPENSE_ITEM, GET_COSTS } from "..";
import { API_URL } from "../../../constants";
import { request } from "../../../utils/classes/Request.class";

function* fetchGetCosts(data) {
  try {
    console.log("fetchGetCosts", data);
    const { id, date } = data.payload;
    yield put(costsAwaitAction());
    const response = yield call(() => {
      return request.post({
        url: API_URL.collection.post,
        body: {
          userId: id,
          date
        }
      })
    });
    yield put(costsSuccessAction(response));
  } catch(e) {
    console.log(e)
    yield put(costsErrorAction(e));
  }
}
export function* watchGetCosts() {
  yield takeEvery(GET_COSTS, fetchGetCosts);
}

function* fetchAddCosts(data) {
  try {
  } catch(e) {

  }
}
export function* watchAddCosts() {
  yield takeEvery(ADD_COSTS, fetchAddCosts);
}

function* fetchAddExpenseItem(data) {
  try {
  } catch(e) {

  }
}
export function* watchAddExpenseItem() {
  yield takeEvery(ADD_EXPENSE_ITEM, fetchAddExpenseItem);
}

function* fetchDeleteExpenseItem(data) {
  try {
  } catch(e) {

  }
}
export function* watchDeleteExpenseItem() {
  yield takeEvery(DELETE_EXPENSE_ITEM, fetchDeleteExpenseItem);
}

function* fetchChangeExpenseItem(data) {
  try {
  } catch(e) {

  }
}
export function* watchChangeExpenseItem() {
  yield takeEvery(CHANGE_EXPENSE_ITEM, fetchChangeExpenseItem);
}