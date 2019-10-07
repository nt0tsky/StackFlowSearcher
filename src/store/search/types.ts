import { IFetchable } from '../common/IFetchable';
import { SearchItem } from '../../models/SearchItem';
import { BaseAction } from '../common/BaseAction';

export interface SearchState extends IFetchable {
    ownerItems: Array<SearchItem>;
    tagItems: Array<SearchItem>;
    page: number;
}

export const TAG_FAMOUS_RECEIVED = 'TAG_FAMOUS_RECEIVED';
export type TAG_FAMOUS_RECEIVED = typeof TAG_FAMOUS_RECEIVED;

export const TAG_FAMOUS_SEARCH = 'TAG_FAMOUS_SEARCH';
export type TAG_FAMOUS_SEARCH = typeof TAG_FAMOUS_SEARCH;

export const TAG_FAMOUS_CLEAR = 'TAG_FAMOUS_CLEAR';
export type TAG_FAMOUS_CLEAR = typeof TAG_FAMOUS_CLEAR;

export const RECEIVED_OWNER_QUESTIONS = 'RECEIVED_OWNER_QUESTIONS';
export type RECEIVED_OWNER_QUESTIONS = typeof RECEIVED_OWNER_QUESTIONS;

export const OWNER_QUESTIONS_SEARCH = 'OWNER_QUESTIONS_SEARCH';
export type OWNER_QUESTIONS_SEARCH = typeof OWNER_QUESTIONS_SEARCH;

export const OWNER_QUESTIONS_CLEAR = 'OWNER_QUESTIONS_CLEAR';
export type OWNER_QUESTIONS_CLEAR = typeof OWNER_QUESTIONS_CLEAR;

export const SAVE_PAGING = 'SAVE_PAGING';
export type SAVE_PAGING = typeof SAVE_PAGING;

export const RESET_PAGING = 'RESET_PAGING';
export type RESET_PAGING = typeof RESET_PAGING;

export type SearchActionTypes =
    | RECEIVED_OWNER_QUESTIONS
    | OWNER_QUESTIONS_SEARCH
    | OWNER_QUESTIONS_CLEAR
    | TAG_FAMOUS_SEARCH
    | TAG_FAMOUS_RECEIVED
    | TAG_FAMOUS_CLEAR
    | SAVE_PAGING
    | RESET_PAGING;

export interface SearchAction extends BaseAction {
    type: SearchActionTypes;
}
