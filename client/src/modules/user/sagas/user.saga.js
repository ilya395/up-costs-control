import { call, put, takeEvery } from "redux-saga/effects";
import { GET_USER } from "../store";
import { API_URL } from "../../../constants";
import { errorGetUserAction, successGetUserAction, awaitGetUserAction } from "../store";
import { request } from "../../../utils";

function* fetchUser(data) {
  try {
    const { payload } = data;
    yield put(awaitGetUserAction());
    const user = yield call(() => {
      return request.post({
        url: API_URL.user.get,
        body: payload
      })
    });
    yield put(successGetUserAction(user.data.data));
  } catch(e) {
    yield put(errorGetUserAction(e));
  }
}

export function* watchUser() {
  yield takeEvery(GET_USER, fetchUser);
}