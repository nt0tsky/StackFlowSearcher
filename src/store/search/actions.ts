import { SEARCH, RESPONSE_RECEIVED, SAVE_LATEST_SEARCH, SIMPLE_SEARCH } from "./types";
import { BaseAction } from "../common/BaseAction";
import { QuestionItem } from "../../models/QuestionItem";

export const SearchAction: (text: string) => BaseAction = (text: string) => ({
    type: SEARCH,
    payload: text
});

export const SimpleSearchAction: (text: string) => BaseAction = (text: string) => ({
    type: SIMPLE_SEARCH,
    payload: text
});

export const ResponseReceivedAction: (items: Array<QuestionItem>) => BaseAction = (items: Array<QuestionItem>) => ({
    type: RESPONSE_RECEIVED,
    payload: items
});

export const SaveLatestSearchAction: (text: string) => BaseAction = (text: string) => ({
    type: SAVE_LATEST_SEARCH,
    payload: text
});