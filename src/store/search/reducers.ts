import SearchState, { SearchAction, SEARCH } from "./types";

const initialState: SearchState = {
    searchString: ""
};

export function searchReducer(state = initialState, action: SearchAction): SearchState {
    switch(action.type) {
        case SEARCH: {
            return {
                ...state,
                searchString: action.payload
            };
        };
        default: {
            return state;
        }
    }
}