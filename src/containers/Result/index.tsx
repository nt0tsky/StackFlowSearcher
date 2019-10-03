import React from "react";
import { Grid, TableHead, TableRow, Table, TableCell, TableBody, Paper, Chip, TableFooter } from "@material-ui/core";
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
import { SearchAction } from "../../store/search/actions";

interface MatchParams {
    intitle: string;
}

/**
 * Iresult
 */
interface IResult extends IRoute<MatchParams> {
    searchString: string;
    questionItems?: Array<QuestionItem>;
    movebackAction: Function;
    searchAction: Function
}

/**
 * Result
 */
class Result extends React.Component<IResult>
{
    /**
     * Handle click back of result
     */
    handleClickBack = (e: any) => {
        if (this.props.movebackAction) {
            this.props.movebackAction();
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

    tableHeaderItems = () => {
        let items: Array<TableHeaderItem> = [];
        items.push({name: "Автор", align: "left"});
        items.push({name: "Тема", align: "right"});
        items.push({name: "Количество ответов", align: "right"});
        items.push({name: "Теги", align: "right"});

        return items;
    }

    handleChangePage = () => {
        console.log("changed");
    }

    /**
     * Renders result
     * @returns  
     */
    render() {
        return (
            <Grid container>
                <Grid item xs={8}>
                    <div className="search-result-row">
                        <KeyboardReturnOutlinedIcon className="home-button" onClick={this.handleClickBack}/>
                        <Search value={this.props.match.params.intitle} placeholder="Результаты поиска"/>
                    </div>
                </Grid>
                <Grid item xs={8}>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                {this.tableHeaderItems().map((val, idx) => {
                                    return <TableCell key={`${val.name}_${idx}`} align={val.align}>{val.name}</TableCell>;
                                })}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.props.questionItems && this.props.questionItems.map((val, idx) => {
                                return (
                                    <TableRow hover key={`${val.title}_{idx}`}>
                                        <TableCell key={`${val.owner.display_name}_display_name`} component="th" scope="row" className="user-display-name">
                                            {val.owner.display_name}
                                        </TableCell>
                                        <TableCell key={`${val.title}_title`} align="right">{val.title}</TableCell>
                                        <TableCell key={`${val.answer_count}_answercount`} align="right">{val.answer_count}</TableCell>
                                        <TableCell key={`chips_${idx}`}align="right">
                                        {val.tags && val.tags.map((val, idx) => {
                                            return (
                                                <Chip key={`chip_${idx}`} clickable component="a" label={val} />
                                            );
                                        })}</TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </Grid>
            </Grid>
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

export default connect(mapStateToProps, mapDispatchToProps)(Result);