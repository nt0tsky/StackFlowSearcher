import React from "react";
import { AdvancedSearchItem } from "../../models/AdvancedSearchItem";
import { Chip, Paper } from "@material-ui/core";

/**
 * Idetails tags
 */
interface IDetailsTags {
    item: AdvancedSearchItem;
}

/**
 * Details tags
 */
export class DetailsTags extends React.PureComponent<IDetailsTags> {
    
    /**
     * Renders details tags
     * @returns  
     */
    render() {
        const tags = this.props.item.tags;
        if (tags && tags.length) {
            return(
                <div className="chips-container">
                    {tags.map((val, idx) => {
                        return (
                            <Chip
                                size="small"
                                className="chip-item"
                                variant="outlined"
                                label={val}
                                key={`chip_${val}_${idx}`}
                        />
                        )
                    })}
                </div>
            )
        }

        return <></>;
    }
}