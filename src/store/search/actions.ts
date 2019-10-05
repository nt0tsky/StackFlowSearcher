import {
    OWNER_QUESTIONS_CLEAR,
    OWNER_QUESTIONS_SEARCH,
    RECEIVED_OWNER_QUESTIONS
} from './types';
import { SearchItem } from '../../models/SearchItem';
import { BaseAction } from '../common/BaseAction';

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

export const ReceivedOwnerQuestions: (
    items: Array<SearchItem>
) => BaseAction = (items: Array<SearchItem>) => ({
    type: RECEIVED_OWNER_QUESTIONS,
    payload: items
});
