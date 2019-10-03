import { TO_HOME_ACTION, TO_RESULTS_ACTION } from "../../store/navigation/types";
import { takeLatest, put } from "redux-saga/effects";
import { BaseAction } from "../../store/common/BaseAction";
import { push } from "connected-react-router";

/**
 * Searchs saga
 */
export function* watchNavigation() {
    yield takeLatest(TO_HOME_ACTION, handleToHome);
    yield takeLatest(TO_RESULTS_ACTION, handleToResults);
}

/**
 * Handles move back
 * @param action 
 */
function* handleToHome(action: BaseAction) {
    return yield put(push('/'));
}

function* handleToResults(action: BaseAction) {
    const text = encodeURIComponent(action.payload);
    yield put(push(`/result/${text}`));
}