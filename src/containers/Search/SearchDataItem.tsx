import React from 'react';
import { SearchItem } from '../../models/SearchItem';
import { TableRow, TableCell, Typography, Chip } from '@material-ui/core';
import { SearchDataItemOwner } from './SearchDataItemOwner';

/**
 * Isearch data item
 */
interface ISearchDataItem {
    item: SearchItem;
    index: number;
    onSelectDataItem?: (index: number) => void;
}

/**
 * Search data item
 */
export class SearchDataItem extends React.Component<ISearchDataItem> {
    /**
     * Handle title click of search data item
     */
    handleTitleClick = () => {
        if (this.props.onSelectDataItem) {
            this.props.onSelectDataItem(this.props.index);
        }
    }

    /**
     * Renders search data item
     * @returns  
     */
    render() {
        const item = this.props.item;

        return (
            <TableRow hover key={`${item.title}_{idx}`}>
                <TableCell
                    key={`${item.owner.display_name}_display_name`}
                    component='th'
                    scope='row'
                    className='user-display-name'
                >
                    <SearchDataItemOwner
                        index={this.props.index}
                        owner={item.owner}
                    />
                </TableCell>
                <TableCell key={`${item.title}_title`} align='right' onClick={this.handleTitleClick}>
                    <Typography variant='body2'>{item.title}</Typography>
                </TableCell>
                <TableCell
                    key={`${item.answer_count}_answercount`}
                    align='right'
                >
                    {item.answer_count}
                </TableCell>
                <TableCell key={`chip_${this.props.index}`} align='right'>
                    {item.tags &&
                        item.tags.map((val, idx) => {
                            return (
                                <Chip
                                    className='chip-item'
                                    variant='outlined'
                                    size='small'
                                    key={`chip_${idx}`}
                                    clickable
                                    component='a'
                                    label={val}
                                />
                            );
                        })}
                </TableCell>
            </TableRow>
        );
    }
}
