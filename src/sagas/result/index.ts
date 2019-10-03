import { put, takeLatest } from "redux-saga/effects";
import { BaseAction } from "../../store/common/BaseAction";
import { push } from "connected-react-router";
import { REDIRECT_TO_HOME_ACTION } from "../../store/result/types";

/**
 * Searchs saga
 */
export function* watchResult() {
    yield takeLatest(REDIRECT_TO_HOME_ACTION, handleMoveBack);
}

/**
 * Handles move back
 * @param action 
 */
function* handleMoveBack(action: BaseAction) {
    yield put(push('/'));
}