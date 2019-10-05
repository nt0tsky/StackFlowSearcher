import {
    OWNER_QUESTIONS_CLEAR,
    OWNER_QUESTIONS_SEARCH,
    RECEIVED_OWNER_QUESTIONS,
    TAG_FAMOUS_SEARCH,
    TAG_FAMOUS_RECEIVED,
    TAG_FAMOUS_CLEAR
} from './types';
import { SearchItem } from '../../models/SearchItem';
import { BaseAction } from '../common/BaseAction';

export const OwnerQuestionsSearch: (userId: number) => BaseAction = (
    userId: number
) => ({
    type: OWNER_QUESTIONS_SEARCH,
    payload: userId
});

export const TagFamousSearch: (name: string) => BaseAction = (
    name: string
) => ({
    type: TAG_FAMOUS_SEARCH,
    payload: name
});

export const TagFamousReceived: (
    items: Array<SearchItem>
) => BaseAction = (items: Array<SearchItem>) => ({
    type: TAG_FAMOUS_RECEIVED,
    payload: items
});

export const TagFamousClear: () => BaseAction = () => ({
    type: TAG_FAMOUS_CLEAR,
    payload: ''
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
