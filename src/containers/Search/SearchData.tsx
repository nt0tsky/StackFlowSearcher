import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Paper, Table, TableBody, TablePagination, Chip } from '@material-ui/core';
import { HeaderItem } from '../../models/HeaderItem';
import { SearchItem } from '../../models/SearchItem';
import { SearchDataHeader } from './SearchDataHeader';
import { SearchDataItem } from './SearchDataItem';
import FaceIcon from '@material-ui/icons/Face';
import DoneIcon from '@material-ui/icons/Done';

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
    startIdx: number;
    endIdx: number;
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
            rowsPerPage: 5,
            startIdx: -1,
            endIdx: -1
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
    handleSelectDataItem = (index: number) => {
        this.setState({
            startIdx: index,
            endIdx: index +1
        });
    }

    /**
     * Render items of search data
     */
    renderItems = () => {
        const startIdx: number = this.state.startIdx !== -1 ? this.state.startIdx : this.state.page * this.state.rowsPerPage;
        const endIdx: number = this.state.endIdx !== -1 ? this.state.endIdx : startIdx + this.state.rowsPerPage;
        return this.props.SearchItems.slice(startIdx, endIdx).map(
            (val, idx) => {
                return (
                    <SearchDataItem
                        key={`data-item-${idx}`}
                        index={idx}
                        item={val}
                        onSelectDataItem={this.handleSelectDataItem}
                    />
                );
            }
        );
    };

    renderUnselect = () => {
        if (this.state.startIdx !== -1 && this.state.endIdx !== -1) {
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
            startIdx: -1,
            endIdx: -1
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
