import { SearchOwner } from '../../models/SearchOwner';
import React, { FC } from 'react';
import { Tooltip, Avatar, makeStyles, Typography } from '@material-ui/core';
import * as Colors from '@material-ui/core/colors';

/**
 * Isearch data item owner
 */
interface ISearchDataItemOwner {
    owner: SearchOwner;
    index: number;
    onClick: () => void;
}

/**
 * Search data item owner
 */
export class SearchDataItemOwner extends React.PureComponent<
    ISearchDataItemOwner
> {
    render() {
        return(
            <Tooltip title={this.props.owner.display_name}>
                <Avatar
                    className={`owner-picture`}
                    onClick={this.props.onClick}
                    src={this.props.owner.profile_image}
                />
            </Tooltip>
        );
    }
}
