import { all, fork } from "redux-saga/effects";
import { watchSearch } from "./search";
import { watchResult } from "./result";

export const sagaInitial = function* root() {
    yield all([
        fork(watchSearch),
        fork(watchResult)
    ])
};