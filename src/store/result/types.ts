export default interface ResultState {}

export const REDIRECT_TO_HOME_ACTION = 'REDIRECT_TO_HOME_ACTION';
export type REDIRECT_TO_HOME_ACTION = typeof REDIRECT_TO_HOME_ACTION;

export type ResultActionTypes = REDIRECT_TO_HOME_ACTION;

export interface ResultAction {
    type: ResultActionTypes;
    payload: ResultState;
}
