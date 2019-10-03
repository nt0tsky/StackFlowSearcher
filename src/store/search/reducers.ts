import SearchState, { SearchAction, SEARCH, UPDATE_QUESTION_ITEMS } from "./types";
import { QuestionItem } from "../../models/QuestionItem";

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
        case UPDATE_QUESTION_ITEMS: {
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