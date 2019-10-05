import DetailsState, {
    GET_QUESTION, DetailsActionTypes, DetailsAction, QUESTION_RECEIVED
} from './types';

const initialState: DetailsState = {
    advancedSearchItem: {
        body: "",
        answer_count: 0,
        owner: {
            display_name: "",
            user_id: 0
        },
        question_id: 0,
        tags: [],
        title: ""
    },
    fetching: false
};

export function detailsReducer(
    state: DetailsState = initialState,
    action: DetailsAction
): DetailsState {
    switch (action.type) {
        case GET_QUESTION: {
            return {
                ...state,
                fetching: true,
                advancedSearchItem: action.payload
            };
        }
        case QUESTION_RECEIVED: {
            return {
                ...state,
                fetching: false,
                advancedSearchItem: action.payload
            }
        }
        default: {
            return state;
        }
    }
}
