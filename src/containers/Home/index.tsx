import React from "react";
import { Grid } from "@material-ui/core";
import Search from "../Search";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { SearchAction } from "../../store/search/actions";
import { ToResultsAction } from "../../store/navigation/actions";



interface IHome {
    searchAction: (text: string) => void;
    toResultsAction: (text: string) => void;
}

class Home extends React.Component<IHome>
{
    handleSearch = (text: string) => {
        this.props.searchAction(text);
        // this.props.toResultsAction(text);
    }

    render() {
        return(
            <Grid item xs={12}>
                <Search placeholder="Искать на stackoverflow" onSearch={this.handleSearch}/>
            </Grid>
        )
    }
};

const mapDispatchToProps = (dispatch: any) => {
    return bindActionCreators({
        searchAction: SearchAction,
        toResultsAction: ToResultsAction
    }, dispatch);
};

export default connect(null, mapDispatchToProps)(Home);