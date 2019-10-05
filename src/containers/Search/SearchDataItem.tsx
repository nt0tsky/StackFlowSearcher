import React from 'react';
import { SearchItem } from '../../models/SearchItem';
import { TableRow, TableCell, Typography, Chip } from '@material-ui/core';
import { SearchDataItemOwner } from './SearchDataItemOwner';
import { SelectedItemDTO } from './models/SelectedItemDTO';

/**
 * Isearch data item
 */
interface ISearchDataItem {
    item: SearchItem;
    index: number;
    selected: boolean;
    onSelectDataItem?: (item: SelectedItemDTO) => void;
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
            this.props.onSelectDataItem({
                index: this.props.index,
                selected: true
            });
        }
    }

    /**
     * Handle click owner of search data item
     */
    handleClickOwner = () => {
        this.handleTitleClick();
    }

    /**
     * Renders search data item
     * @returns  
     */
    render() {
        const { item } = this.props;
        const title = unescape(item.title);

        return (
            <TableRow onClick={this.handleTitleClick} className="search-data-item" hover selected={this.props.selected} key={`${item.title}_{idx}`}>
                <TableCell
                    key={`${item.owner.display_name}_display_name`}
                    component='th'
                    scope='row'
                    className='user-display-name'
                >
                    <SearchDataItemOwner
                        index={this.props.index}
                        owner={item.owner}
                        onClick={this.handleClickOwner}
                    />
                </TableCell>
                <TableCell key={`${item.title}_title`} align='right'>
                    <Typography variant='body2'>{title}</Typography>
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
