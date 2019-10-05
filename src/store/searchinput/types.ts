import { SearchItem } from '../../models/SearchItem';
import { BaseAction } from '../common/BaseAction';
import { IFetchable } from '../common/IFetchable';

export default interface SearchInputState extends IFetchable {
    searchString: any;
    SearchItems: Array<SearchItem>;
    lastSearch: Array<string>;
}

export const SEARCH = 'SEARCH';
export type SEARCH = typeof SEARCH;

export const RESPONSE_RECEIVED = 'RESPONSE_RECEIVED';
export type RESPONSE_RECEIVED = typeof RESPONSE_RECEIVED;

export const SAVE_LATEST_SEARCH = 'SAVE_LATEST_SEARCH';
export type SAVE_LATEST_SEARCH = typeof SAVE_LATEST_SEARCH;

export type SearchInputActionTypes =
    | SEARCH
    | RESPONSE_RECEIVED
    | SAVE_LATEST_SEARCH;

export interface SearchInputAction extends BaseAction {
    type: SearchInputActionTypes;
}
