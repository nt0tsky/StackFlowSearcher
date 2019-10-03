import { QuestionItem } from "../../models/QuestionItem";
import { BaseAction } from "../common/BaseAction";

export default interface SearchState {
    searchString: any;
    questionItems?: Array<QuestionItem>;
}

export const SEARCH = 'SEARCH';
export type SEARCH = typeof SEARCH;

export const UPDATE_QUESTION_ITEMS = 'UPDATE_QUESTION_ITEMS';
export type UPDATE_QUESTION_ITEMS = typeof UPDATE_QUESTION_ITEMS;


export type SearchActionTypes = SEARCH | UPDATE_QUESTION_ITEMS;

export interface SearchAction extends BaseAction {
    type: SearchActionTypes;
};