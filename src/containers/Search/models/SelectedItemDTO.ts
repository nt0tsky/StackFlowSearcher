import { SearchItem } from "../../../models/SearchItem";

/**
 * Selected item dto
 */
export class SelectedItemDTO {
    index!: number;
    selected!: boolean;
    item!: SearchItem;
}