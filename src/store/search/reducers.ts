import SearchState, { SearchAction, SEARCH, RESPONSE_RECEIVED, SAVE_LATEST_SEARCH } from "./types";
import { QuestionItem } from "../../models/QuestionItem";

const initialState: SearchState = {
    searchString: "",
    lastSearch: []
};

export function searchReducer(state: SearchState = initialState, action: SearchAction): SearchState {
    switch(action.type) {
        case SEARCH: {
            return {
                ...state,
                searchString: action.payload
            };
        };
        case SAVE_LATEST_SEARCH: {
            let lastSearch = state.lastSearch;
            if (lastSearch.length) {
                const lastItem = decodeURIComponent(lastSearch[lastSearch.length-1]);
                const payload = decodeURIComponent(action.payload);
                if (lastItem != payload) {
                    lastSearch.push(action.payload);
                }
            } else {
                lastSearch.push(decodeURIComponent(action.payload));
            }

            return {
                ...state,
                lastSearch: lastSearch
            }
        };
        case RESPONSE_RECEIVED: {
            const items = action.payload as Array<QuestionItem>;
            return {
                ...state,
                questionItems: items
            };
        };
        default: {
            return state;
        }
    }
}