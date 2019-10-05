import {
    SearchState,
    SearchAction,
    OWNER_QUESTIONS_CLEAR,
    RECEIVED_OWNER_QUESTIONS,
    OWNER_QUESTIONS_SEARCH
} from './types';

const initialState: SearchState = {
    ownerItems: [],
    fetching: false
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
        case OWNER_QUESTIONS_SEARCH: {
            return {
                ...state,
                fetching: true
            }
        }
        default: {
            return state;
        }
    }
}
