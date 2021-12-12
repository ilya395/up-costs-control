import { call, put, takeEvery } from "@redux-saga/core/effects";
import { ADD_COSTS, ADD_EXPENSE_ITEM, awaitAddCostsAction, awaitAddExpenseItemAction, awaitChangeExpenseItemAction, awaitDeleteExpenseItemAction, CHANGE_EXPENSE_ITEM, costsAwaitAction, costsErrorAction, costsSuccessAction, DELETE_EXPENSE_ITEM, errorAddCostsAction, errorAddExpenseItemAction, errorChangeExpenseItemAction, errorDeleteExpenseItemAction, getCostsAction, getCostsNowAction, GET_COSTS, succesAddCostsAction, successAddExpenseItemAction, successChangeExpenseItemAction, successDeleteExpenseItemAction } from "..";
import { modalClearAction, modalCloseAction, notificationMessageAction } from "../..";
import { API_URL, NOTIFICATION_ERROR } from "../../../constants";
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
    if (!response.error) {
      yield put(costsSuccessAction(response.data.data));
    } else {
      yield put(notificationMessageAction({
        message: auth.error,
        notificationType: NOTIFICATION_ERROR
      }));
    }
  } catch(e) {
    yield put(costsErrorAction(e));
    yield put(notificationMessageAction({
      message: e.message,
      notificationType: NOTIFICATION_ERROR
    }));
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
    if (!response.error) {
      yield put(modalCloseAction());
      yield put(modalClearAction());
      yield put(succesAddCostsAction(response.data));
    } else {
      yield put(notificationMessageAction({
        message: response.error,
        notificationType: NOTIFICATION_ERROR
      }));
    }
  } catch(e) {
    yield put(errorAddCostsAction(e));
    yield put(notificationMessageAction({
      message: e.message,
      notificationType: NOTIFICATION_ERROR
    }));
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
    if (!response.error) {
      yield put(modalCloseAction());
      yield put(modalClearAction());
      yield put(successAddExpenseItemAction(response.data));
    } else {
      yield put(notificationMessageAction({
        message: response.error,
        notificationType: NOTIFICATION_ERROR
      }));
    }
  } catch(e) {
    yield put(errorAddExpenseItemAction(e));
    yield put(notificationMessageAction({
      message: e.message,
      notificationType: NOTIFICATION_ERROR
    }));
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
    if (!response.error) {
      yield put(modalCloseAction());
      yield put(modalClearAction());
      yield put(successDeleteExpenseItemAction(response.data));
    } else {
      yield put(notificationMessageAction({
        message: response.error,
        notificationType: NOTIFICATION_ERROR
      }));
    }
  } catch(e) {
    yield put(errorDeleteExpenseItemAction(e));
    yield put(notificationMessageAction({
      message: e.message,
      notificationType: NOTIFICATION_ERROR
    }));
  }
}
export function* watchDeleteExpenseItem() {
  yield takeEvery(DELETE_EXPENSE_ITEM, fetchDeleteExpenseItem);
}

function* fetchChangeExpenseItem(data) {
  try {
    const { id, name, color, index } = data.payload;
    yield put(awaitChangeExpenseItemAction());
    const response = yield call(() => {
      return request.post({
        url: API_URL.expenseItems.update,
        body: {
          id,
          name,
          color,
          index,
          userId: localAuthData.getUserId(),
        }
      })
    });
    if (!response.error) {
      yield put(modalCloseAction());
      yield put(modalClearAction());
      yield put(successChangeExpenseItemAction(response.data));
    } else {
      yield put(notificationMessageAction({
        message: response.error,
        notificationType: NOTIFICATION_ERROR
      }));
    }
  } catch(e) {
    yield put(errorChangeExpenseItemAction(e));
    yield put(notificationMessageAction({
      message: e.message,
      notificationType: NOTIFICATION_ERROR
    }));
  }
}
export function* watchChangeExpenseItem() {
  yield takeEvery(CHANGE_EXPENSE_ITEM, fetchChangeExpenseItem);
}