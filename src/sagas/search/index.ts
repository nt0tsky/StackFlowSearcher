import { put, takeLatest, call } from 'redux-saga/effects';
import { SEARCH } from '../../store/search/types';
import { BaseAction } from '../../store/common/BaseAction';
import Axios from 'axios';
import {
    ResponseReceivedAction,
    SaveLatestSearchAction
} from '../../store/search/actions';
import { ToResultsAction } from '../../store/navigation/actions';

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
    const data = yield advancedSearch(action.payload);
    if (data.data && data.data.items) {
        yield put(ResponseReceivedAction(data.data.items));
        yield put(SaveLatestSearchAction(action.payload));
        yield put(ToResultsAction(action.payload));
    }
}

/**
 * Searchs topics
 * @param payload
 */
function* advancedSearch(payload: string) {
    const data: ISearchTopics = {
        key: process.env.APPLICATION_KEY,
        site: 'stackoverflow',
        tab: 'relevance',
        q: payload
    };

    const config = {
        params: data
    };
    return yield call(
        Axios.get,
        `${process.env.API_URL}/search/advanced`,
        config
    );
}
