import { call, put, takeEvery } from "redux-saga/effects";
import { authAwaitAction, authErrorAction, authSuccessAction } from "../store/actions/action-creators/auth.action-creator";
import { REQUEST_AUTH } from "../store/actions/types/auth.type";
import { API_URL } from "../../../constants";
import { request } from "../../../utils/classes/Request.class";
import { localToken } from "../../../utils/classes/LocalToken.class";

function* fetchAuth(data) {
  try {
    console.log("fetchAuth")
    const { payload } = data;
    yield put(authAwaitAction());
    const auth = yield call(() => {
      return request.post({
        url: API_URL.auth.post,
        body: payload
      })
    });
    yield put(authSuccessAction(auth));
    yield call(() => localToken.setToken(auth));
  } catch(e) {
    yield put(authErrorAction(e));
    yield call(() => localToken.removeToken());
  }
}

export function* watchAuth() {
  yield takeEvery(REQUEST_AUTH, fetchAuth);
}