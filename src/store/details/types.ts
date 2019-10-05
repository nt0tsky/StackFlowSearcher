import { AdvancedSearchItem } from "../../models/AdvancedSearchItem";
import { BaseAction } from "../common/BaseAction";
import { IFetchable } from "../common/IFetchable";

export default interface DetailsState extends IFetchable {
    advancedSearchItem: AdvancedSearchItem
}

export const GET_QUESTION = 'GET_QUESTION';
export type GET_QUESTION = typeof GET_QUESTION;

export const QUESTION_RECEIVED = 'QUESTION_RECEIVED';
export type QUESTION_RECEIVED = typeof QUESTION_RECEIVED;

export type DetailsActionTypes = GET_QUESTION | QUESTION_RECEIVED;

export interface DetailsAction extends BaseAction {
    type: DetailsActionTypes;
}
