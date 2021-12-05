import { call, put, takeEvery } from "@redux-saga/core/effects";
import { ADD_COSTS, ADD_EXPENSE_ITEM, awaitAddCostsAction, awaitAddExpenseItemAction, awaitChangeExpenseItemAction, awaitDeleteExpenseItemAction, CHANGE_EXPENSE_ITEM, costsAwaitAction, costsErrorAction, costsSuccessAction, DELETE_EXPENSE_ITEM, errorAddCostsAction, errorAddExpenseItemAction, errorChangeExpenseItemAction, errorDeleteExpenseItemAction, getCostsAction, getCostsNowAction, GET_COSTS, succesAddCostsAction, successAddExpenseItemAction, successChangeExpenseItemAction, successDeleteExpenseItemAction } from "..";
import { modalClearAction, modalCloseAction } from "../..";
import { API_URL } from "../../../constants";
import { localAuthData } from "../../../utils";
import { request } from "../../../utils/classes/Request.class";

function* fetchGetCosts(data) {
  try {
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
    yield put(costsSuccessAction(response.data.data));
  } catch(e) {
    yield put(costsErrorAction(e));
  }
}
export function* watchGetCosts() {
  yield takeEvery(GET_COSTS, fetchGetCosts);
}

function* fetchAddCosts(data) {
  try {
    const { userId, amount, expenseItemId, description, date } = data.payload;
    const body = {
      userId: userId || localAuthData.getUserId(),
      amount,
      expenseItemId,
      description,
    };
    date ? (body.date = date) : body;
    yield put(awaitAddCostsAction());
    const response = yield call(() => {
      return request.put({
        url: API_URL.cost.set,
        body,
      })
    });
    yield put(modalCloseAction());
    yield put(modalClearAction());
    yield put(succesAddCostsAction(response.data));
  } catch(e) {
    yield put(errorAddCostsAction(e));
  }
}
export function* watchAddCosts() {
  yield takeEvery(ADD_COSTS, fetchAddCosts);
}

function* fetchAddExpenseItem(data) {
  try {
    const { name, color } = data.payload;
    yield put(awaitAddExpenseItemAction());
    const response = yield call(() => {
      return request.put({
        url: API_URL.expenseItems.set,
        body: {
          userId: localAuthData.getUserId(),
          name,
          color
        }
      })
    });
    yield put(modalCloseAction());
    yield put(modalClearAction());
    yield put(successAddExpenseItemAction(response.data));
  } catch(e) {
    yield put(errorAddExpenseItemAction(e));
  }
}
export function* watchAddExpenseItem() {
  yield takeEvery(ADD_EXPENSE_ITEM, fetchAddExpenseItem);
}

function* fetchDeleteExpenseItem(data) {
  try {
    const { id } = data.payload;
    yield put(awaitDeleteExpenseItemAction());
    const response = yield call(() => {
      return request.delete({
        url: API_URL.expenseItems.delete,
        body: {
          id,
        }
      })
    });
    yield put(modalCloseAction());
    yield put(modalClearAction());
    yield put(successDeleteExpenseItemAction(response.data));
  } catch(e) {
    yield put(errorDeleteExpenseItemAction(e));
  }
}
export function* watchDeleteExpenseItem() {
  yield takeEvery(DELETE_EXPENSE_ITEM, fetchDeleteExpenseItem);
}

function* fetchChangeExpenseItem(data) {
  try {
    const { id, name, color } = data.payload;
    yield put(awaitChangeExpenseItemAction());
    const response = yield call(() => {
      return request.post({
        url: API_URL.expenseItems.update,
        body: {
          id,
          name,
          color,
        }
      })
    });
    yield put(modalCloseAction());
    yield put(modalClearAction());
    yield put(successChangeExpenseItemAction(response.data));
  } catch(e) {
    yield put(errorChangeExpenseItemAction(e));
  }
}
export function* watchChangeExpenseItem() {
  yield takeEvery(CHANGE_EXPENSE_ITEM, fetchChangeExpenseItem);
}