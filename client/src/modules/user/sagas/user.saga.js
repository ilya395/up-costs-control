import { call, put, takeEvery } from "redux-saga/effects";
import { GET_USER, SET_USER_DATA } from "../store";
import { API_URL } from "../../../constants";
import { errorGetUserAction, successGetUserAction, awaitGetUserAction, awaitSetUserDataAction, successSetUserDataAction, errorSetUserDataAction } from "../store";
import { request } from "../../../utils";
import { modalCloseAction, modalMainMenuAction } from "../..";

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

function* fetchUserData(data) {
  try {
    const { payload } = data;
    yield put(awaitSetUserDataAction());
    const user = yield call(() => {
      return request.post({
        url: API_URL.user.update,
        body: payload
      })
    });
    yield put(successSetUserDataAction(user.data.data));
    yield put(modalCloseAction());
    yield put(modalMainMenuAction());
  } catch(e) {
    yield put(errorSetUserDataAction(e));
  }
}

export function* watchUserData() {
  yield takeEvery(SET_USER_DATA, fetchUserData);
}