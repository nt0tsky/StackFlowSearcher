import { SearchOwner } from "./SearchOwner";

/**
 * Question item
 */
export interface SearchItem {
    title: string;
    answer_count: number;
    owner: SearchOwner;
    tags: Array<string>;
}