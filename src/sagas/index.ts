import { all, fork } from "redux-saga/effects";
import { appSaga } from "./app";

export const sagaInitial = function* root() {
    yield all([
        fork(appSaga)
    ])
};