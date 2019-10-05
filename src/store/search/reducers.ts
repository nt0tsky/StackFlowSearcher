import SearchState, {
    SearchAction,
    SEARCH,
    RESPONSE_RECEIVED,
    SAVE_LATEST_SEARCH,
    RESPONSE_RECEIVED_OWNER_QUESTIONS,
    OWNER_QUESTIONS_CLEAR
} from './types';
import { SearchItem } from '../../models/SearchItem';

const initialState: SearchState = {
    searchString: '',
    SearchItems: [],
    lastSearch: [],
    ownerQuestions: []
};

export function searchReducer(
    state: SearchState = initialState,
    action: SearchAction
): SearchState {
    switch (action.type) {
        case SEARCH: {
            return {
                ...state,
                searchString: action.payload
            };
        }
        case SAVE_LATEST_SEARCH: {
            let lastSearch = state.lastSearch;
            if (lastSearch.length) {
                const lastItem = decodeURIComponent(
                    lastSearch[lastSearch.length - 1]
                );
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
            };
        }
        case RESPONSE_RECEIVED_OWNER_QUESTIONS: {
            return {
                ...state,
                ownerQuestions: action.payload
            }
        }
        case OWNER_QUESTIONS_CLEAR: {
            return {
                ...state,
                ownerQuestions: []
            }
        }
        case RESPONSE_RECEIVED: {
            const items = action.payload as Array<SearchItem>;
            return {
                ...state,
                SearchItems: items
            };
        }
        default: {
            return state;
        }
    }
}
