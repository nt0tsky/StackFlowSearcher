import * as React from 'react';
import { RootState } from "../../store";
import "./index.less";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { Grid, Container } from '@material-ui/core';
import Routes from '../routes';

/**
 * Iapp
 */
interface IApp {
    
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
            <Container>
                <Grid>
                    <Routes />
                </Grid>
            </Container>
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