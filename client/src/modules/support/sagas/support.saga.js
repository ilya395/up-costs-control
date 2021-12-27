import { call, put, takeEvery } from "redux-saga/effects";
import { awaitPushMessageToSupportAction, errorPushMessageToSupportAction, PUSH_MESSAGE_TO_SUPPORT, succesPushMessageToSupport } from "..";
import { modalClearAction, modalCloseAction, notificationMessageAction } from "../..";
import { API_URL, NOTIFICATION_ERROR } from "../../../constants";
import { localAuthData, request } from "../../../utils";

function* fetchSupportMessage(data) {
  try {
    const { problem } = data.payload;
    yield put(awaitPushMessageToSupportAction());
    const response = yield call(() => {
      return request.put({
        url: API_URL.support.put,
        body: {
          userId: +localAuthData.getUserId(),
          problem,
        }
      })
    });
    if (!response.error) {
      yield put(modalCloseAction());
      yield put(modalClearAction());
      yield put(succesPushMessageToSupport(response.data.data));
      yield put(notificationMessageAction({
        message: "Сообщение отправлено",
        notificationType: NOTIFICATION_SUCCESS
      }));
    } else {
      yield put(errorPushMessageToSupportAction(response.error));
      yield put(notificationMessageAction({
        message: response.error,
        notificationType: NOTIFICATION_ERROR
      }));
    }
  } catch(e) {
    yield put(errorPushMessageToSupportAction(e));
    yield put(notificationMessageAction({
      message: e.message,
      notificationType: NOTIFICATION_ERROR
    }));
  }
}

export function* watchSupportMessage() {
  yield takeEvery(PUSH_MESSAGE_TO_SUPPORT, fetchSupportMessage);
}