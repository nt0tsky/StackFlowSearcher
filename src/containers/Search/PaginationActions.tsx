import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';

interface IPaginationActions {
    count: number;
    page: number;
    rowsPerPage: number;
    onChangePage: (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
        newPage: number
    ) => void;
}

export class PaginationActions extends React.Component<IPaginationActions> {
    /**
     * Handle first page button click of pagination actions
     */
    handleFirstPageButtonClick = (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        this.props.onChangePage(event, 0);
    };

    /**
     * Handle back button click of pagination actions
     */
    handleBackButtonClick = (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        this.props.onChangePage(event, this.props.page - 1);
    };

    /**
     * Handle next button click of pagination actions
     */
    handleNextButtonClick = (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        this.props.onChangePage(event, this.props.page + 1);
    };

    /**
     * Handle last page button click of pagination actions
     */
    handleLastPageButtonClick = (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        this.props.onChangePage(
            event,
            Math.max(
                0,
                Math.ceil(this.props.count / this.props.rowsPerPage) - 1
            )
        );
    };

    render() {
        return (
            <>
                <IconButton
                    onClick={this.handleFirstPageButtonClick}
                    disabled={this.props.page === 0}
                    aria-label='first page'
                >
                    {<FirstPageIcon />}
                </IconButton>
                <IconButton
                    onClick={this.handleBackButtonClick}
                    disabled={this.props.page === 0}
                    aria-label='previous page'
                >
                    {<KeyboardArrowLeft />}
                </IconButton>
                <IconButton
                    onClick={this.handleNextButtonClick}
                    disabled={
                        this.props.page >=
                        Math.ceil(this.props.count / this.props.rowsPerPage) - 1
                    }
                    aria-label='next page'
                >
                    {<KeyboardArrowRight />}
                </IconButton>
                <IconButton
                    onClick={this.handleLastPageButtonClick}
                    disabled={
                        this.props.page >=
                        Math.ceil(this.props.count / this.props.rowsPerPage) - 1
                    }
                    aria-label='last page'
                >
                    {<LastPageIcon />}
                </IconButton>
            </>
        );
    }
}
