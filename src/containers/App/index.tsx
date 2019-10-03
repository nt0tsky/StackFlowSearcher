import * as React from 'react';
import { RootState } from "../../store";
import "./index.less";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { Grid, Container, Paper, CssBaseline, Typography, Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';
import Routes from '../routes';
import { MovebackAction } from "../../store/result/actions";

/**
 * Iapp
 */
interface IApp {
    lastSearch: Array<string>;
    movebackAction: Function;
}

/**
 * App
 */
class App extends React.Component<IApp>
{
    /**
     *
     */
    constructor(props: IApp) {
        super(props);
        
    }

    /**
     * Handle logo click of app
     */
    handleLogoClick = () => {
        this.props.movebackAction();
    }

    renderBody = () => {
        return this.props.lastSearch.map((val, idx) => {
            return (
                <TableRow key={idx} >
                    <TableCell component="th" scope="row">{val}</TableCell>
                </TableRow>
            )
        });
    }

    /**
     * Renders app
     * @returns  
     */
    render() {
        return(
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="md">
                <Grid alignItems="center" container spacing={10} className="app-grid">
                    <Grid item xs={12}>
                        <Container className="logo-container" maxWidth="sm" onClick={this.handleLogoClick}>
                            <img className="logo-image" src="/src/content/images/logo.png" />
                        </Container>
                    </Grid>
                    <Grid item xs={12}>
                        <Container>
                            <Routes />
                        </Container>
                    </Grid>
                    <Grid item xs={12}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Последний поиск</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.renderBody()}
                            </TableBody>
                        </Table>
                    </Grid>
                </Grid>
            </Container>
          </React.Fragment>
        )
    }
}

const mapStateToProps = (state: RootState) => ({
    searchString: state.search.searchString,
    lastSearch: state.search.lastSearch
});

const mapDispatchToProps = (dispatch: any) => {
    return bindActionCreators({
        movebackAction: MovebackAction
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(App);