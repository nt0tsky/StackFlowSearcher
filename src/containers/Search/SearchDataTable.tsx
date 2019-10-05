import React from "react";
import { Table, TableBody, TablePagination, Chip } from "@material-ui/core";
import { SearchDataHeader } from "./SearchDataHeader";
import { HeaderItem } from "../../models/HeaderItem";
import { SearchItem } from "../../models/SearchItem";
import { SelectedItemDTO } from "./models/SelectedItemDTO";
import { SearchDataItem } from "./SearchDataItem";
import FaceIcon from '@material-ui/icons/Face';

/**
 * Isearch data table
 */
interface ISearchDataTable {
    headerItems: Array<HeaderItem>;
    searchItems: Array<SearchItem>;
    onSelectDataItem?: (item: SelectedItemDTO) => void;
    onRemoveFilter?: () => void;
    hideOnSelect: boolean;
}

/**
 * Isearch data table state
 */
interface ISearchDataTableState {
    rowsPerPage: number;
    page: number;
    selectedItem: SelectedItemDTO;
}

/**
 * Search data table
 */
export class SearchDataTable extends React.Component<ISearchDataTable, ISearchDataTableState>
{
    /**
     *
     */
    constructor(props: ISearchDataTable) {
        super(props);
        this.state = {
            page: 0,
            rowsPerPage: 5,
            selectedItem: new SelectedItemDTO()
        }
    }

    /**
     * Handle change page of search data
     */
    handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
        newPage: number
    ) => {
        this.setState({
            page: newPage,
            selectedItem: new SelectedItemDTO()
        });
    };

    /**
     * Handle select data item of search data table
     */
    handleSelectDataItem = (item: SearchItem, idx: number) => {
        const selectedItem: SelectedItemDTO = {
            index: idx,
            item: item,
            selected: true
        };
        if (this.props.hideOnSelect) {
            this.setState({
                selectedItem: selectedItem
            })
        }
        if (this.props.onSelectDataItem) {
            this.props.onSelectDataItem(selectedItem);
        }
    }

    /**
     * Render items of search data
     */
    renderItems = () => {
        const startIdx: number = this.state.page * this.state.rowsPerPage + (this.state.selectedItem.index ? this.state.selectedItem.index : 0);
        const endIdx: number = startIdx + (this.state.selectedItem.selected ? 1: this.state.rowsPerPage);
        return this.props.searchItems.slice(startIdx, endIdx).map(
            (val, idx) => {
                const index: number = this.state.selectedItem.selected  ? this.state.selectedItem.index : idx;
                return (
                    <SearchDataItem
                        key={`data-item-${idx}`}
                        index={index}
                        item={val}
                        selected={this.state.selectedItem.selected}
                        onSelectDataItem={() => this.handleSelectDataItem(val, idx)}
                    />
                );
            }
        );
    };

    /**
     * Filter reset of search data table
     */
    filterReset = () => {
        this.setState({
            selectedItem: new SelectedItemDTO()
        })

        if (this.props.onRemoveFilter) {
            this.props.onRemoveFilter();
        }
    }

    /**
     * Renders search data table
     * @returns  
     */
    render() {
        return(
            <>
                {this.props.hideOnSelect && this.state.selectedItem.selected && 
                <Chip 
                    icon={<FaceIcon />}
                    label="Сбросить"
                    onDelete={this.filterReset}
                    size="small"
                    className="chip-back"

                />}
                <Table size='small'>
                    <SearchDataHeader headerItems={this.props.headerItems} />
                    <TableBody>{this.renderItems()}</TableBody>
                </Table>
                <TablePagination
                    rowsPerPageOptions={[]}
                    colSpan={3}
                    component='div'
                    count={this.props.searchItems.length}
                    rowsPerPage={this.state.rowsPerPage}
                    page={this.state.page}
                    onChangePage={this.handleChangePage}
                />
            </>
        )
    }
}