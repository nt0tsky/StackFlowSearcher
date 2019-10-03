import { QuestionOwner } from "./QuestionOwner";

/**
 * Question item
 */
export interface QuestionItem {
    title: string;
    answer_count: number;
    owner: QuestionOwner;
    tags: Array<string>;
}