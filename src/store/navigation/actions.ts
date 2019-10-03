import { TO_HOME_ACTION, TO_RESULTS_ACTION } from "./types";
import { BaseAction } from "../common/BaseAction";

export const ToHomeAction: () => BaseAction = () => ({
    type: TO_HOME_ACTION,
    payload: ""
});

export const ToResultsAction: (text: string) => BaseAction = (text: string) => ({
    type: TO_RESULTS_ACTION,
    payload: text
});