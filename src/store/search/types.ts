import { IFetchable } from '../common/IFetchable';
import { SearchItem } from '../../models/SearchItem';
import { BaseAction } from '../common/BaseAction';

export interface SearchState extends IFetchable {
    ownerItems: Array<SearchItem>;
}

export const RECEIVED_OWNER_QUESTIONS = 'RECEIVED_OWNER_QUESTIONS';
export type RECEIVED_OWNER_QUESTIONS = typeof RECEIVED_OWNER_QUESTIONS;

export const OWNER_QUESTIONS_SEARCH = 'OWNER_QUESTIONS_SEARCH';
export type OWNER_QUESTIONS_SEARCH = typeof OWNER_QUESTIONS_SEARCH;

export const OWNER_QUESTIONS_CLEAR = 'OWNER_QUESTIONS_CLEAR';
export type OWNER_QUESTIONS_CLEAR = typeof OWNER_QUESTIONS_CLEAR;

export type SearchActionTypes =
    | RECEIVED_OWNER_QUESTIONS
    | OWNER_QUESTIONS_SEARCH
    | OWNER_QUESTIONS_CLEAR;

export interface SearchAction extends BaseAction {
    type: SearchActionTypes;
}
