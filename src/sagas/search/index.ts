import { put, takeLatest, call } from 'redux-saga/effects';
import { SEARCH } from '../../store/searchinput/types';
import { BaseAction } from '../../store/common/BaseAction';
import Axios from 'axios';
import {
    ResponseReceivedAction,
    SaveLatestSearchAction
} from '../../store/searchinput/actions';
import { ToResultsAction } from '../../store/navigation/actions';
import { ReceivedOwnerQuestions, TagFamousReceived } from '../../store/search/actions';
import { OWNER_QUESTIONS_SEARCH, TAG_FAMOUS_SEARCH } from '../../store/search/types';

/**
 * Searchs saga
 */
export function* watchSearch() {
    yield takeLatest(SEARCH, handleSearch);
    yield takeLatest(OWNER_QUESTIONS_SEARCH, handleOwnerQuestionsSearch);
    yield takeLatest(TAG_FAMOUS_SEARCH, handleTagSearch);
}

function* handleTagSearch(action: BaseAction) {
    const data = yield advancedSearch({
        site: 'stackoverflow',
        key: process.env.APPLICATION_KEY,
        sort: 'votes',
        tagged: action.payload
    });

    if (data && data.data.items) {
        yield put(TagFamousReceived(data.data.items));
    }
}

function* handleOwnerQuestionsSearch(action: BaseAction) {
    const data = yield advancedSearch({
        site: 'stackoverflow',
        key: process.env.APPLICATION_KEY,
        sort: 'votes',
        user: action.payload,
        order: 'desc'
    });

    if (data.data && data.data.items) {
        const value = yield put(ReceivedOwnerQuestions(data.data.items));
    }
}

/**
 * Handles search
 * @param action
 */
function* handleSearch(action: BaseAction) {
    const data = yield advancedSearch({
        key: process.env.APPLICATION_KEY,
        site: 'stackoverflow',
        tab: 'votes',
        q: action.payload
    });
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
function* advancedSearch(params: ISearchTopics) {
    const config = {
        params: params
    };
    return yield call(
        Axios.get,
        `${process.env.API_URL}/search/advanced`,
        config
    );
}
