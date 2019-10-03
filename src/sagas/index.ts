import { all, fork } from "redux-saga/effects";
import { searchSaga } from "./search";
import { resultSaga } from "./result";

export const sagaInitial = function* root() {
    yield all([
        fork(searchSaga),
        fork(resultSaga)
    ])
};