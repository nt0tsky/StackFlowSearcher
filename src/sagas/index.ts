import { all, fork } from "redux-saga/effects";
import { watchSearch } from "./search";
import { watchResult } from "./result";
import { watchNavigation } from "./navigation";

export const sagaInitial = function* root() {
    yield all([
        fork(watchSearch),
        fork(watchResult),
        fork(watchNavigation)
    ])
};