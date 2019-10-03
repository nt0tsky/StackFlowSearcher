export default interface ResultState {

}

export const MOVE_BACK = 'MOVE_BACK';
export type MOVE_BACK = typeof MOVE_BACK;


export type ResultActionTypes = MOVE_BACK;

export interface ResultAction {
    type: ResultActionTypes;
    payload: ResultState
};