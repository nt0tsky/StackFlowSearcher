import { SEARCH, UPDATE_QUESTION_ITEMS } from "./types";
import { BaseAction } from "../common/BaseAction";
import { QuestionItem } from "../../models/QuestionItem";

export const SearchAction: (text: string) => BaseAction = (text: string) => ({
    type: SEARCH,
    payload: text
});

export const UpdateQuestionItemsAction: (items: Array<QuestionItem>) => BaseAction = (items: Array<QuestionItem>) => ({
    type: UPDATE_QUESTION_ITEMS,
    payload: items
});