import { call, put, takeEvery } from "redux-saga/effects";
import { authAwaitAction, authErrorAction, authSuccessAction } from "../store/actions/action-creators/auth.action-creator";
import { REQUEST_AUTH } from "../store/actions/types/auth.type";
import { API_URL, NOTIFICATION_ERROR } from "../../../constants";
import { request } from "../../../utils/classes/Request.class";
import { localAuthData } from "../../../utils/classes/LocalAuthData.class";
import { notificationMessageAction } from "../../../modules";

function* fetchAuth(data) {
  try {
    const { payload } = data;
    yield put(authAwaitAction());
    const auth = yield call(() => {
      return request.post({
        url: API_URL.auth.post,
        body: payload
      })
    });
    if (!auth.error) {
      yield put(authSuccessAction(auth.data));
      yield call(() => localAuthData.setAuthData(JSON.stringify(auth.data)));
    } else {
      yield put(authErrorAction(auth.error));
      yield put(notificationMessageAction({
        message: auth.error,
        notificationType: NOTIFICATION_ERROR
      }));
    }
  } catch(e) {
    yield put(authErrorAction(e));
    yield put(notificationMessageAction({
      message: e.message,
      notificationType: NOTIFICATION_ERROR
    }));
    // yield call(() => localAuthData.removeAuthData());
  }
}

export function* watchAuth() {
  yield takeEvery(REQUEST_AUTH, fetchAuth);
}