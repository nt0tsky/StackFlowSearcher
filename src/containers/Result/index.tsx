import React from "react";
import { Grid, TableHead, TableRow, Table, TableCell, TableBody, Paper, Chip } from "@material-ui/core";
import Search from "../Search";
import { RootState } from "../../store";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import KeyboardReturnOutlinedIcon from '@material-ui/icons/KeyboardReturnOutlined';
import { MovebackAction } from "../../store/result/actions";
import "./index.less";
import { TableHeaderItem } from "../../models/TableHeaderItem";
import { QuestionItem } from "../../models/QuestionItem";

/**
 * Iresult
 */
interface IResult {
    searchString: string;
    questionItems?: Array<QuestionItem>;
    movebackAction: Function;
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

    tableHeaderItems = () => {
        let items: Array<TableHeaderItem> = [];
        items.push({name: "Автор", align: "left"});
        items.push({name: "Тема", align: "right"});
        items.push({name: "Количество ответов", align: "right"});
        items.push({name: "Теги", align: "right"});

        return items;
    }

    createData(name: any, calories: any, fat: any, carbs: any, protein: any) {
        return { name, calories, fat, carbs, protein };
    }

    /**
     * Renders result
     * @returns  
     */
    render() {
        return (
            <Grid container spacing={3}>
                <Grid item xs={8}>
                <div className="search-result-row">
                    <KeyboardReturnOutlinedIcon className="home-button" onClick={this.handleClickBack}/>
                    <Search placeholder="Результаты поиска"/>
                </div>
                </Grid>
                <Grid item xs={8} spacing={5}>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                {this.tableHeaderItems().map((val, idx) => {
                                    return <TableCell key={`${val.name}_${idx}`} align={val.align}>{val.name}</TableCell>;
                                })}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.props.questionItems && this.props.questionItems.map(val => {
                                return (
                                    <TableRow key={val.title}>
                                        <TableCell component="th" scope="row" className="user-display-name">
                                            {val.owner.display_name}
                                        </TableCell>
                                        <TableCell align="right">{val.title}</TableCell>
                                        <TableCell align="right">{val.answer_count}</TableCell>
                                        <TableCell align="right">
                                        {val.tags && val.tags.map(val => {
                                            return (
                                                <Chip clickable component="a" label={val} />
                                            );
                                        })}</TableCell>
                                    </TableRow>
                                );
                            })}
                            {/* {rows.map(row => (
                            <TableRow key={row.name}>
                                <TableCell component="th" scope="row">
                                {row.name}
                                </TableCell>
                                <TableCell align="right">{row.calories}</TableCell>
                                <TableCell align="right">{row.fat}</TableCell>
                                <TableCell align="right">{row.carbs}</TableCell>
                            </TableRow>
                            ))} */}
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
        movebackAction: MovebackAction
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Result);