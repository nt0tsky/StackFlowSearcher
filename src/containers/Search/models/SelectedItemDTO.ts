import { SearchItem } from "../../../models/SearchItem";
import { SelectedItemType } from "./SelectedItemType";

/**
 * Selected item dto
 */
export class SelectedItemDTO {
    index!: number;
    selected!: boolean;
    item!: SearchItem;
    type!: SelectedItemType;
    value?: string;
}