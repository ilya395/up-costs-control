import { call, put, takeEvery } from "redux-saga/effects";
import { API_URL, NOTIFICATION_ERROR } from "../../../constants";
import { request } from "../../../utils";
import { notificationMessageAction } from "../../notification";
import { awaitCostsCollectionAction, DELETE_COST_IN_COLEECTION, errorCostsCollectionAction, GET_COSTS_COLLECTION, successCostsCollectionAction } from "../store";

export function* fetchCostsCollection(data) {
  try {
    const { date, userId, expenseItemId } = data.payload;
    yield put(awaitCostsCollectionAction());
    const response = yield call(() => {
      return request.post({
        url: API_URL.collection.monthlyCosts.post,
        body: {
          userId,
          expenseItemId,
          date,
        }
      })
    });
    if (!response.error) {
      yield put(successCostsCollectionAction(response.data.data));
    } else {
      yield put(errorCostsCollectionAction(response.error));
      yield put(notificationMessageAction({
        message: auth.error,
        notificationType: NOTIFICATION_ERROR
      }));
    }
  } catch(e) {
    yield put(errorCostsCollectionAction(e));
    yield put(notificationMessageAction({
      message: e.message,
      notificationType: NOTIFICATION_ERROR
    }));
  }
}
export function* watchCostsCollection() {
  yield takeEvery(GET_COSTS_COLLECTION, fetchCostsCollection);
}

function* fetchDeleteCostCollection(data) {
  try {
    const { date, userId, expenseItemId, costId } = data.payload;
    yield put(awaitCostsCollectionAction());
    const response = yield call(() => {
      return request.delete({
        url: API_URL.cost.delete,
        body: {
          userId: Number(userId),
          expenseItemId: Number(expenseItemId),
          date,
          id: Number(costId),
        }
      })
    });
    if (!response.error) {
      // yield put(successCostsCollectionAction(response.data.data));
      yield fetchCostsCollection({
        payload: {
          userId,
          expenseItemId,
          date,
        },
      });
    } else {
      yield put(errorCostsCollectionAction(response.error));
      yield put(notificationMessageAction({
        message: auth.error,
        notificationType: NOTIFICATION_ERROR
      }));
    }
  } catch(e) {
    yield put(errorCostsCollectionAction(e));
    yield put(notificationMessageAction({
      message: e.message,
      notificationType: NOTIFICATION_ERROR
    }));
  }
}
export function* watchDeleteCostCollection() {
  yield takeEvery(DELETE_COST_IN_COLEECTION, fetchDeleteCostCollection);
}