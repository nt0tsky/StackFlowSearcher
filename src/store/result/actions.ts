import { MOVE_BACK } from "./types";
import { BaseAction } from "../common/BaseAction";

export const MovebackAction: () => BaseAction = () => ({
    type: MOVE_BACK,
    payload: ""
});
