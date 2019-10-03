import { SEARCH } from "./types";
import { BaseAction } from "../common/BaseAction";

export const SearchAction: (text: string) => BaseAction = (text: string) => ({
    type: SEARCH,
    payload: text
});
