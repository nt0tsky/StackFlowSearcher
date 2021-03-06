import React from 'react';
import { SearchItem } from '../../models/SearchItem';
import { TableRow, TableCell, Typography, Chip } from '@material-ui/core';
import { SearchDataItemOwner } from './SearchDataItemOwner';
import { SelectedItemDTO } from './models/SelectedItemDTO';
import './index.less';
import { SelectedItemType } from './models/SelectedItemType';
import { ToDetails } from '../../store/navigation/actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

/**
 * Isearch data item
 */
interface ISearchDataItem {
    item: SearchItem;
    index: number;
    selected: boolean;
    onSelectDataItem?: (item: SelectedItemDTO) => void;
    onSelectTagItem?: (item: SelectedItemDTO) => void;
    toDetails: (questionId: number) => void;
}

/**
 * Search data item
 */
class SearchDataItem extends React.Component<ISearchDataItem> {
    /**
     * Handle click owner of search data item
     */
    handleClickOwner = () => {
        if (this.props.onSelectDataItem) {
            this.props.onSelectDataItem(
                this.createSelectedItemType(SelectedItemType.AVATAR)
            );
        }
    };

    /**
     * Create selected item type of search data item
     */
    createSelectedItemType = (
        type: SelectedItemType,
        value?: string
    ): SelectedItemDTO => {
        return {
            index: this.props.index,
            item: this.props.item,
            type: type,
            selected: true,
            value: value
        };
    };

    /**
     * Handle click tag of search data item
     */
    handleClickTag = (name: string) => {
        if (this.props.onSelectTagItem) {
            this.props.onSelectTagItem(
                this.createSelectedItemType(SelectedItemType.TAG, name)
            );
        }
    };

    /**
     * Handle click content of search data item
     */
    handleClickContent = () => {
        this.props.toDetails(this.props.item.question_id);
    }

    /**
     * Renders search data item
     * @returns
     */
    render() {
        const { item } = this.props;
        const title = unescape(item.title);

        return (
            <TableRow
                className='search-data-item'
                hover
                selected={this.props.selected}
                key={`${item.title}_{idx}`}
            >
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
                <TableCell key={`${item.title}_title`} align='right' onClick={this.handleClickContent}>
                    <Typography variant='body2'>{title}</Typography>
                </TableCell>
                <TableCell
                    key={`${item.answer_count}_answercount`}
                    align='right'
                    onClick={this.handleClickContent}
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
                                    onClick={() => this.handleClickTag(val)}
                                />
                            );
                        })}
                </TableCell>
            </TableRow>
        );
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return bindActionCreators(
        {
            toDetails: ToDetails
        },
        dispatch
    );
};

export default connect(
    null,
    mapDispatchToProps
)(SearchDataItem);