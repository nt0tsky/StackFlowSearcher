import {
    SearchState,
    SearchAction,
    OWNER_QUESTIONS_CLEAR,
    RECEIVED_OWNER_QUESTIONS,
    OWNER_QUESTIONS_SEARCH,
    TAG_FAMOUS_SEARCH,
    TAG_FAMOUS_RECEIVED,
    TAG_FAMOUS_CLEAR,
    SAVE_PAGING,
    RESET_PAGING
} from './types';

const initialState: SearchState = {
    ownerItems: [],
    tagItems: [],
    fetching: false,
    page: 0
};

export function searchReducer(
    state: SearchState = initialState,
    action: SearchAction
): SearchState {
    switch (action.type) {
        case OWNER_QUESTIONS_CLEAR: {
            return {
                ...state,
                ownerItems: [],
                fetching: false
            };
        }
        case RECEIVED_OWNER_QUESTIONS: {
            return {
                ...state,
                ownerItems: action.payload,
                fetching: false
            };
        }
        case TAG_FAMOUS_SEARCH:
        case OWNER_QUESTIONS_SEARCH: {
            return {
                ...state,
                fetching: true
            }
        }
        case TAG_FAMOUS_RECEIVED: {
            return {
                ...state,
                tagItems: action.payload,
                fetching: false
            }
        }
        case TAG_FAMOUS_CLEAR: {
            return {
                ...state,
                tagItems: []
            }
        }
        case SAVE_PAGING: {
            return {
                ...state,
                page: action.payload
            }
        }
        case RESET_PAGING: {
            return {
                ...state,
                page: action.payload
            }
        }
        default: {
            return state;
        }
    }
}
