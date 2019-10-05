import { SEARCH, RESPONSE_RECEIVED, SAVE_LATEST_SEARCH } from './types';
import { BaseAction } from '../common/BaseAction';
import { SearchItem } from '../../models/SearchItem';

export const SearchAction: (text: string) => BaseAction = (text: string) => ({
    type: SEARCH,
    payload: text
});

export const ResponseReceivedAction: (
    items: Array<SearchItem>
) => BaseAction = (items: Array<SearchItem>) => ({
    type: RESPONSE_RECEIVED,
    payload: items
});

export const SaveLatestSearchAction: (text: string) => BaseAction = (
    text: string
) => ({
    type: SAVE_LATEST_SEARCH,
    payload: text
});
