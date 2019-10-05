import { SearchItem } from '../../models/SearchItem';
import { BaseAction } from '../common/BaseAction';

export default interface SearchState {
    searchString: any;
    SearchItems: Array<SearchItem>;
    ownerQuestions: Array<SearchItem>;
    lastSearch: Array<string>;
}

export const SEARCH = 'SEARCH';
export type SEARCH = typeof SEARCH;

export const OWNER_QUESTIONS_SEARCH = 'OWNER_QUESTIONS_SEARCH';
export type OWNER_QUESTIONS_SEARCH = typeof OWNER_QUESTIONS_SEARCH;

export const OWNER_QUESTIONS_CLEAR = 'OWNER_QUESTIONS_CLEAR';
export type OWNER_QUESTIONS_CLEAR = typeof OWNER_QUESTIONS_CLEAR;

export const RESPONSE_RECEIVED = 'RESPONSE_RECEIVED';
export type RESPONSE_RECEIVED = typeof RESPONSE_RECEIVED;

export const RESPONSE_RECEIVED_OWNER_QUESTIONS = 'RESPONSE_RECEIVED_OWNER_QUESTIONS';
export type RESPONSE_RECEIVED_OWNER_QUESTIONS = typeof RESPONSE_RECEIVED_OWNER_QUESTIONS;

export const SAVE_LATEST_SEARCH = 'SAVE_LATEST_SEARCH';
export type SAVE_LATEST_SEARCH = typeof SAVE_LATEST_SEARCH;

export type SearchActionTypes =
    | SEARCH
    | OWNER_QUESTIONS_SEARCH
    | RESPONSE_RECEIVED
    | SAVE_LATEST_SEARCH
    | RESPONSE_RECEIVED_OWNER_QUESTIONS
    | OWNER_QUESTIONS_CLEAR;

export interface SearchAction extends BaseAction {
    type: SearchActionTypes;
}
