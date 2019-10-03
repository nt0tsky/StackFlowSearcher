import * as React from 'react';
import { RootState } from "../../store";
import "./index.less";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import Search from "../Search";
import { Grid, Paper } from '@material-ui/core';

/**
 * Iapp
 */
interface IApp {
    searchString: string;
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
     * Renders app
     * @returns  
     */
    render() {
        return(
            <Grid item xs={12}>
                <Paper>
                    <Search />
                </Paper>
            </Grid>
        )
    }
}

const mapStateToProps = (state: RootState) => ({
    searchString: state.search.searchString
});

const mapDispatchToProps = (dispatch: any) => {
    return bindActionCreators({

    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(App);