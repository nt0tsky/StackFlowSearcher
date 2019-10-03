import { BaseAction } from "../common/BaseAction";

export default interface NavigationState {

}

export const TO_HOME_ACTION = 'TO_HOME_ACTION';
export type TO_HOME_ACTION = typeof TO_HOME_ACTION;

export const TO_RESULTS_ACTION = 'TO_RESULTS_ACTION';
export type TO_RESULTS_ACTION = typeof TO_RESULTS_ACTION;

export type NavigationActionsTypes = TO_HOME_ACTION | TO_RESULTS_ACTION;

export interface NavigationActions extends BaseAction {
    type: NavigationActionsTypes;
};