import SearchInputState, {
    SEARCH,
    RESPONSE_RECEIVED,
    SAVE_LATEST_SEARCH,
    SearchInputAction
} from './types';
import { SearchItem } from '../../models/SearchItem';

const initialState: SearchInputState = {
    searchString: '',
    SearchItems: [],
    lastSearch: [],
    fetching: false
};

export function searchInputReducer(
    state: SearchInputState = initialState,
    action: SearchInputAction
): SearchInputState {
    switch (action.type) {
        case SEARCH: {
            return {
                ...state,
                searchString: action.payload,
                fetching: true
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
        case RESPONSE_RECEIVED: {
            const items = action.payload as Array<SearchItem>;
            return {
                ...state,
                SearchItems: items,
                fetching: false
            };
        }
        default: {
            return state;
        }
    }
}
