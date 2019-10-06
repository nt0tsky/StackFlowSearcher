import React from "react";
import { AdvancedSearchItem } from "../../models/AdvancedSearchItem";

/**
 * Idetails sub header
 */
interface IDetailsSubHeader {
    item: AdvancedSearchItem;
}

/**
 * Details sub header
 */
export class DetailsSubHeader extends React.PureComponent<IDetailsSubHeader>
{
    /**
     * Renders details sub header
     * @returns  
     */
    render() {
        let timestamp:number  = this.props.item && this.props.item.creation_date;
        let date;
        if (timestamp) {
            timestamp *= 1000;
            date = new Date(timestamp).toDateString();

        } else {
            date = <></>;
        }
        return date;
    }
}