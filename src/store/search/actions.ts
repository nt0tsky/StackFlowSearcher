import {
    SEARCH,
    RESPONSE_RECEIVED,
    SAVE_LATEST_SEARCH,
    OWNER_QUESTIONS_SEARCH,
    RESPONSE_RECEIVED_OWNER_QUESTIONS,
    OWNER_QUESTIONS_CLEAR
} from './types';
import { BaseAction } from '../common/BaseAction';
import { SearchItem } from '../../models/SearchItem';

export const SearchAction: (text: string) => BaseAction = (text: string) => ({
    type: SEARCH,
    payload: text
});

export const OwnerQuestionsSearch: (userId: number) => BaseAction = (
    userId: number
) => ({
    type: OWNER_QUESTIONS_SEARCH,
    payload: userId
});

export const OwnerQuestionsClear: () => BaseAction = () => ({
    type: OWNER_QUESTIONS_CLEAR,
    payload: ''
});

export const ResponseReceivedAction: (
    items: Array<SearchItem>
) => BaseAction = (items: Array<SearchItem>) => ({
    type: RESPONSE_RECEIVED,
    payload: items
});

export const ResponseReceivedOwnerQuestions: (
    items: Array<SearchItem>
) => BaseAction = (items: Array<SearchItem>) => ({
    type: RESPONSE_RECEIVED_OWNER_QUESTIONS,
    payload: items
});

export const SaveLatestSearchAction: (text: string) => BaseAction = (
    text: string
) => ({
    type: SAVE_LATEST_SEARCH,
    payload: text
});
