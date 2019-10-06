import { SearchItem } from "./SearchItem";

export interface AdvancedSearchItem extends SearchItem {
    body: string;
    creation_date: number;
}