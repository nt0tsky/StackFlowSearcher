import { takeEvery } from "redux-saga/effects";
import { SEARCH } from "../../store/app/types";
import { BaseAction } from "../../store/common/BaseAction";

export function* searchSaga() {
    yield takeEvery(SEARCH, handleSearch);
}

function* handleSearch(action: BaseAction) {
    return yield;
}