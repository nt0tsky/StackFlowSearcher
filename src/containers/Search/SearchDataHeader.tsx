import React from 'react';
import { HeaderItem } from '../../models/HeaderItem';
import { TableHead, TableRow, TableCell } from '@material-ui/core';

/**
 * Isearch data header
 */
interface ISearchDataHeader {
    headerItems: Array<HeaderItem>;
}

/**
 * Search data header
 */
export class SearchDataHeader extends React.Component<ISearchDataHeader> {
    /**
     * Renders search data header
     * @returns
     */
    render() {
        return (
            <TableHead>
                <TableRow>
                    {this.props.headerItems.map((val, idx) => {
                        return (
                            <TableCell
                                key={`${val.name}_${idx}`}
                                align={val.align}
                            >
                                {val.name}
                            </TableCell>
                        );
                    })}
                </TableRow>
            </TableHead>
        );
    }
}
