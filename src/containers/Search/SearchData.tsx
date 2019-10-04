import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Paper, Table, TableBody, TablePagination } from '@material-ui/core';
import { HeaderItem } from '../../models/HeaderItem';
import { SearchItem } from '../../models/SearchItem';
import { SearchDataHeader } from './SearchDataHeader';
import { SearchDataItem } from './SearchDataItem';

/**
 * Isearch data
 */
interface ISearchData {
    headerItems: Array<HeaderItem>;
    SearchItems: Array<SearchItem>;
}

interface ISearchDataState {
    rowsPerPage: number;
    page: number;
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
        this.state = {
            page: 0,
            rowsPerPage: 5
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
     * Render items of search data
     */
    renderItems = () => {
        const startIdx: number = this.state.page * this.state.rowsPerPage;
        const endIdx: number = startIdx + this.state.rowsPerPage;
        return this.props.SearchItems.slice(startIdx, endIdx).map(
            (val, idx) => {
                return (
                    <SearchDataItem
                        key={`data-item-${idx}`}
                        index={idx}
                        item={val}
                    />
                );
            }
        );
    };

    /**
     * Renders search data
     * @returns
     */
    render() {
        return (
            <Paper className='search-data'>
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
