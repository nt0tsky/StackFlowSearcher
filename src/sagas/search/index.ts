import {  put, takeLatest, call } from "redux-saga/effects";
import { SEARCH } from "../../store/search/types";
import { BaseAction } from "../../store/common/BaseAction";
import Axios from "axios";
import { push } from "connected-react-router";
import { ResponseReceivedAction, SaveLatestSearchAction } from "../../store/search/actions";
import { ToResultsAction } from "../../store/navigation/actions";


/**
 * Searchs saga
 */
export function* watchSearch() {
    yield takeLatest(SEARCH, handleSearch);
}

/**
 * Handles search
 * @param action 
 */
function* handleSearch(action: BaseAction) {
    yield advancedSearch(action.payload);
}

/**
 * Searchs topics
 * @param payload 
 */
function* advancedSearch(payload: string) {
    const data: ISearchTopics = {
        key: process.env.APPLICATION_KEY,
        site: "stackoverflow",
        q: payload
    };

    const config = {
        params: data
    };
    const response = yield call(Axios.get, `${process.env.API_URL}/search/advanced`, config);
    if (response.data && response.data.items) {
        yield put(ResponseReceivedAction(response.data.items));
        yield put(SaveLatestSearchAction(payload));
        yield put(ToResultsAction(payload));
    }
}