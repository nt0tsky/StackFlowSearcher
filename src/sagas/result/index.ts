import { takeEvery, put } from "redux-saga/effects";
import { BaseAction } from "../../store/common/BaseAction";
import Axios, { AxiosRequestConfig } from "axios";
import { push } from "connected-react-router";
import { MOVE_BACK } from "../../store/result/types";

/**
 * Searchs saga
 */
export function* resultSaga() {
    yield takeEvery(MOVE_BACK, handleMoveBack);
}

function* handleMoveBack(action: BaseAction) {
    yield put(push('/'));
}