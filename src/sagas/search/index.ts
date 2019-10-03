import { takeEvery, put, takeLatest } from "redux-saga/effects";
import { SEARCH } from "../../store/search/types";
import { BaseAction } from "../../store/common/BaseAction";
import Axios, { AxiosRequestConfig } from "axios";
import { push } from "connected-react-router";
import { QuestionItem } from "../../models/QuestionItem";
import { UpdateQuestionItemsAction } from "../../store/search/actions";


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
    yield searchTopics(action.payload);
    yield redirectToResults(action.payload);
}

/**
 * Searchs topics
 * @param payload 
 */
function* searchTopics(payload: string) {
    const response = yield searchTopicsAsync(payload);
    if (response.data && response.data.items) {
        const items = response.data.items as Array<QuestionItem>;
        yield put(UpdateQuestionItemsAction(items));
    }
}

/**
 * Redirects to results
 * @param payload 
 * @returns  
 */
function redirectToResults(payload: string) {
    const text = encodeURIComponent(payload);
    return put(push(`/result/${text}`));
}

/**
 * Searchs topics async
 * @param payload 
 * @returns  
 */
function searchTopicsAsync(payload: any) {
    const data: ISearchTopics = {
        key: process.env.APPLICATION_KEY,
        site: "stackoverflow",
        q: payload
    };

    return Axios.get(`${process.env.API_URL}/search/advanced`, {
        params: data
    });
}