import { takeLatest, put, call } from 'redux-saga/effects';
import { BaseAction } from '../../store/common/BaseAction';
import { push } from 'connected-react-router';
import { GET_QUESTION } from '../../store/details/types';
import Axios from 'axios';
import { QuestionReceived } from '../../store/details/actions';

/**
 * Searchs saga
 */
export function* watchDetails() {
    yield takeLatest(GET_QUESTION, handleGetQuestions);
}

/**
 * Handles get questions
 * @param action 
 */
function* handleGetQuestions(action: BaseAction) {
    const data = yield questionSearch(action.payload, {
        key: process.env.APPLICATION_KEY,
        site: 'stackoverflow',
        tab: 'votes',
        filter: 'withbody'
    })
    
    if (data.data.items.length > 0) {
        const item = data.data.items[0];
        if (item) {
            yield put(QuestionReceived(item));
        }
    }
}


/**
 * Searchs topics
 * @param payload
 */
function* questionSearch(questionId: string, params: ISearchTopics) {
    const config = {
        params: params
    };
    return yield call(
        Axios.get,
        `${process.env.API_URL}/questions/${questionId}`,
        config
    );
}
