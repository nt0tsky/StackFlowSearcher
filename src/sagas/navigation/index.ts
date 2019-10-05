import {
    TO_HOME_ACTION,
    TO_RESULTS_ACTION,
    TO_DETAILS
} from '../../store/navigation/types';
import { takeLatest, put } from 'redux-saga/effects';
import { BaseAction } from '../../store/common/BaseAction';
import { push } from 'connected-react-router';

/**
 * Searchs saga
 */
export function* watchNavigation() {
    yield takeLatest(TO_HOME_ACTION, handleToHome);
    yield takeLatest(TO_RESULTS_ACTION, handleToResults);
    yield takeLatest(TO_DETAILS, handleToDetails);
}

/**
 * Handles to details
 * @param action 
 */
function* handleToDetails(action: BaseAction) {
    yield put(push(`/details/${action.payload}`));
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
