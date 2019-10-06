import React from 'react';
import { Typography } from '@material-ui/core';
import "./index.less";

/**
 * Idetails header
 */
interface IDetailsHeader {
    title?: string;
}

/**
 * Details header
 */
export class DetailsHeader extends React.PureComponent<IDetailsHeader> {

    /**
     * Render title of details header
     */
    renderTitle = () => {
        const element = React.createElement('div', {
            dangerouslySetInnerHTML: { __html: this.props.title || '' }
        });

        return element;
    };

    /**
     * Renders details header
     * @returns  
     */
    render() {
        return(
            <Typography variant="subtitle2">
                {this.renderTitle()}
            </Typography>
        )
    }
}
