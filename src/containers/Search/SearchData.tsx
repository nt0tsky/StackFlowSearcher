import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Paper, Table, TableBody, TablePagination, Chip } from '@material-ui/core';
import { HeaderItem } from '../../models/HeaderItem';
import { SearchItem } from '../../models/SearchItem';
import { SearchDataHeader } from './SearchDataHeader';
import { SearchDataItem } from './SearchDataItem';
import FaceIcon from '@material-ui/icons/Face';
import { SelectedItemDTO } from './models/SelectedItemDTO';

/**
 * Isearch data
 */
interface ISearchData {
    headerItems: Array<HeaderItem>;
    SearchItems: Array<SearchItem>;
    searchText: string;
}

/**
 * Isearch data state
 */
interface ISearchDataState {
    rowsPerPage: number;
    page: number;
    selectedItem: SelectedItemDTO;
    searchText: string;
}

/**
 * Search data
 */
class SearchData extends React.Component<ISearchData, ISearchDataState> {
    
    /**
     *
     */
    constructor(props: ISearchData) {
        super(props);
        debugger;
        this.state = {
            page: 0,
            rowsPerPage: 5,
            searchText: props.searchText,
            selectedItem: {
                index: 0,
                selected: false 
            }
        };
    }

    /**
     * Handle change page of search data
     */
    handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
        newPage: number
    ) => {
        this.setState({
            page: newPage
        });
    };

    /**
     * Handle change rows per page of result
     */
    handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        this.setState({
            rowsPerPage: parseInt(event.target.value, 10)
        });
    };

    /**
     * Handle select data item of search data
     */
    handleSelectDataItem = (item: SelectedItemDTO) => {
        this.setState({
            selectedItem: item
        });
    }

    /**
     * Components did update
     */
    componentDidUpdate() {
        if (this.state.searchText != this.props.searchText) {
            this.setState({
                page: 0,
                searchText: this.props.searchText
            });
        }
    }

    /**
     * Render items of search data
     */
    renderItems = () => {
        const startIdx: number = this.state.page * this.state.rowsPerPage + (this.state.selectedItem.index ? this.state.selectedItem.index : 0);
        const endIdx: number = startIdx + (this.state.selectedItem.selected ? 1: this.state.rowsPerPage);
        return this.props.SearchItems.slice(startIdx, endIdx).map(
            (val, idx) => {
                const index: number = this.state.selectedItem.selected  ? this.state.selectedItem.index : idx;
                return (
                    <SearchDataItem
                        key={`data-item-${idx}`}
                        index={index}
                        item={val}
                        selected={this.state.selectedItem.selected}
                        onSelectDataItem={this.handleSelectDataItem}
                    />
                );
            }
        );
    };

    renderUnselect = () => {
        if (this.state.selectedItem.selected) {
            return(
                <Chip 
                    icon={<FaceIcon />}
                    label="Сбросить"
                    onDelete={this.handleUnselect}
                    size="small"
                    className="chip-back"

                />
            )
        }
    }

    /**
     * Handle unselect of search data
     */
    handleUnselect = () => {
        this.setState({
            selectedItem: {
                index: 0,
                selected: false
            }
        });
    }

    /**
     * Renders search data
     * @returns
     */
    render() {
        return (
            <Paper className='search-data'>
                {this.renderUnselect()}
                <Table size='small'>
                    <SearchDataHeader headerItems={this.props.headerItems} />
                    <TableBody>{this.renderItems()}</TableBody>
                </Table>
                <TablePagination
                    rowsPerPageOptions={[]}
                    colSpan={3}
                    component='div'
                    count={
                        this.props.SearchItems
                            ? this.props.SearchItems.length
                            : 0
                    }
                    rowsPerPage={this.state.rowsPerPage}
                    page={this.state.page}
                    onChangePage={this.handleChangePage}
                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                />
            </Paper>
        );
    }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch: any) => {
    return bindActionCreators({}, dispatch);
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SearchData);
