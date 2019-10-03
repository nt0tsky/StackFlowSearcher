import React from "react";
import { Grid } from "@material-ui/core";
import Search from "../Search";
import { RootState } from "../../store";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";


interface IHome {
    searchString: string;
}

class Home extends React.Component<IHome>
{
    render() {
        return(
            <Grid item xs={12}>
                <Search placeholder="Искать на stackoverflow"/>
            </Grid>
        )
    }
};

const mapStateToProps = (state: RootState) => ({
    searchString: state.search.searchString
});

const mapDispatchToProps = (dispatch: any) => {
    return bindActionCreators({

    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);