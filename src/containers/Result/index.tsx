import React from "react";
import { Grid, TableHead, TableRow, Table, TableCell, TableBody, Paper, Chip, TableFooter, Container, TablePagination, Avatar, Tooltip, makeStyles } from "@material-ui/core";
import Search from "../Search";
import { RootState } from "../../store";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import KeyboardReturnOutlinedIcon from '@material-ui/icons/KeyboardReturnOutlined';
import { MovebackAction } from "../../store/result/actions";
import "./index.less";
import { TableHeaderItem } from "../../models/TableHeaderItem";
import { QuestionItem } from "../../models/QuestionItem";
import { IRoute } from "../IRoute";
import { SearchAction, SimpleSearchAction } from "../../store/search/actions";
import { withRouter, RouteComponentProps } from "react-router";
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { deepOrange, deepPurple } from '@material-ui/core/colors';
import { Typography } from "@material-ui/core";

interface MatchParams {
    intitle: string;
}

/**
 * Iresult
 */
interface IResult extends RouteComponentProps<MatchParams> {
    searchString: string;
    questionItems?: Array<QuestionItem>;
    movebackAction: Function;
    searchAction: Function
}

interface IResultState {
    page: number;
    rowsPerPage: number;
}

/**
 * Result
 */
class Result extends React.Component<IResult, IResultState>
{
    /**
     *
     */
    constructor(props: IResult) {
        super(props);
        this.state = {
            page: 0,
            rowsPerPage: 5
        }
    }

    /**
     * Components did mount
     */
    componentDidMount() {
        if (this.props.match && this.props.match.params) {
            this.props.searchAction(this.props.match.params.intitle);
        }
    }

    /**
     * Table header items of result
     */
    tableHeaderItems = () => {
        let items: Array<TableHeaderItem> = [];
        items.push({name: "Автор", align: "left"});
        items.push({name: "Тема", align: "right"});
        items.push({name: "Количество ответов", align: "right"});
        items.push({name: "Теги", align: "right"});

        return items;
    }

    /**
     * Handle search of result
     */
    handleSearch = (text: string) => {
        this.props.searchAction(text);
    }

    /**
     * Handle change page of result
     */
    handleChangePage = (event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, newPage: number) => {
        this.setState({
            page: newPage
        })
    }

    /**
     * Handle change rows per page of result
     */
    handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        this.setState({
            rowsPerPage: parseInt(event.target.value, 10)
        })
    }

    renderAvatar = (name: string) => {
        let nameValue = "U";
        if (name.length) {
            nameValue = name[0].toUpperCase();
        }

        return (
            <Tooltip title={name} >
                <Avatar className="avatar-class-item">{nameValue}</Avatar>
            </Tooltip>
        )
    };

    /**
     * Render body of result
     */
    renderBody = () => {
        if (this.props.questionItems) {
            const startIdx: number = this.state.page * this.state.rowsPerPage;
            const endIdx: number = startIdx + this.state.rowsPerPage;
            const items = this.props.questionItems.slice(startIdx, endIdx).map((val, idx) => {
                    return (<TableRow hover key={`${val.title}_{idx}`}>
                        <TableCell key={`${val.owner.display_name}_display_name`} component="th" scope="row" className="user-display-name">
                            {this.renderAvatar(val.owner.display_name)}
                        </TableCell>
                        <TableCell key={`${val.title}_title`} align="right">
                            <Typography variant="body2">
                                {val.title}
                            </Typography>
                        </TableCell>
                        <TableCell key={`${val.answer_count}_answercount`} align="right">{val.answer_count}</TableCell>
                        <TableCell key={`chips_${idx}`}align="right">
                        {val.tags && val.tags.map((val, idx) => {
                            return (
                                <Chip className="chip-item" variant="outlined" size="small" key={`chip_${idx}`} clickable component="a" label={val} />
                            );
                        })}</TableCell>
                    </TableRow>)
            });

            return items;
        }

        return <div className="results-empty"></div>
    }

    /**
     * Render table of result
     */
    renderTable = () => {
        return(
            <Paper>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            {this.tableHeaderItems().map((val, idx) => {
                                return <TableCell key={`${val.name}_${idx}`} align={val.align}>{val.name}</TableCell>;
                            })}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.renderBody()}
                    </TableBody>
                    <TableFooter>
                        <TablePagination 
                            rowsPerPageOptions={[5, 10]}
                            colSpan={3}
                            count={this.props.questionItems ? this.props.questionItems.length : 0}
                            rowsPerPage={this.state.rowsPerPage}
                            page={this.state.page}
                            onChangePage={this.handleChangePage}
                            onChangeRowsPerPage={this.handleChangeRowsPerPage}
                        />
                    </TableFooter>
                </Table>
            </Paper>
        );
    }

    /**
     * Questions render of result
     */
    questionsRender = () => {
        if (this.props.questionItems && this.props.questionItems.length) {
            return this.renderTable();
        }

        return <div className="no-content"></div>
    }

    /**
     * Renders result
     * @returns  
     */
    render() {
        return (
            <ReactCSSTransitionGroup
            transitionAppear={true}
            transitionAppearTimeout={600}
            transitionEnterTimeout={600}
            transitionLeaveTimeout={200}
            transitionName="loadComponent"
        >
            <Grid container>
                <Grid item xs={12}>
                    <div className="search-result-row">
                        <Search onSearch={this.handleSearch} value={this.props.match.params.intitle} placeholder="Результаты поиска"/>
                    </div>
                </Grid>
                <Grid item xs={12}>
                    {this.questionsRender()}
                </Grid>
            </Grid>
            </ReactCSSTransitionGroup>
        );
    }
};

const mapStateToProps = (state: RootState) => ({
    searchString: state.search.searchString,
    questionItems: state.search.questionItems
});

const mapDispatchToProps = (dispatch: any) => {
    return bindActionCreators({
        movebackAction: MovebackAction,
        searchAction: SearchAction
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Result));