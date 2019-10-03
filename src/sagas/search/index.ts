import { takeEvery, put } from "redux-saga/effects";
import { SEARCH } from "../../store/search/types";
import { BaseAction } from "../../store/common/BaseAction";
import Axios, { AxiosRequestConfig } from "axios";
import { push } from "connected-react-router";
import { QuestionItem } from "../../models/QuestionItem";
import { UpdateQuestionItemsAction } from "../../store/search/actions";

/**
 * Isearch topics
 */
interface ISearchTopics {
    order?: string;
    sort?: string;
    intitle?: string;
    key?: string;
    site: string;
}

/**
 * Searchs saga
 */
export function* searchSaga() {
    yield takeEvery(SEARCH, handleSearch);
}

/**
 * Handles search
 * @param action 
 */
function* handleSearch(action: BaseAction) {
    const response = yield searchTopicsAsync(action.payload);
    if (response.data && response.data.items) {
        const items = response.data.items as Array<QuestionItem>;
        yield put(UpdateQuestionItemsAction(items));
        yield put(push('/result'));
    }
}


const searchTopicsAsync = async (payload: any) => {
    const data: ISearchTopics = {
        key: process.env.APPLICATION_KEY,
        site: "stackoverflow",
        intitle: payload,
        order: "desc",
        sort: "activity"
    };

    const config: AxiosRequestConfig = {
        params: data
    }
    return await Axios.get(`${process.env.API_URL}/questions`, config);
}