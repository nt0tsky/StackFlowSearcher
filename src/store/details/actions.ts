import { BaseAction } from "../common/BaseAction";
import { GET_QUESTION, QUESTION_RECEIVED } from "./types";
import { AdvancedSearchItem } from "../../models/AdvancedSearchItem";


export const GetQuestionAction: (questionId: string) => BaseAction = (questionId: string) => ({
    type: GET_QUESTION,
    payload: questionId
});

export const QuestionReceived: (item: AdvancedSearchItem) => BaseAction = (item: AdvancedSearchItem) => ({
    type: QUESTION_RECEIVED,
    payload: item
})