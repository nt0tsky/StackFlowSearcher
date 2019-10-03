export default interface SearchState {
    searchString: any;
}

export const SEARCH = 'SEARCH';
export type SEARCH = typeof SEARCH;


export type SearchActionTypes = SEARCH;

export interface SearchAction {
    type: SearchActionTypes;
    payload: SearchState
};