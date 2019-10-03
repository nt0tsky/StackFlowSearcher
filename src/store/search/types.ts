import { QuestionItem } from "../../models/QuestionItem";
import { BaseAction } from "../common/BaseAction";

export default interface SearchState {
    searchString: any;
    questionItems?: Array<QuestionItem>;
    lastSearch: Array<string>;
}

export const SEARCH = 'SEARCH';
export type SEARCH = typeof SEARCH;

export const RESPONSE_RECEIVED = 'RESPONSE_RECEIVED';
export type RESPONSE_RECEIVED = typeof RESPONSE_RECEIVED;

export const SAVE_LATEST_SEARCH = 'SAVE_LATEST_SEARCH';
export type SAVE_LATEST_SEARCH = typeof SAVE_LATEST_SEARCH;

export type SearchActionTypes = SEARCH | RESPONSE_RECEIVED | SAVE_LATEST_SEARCH;

export interface SearchAction extends BaseAction {
    type: SearchActionTypes;
};