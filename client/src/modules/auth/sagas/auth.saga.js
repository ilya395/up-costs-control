import { call, put, takeEvery } from "redux-saga/effects";
import { authAwaitAction, authErrorAction, authSuccessAction } from "../store/actions/action-creators/auth.action-creator";
import { REQUEST_AUTH } from "../store/actions/types/auth.type";
import { API_URL } from "../../../constants";
import { request } from "../../../utils/classes/Request.class";
import { localAuthData } from "../../../utils/classes/LocalAuthData.class";

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
    console.log("aurh: ", auth.data)
    yield put(authSuccessAction(auth.data));
    yield call(() => localAuthData.setAuthData(JSON.stringify(auth.data)));
  } catch(e) {
    yield put(authErrorAction(e));
    // yield call(() => localAuthData.removeAuthData());
  }
}

export function* watchAuth() {
  yield takeEvery(REQUEST_AUTH, fetchAuth);
}