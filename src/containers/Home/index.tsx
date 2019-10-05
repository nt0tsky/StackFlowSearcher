import React from 'react';
import {
    Grid,
    TableRow,
    TableCell,
    ExpansionPanel,
    ExpansionPanelSummary,
    Typography,
    ExpansionPanelDetails,
    Table,
    TableBody,
    LinearProgress
} from '@material-ui/core';
import SearchInput from '../SearchInput';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { SearchAction } from '../../store/searchinput/actions';
import { ToResultsAction } from '../../store/navigation/actions';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import './index.less';
import { RootState } from '../../store';

interface IHome {
    lastSearch: Array<string>;
    searchAction: (text: string) => void;
    toResultsAction: (text: string) => void;
    fetching: boolean;
}

class Home extends React.Component<IHome> {
    handleSearch = (text: string) => {
        this.props.searchAction(text);
    };

    /**
     * Render body of app
     */
    renderBody = () => {
        return this.props.lastSearch.map((val, idx) => {
            return (
                <TableRow key={idx}>
                    <TableCell component='th' scope='row'>
                        {val}
                    </TableCell>
                </TableRow>
            );
        });
    };

    /**
     * Last search expansion render of app
     */
    lastSearchExpansionRender = () => {
        return (
            <ExpansionPanel>
                <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls='panel1a-content'
                    id='panel1a-header'
                >
                    <Typography>Последний поиск</Typography>
                </ExpansionPanelSummary>

                <ExpansionPanelDetails>
                    <Table>
                        <TableBody>{this.renderBody()}</TableBody>
                    </Table>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        );
    };

    /**
     * Last search of app
     */
    lastSearch = () => {
        if (this.props.lastSearch.length) {
            return this.lastSearchExpansionRender();
        }

        return <div className='no-lastsearch'></div>;
    };

    render() {
        return (
            <ReactCSSTransitionGroup
                transitionAppear={true}
                transitionAppearTimeout={600}
                transitionEnterTimeout={600}
                transitionLeaveTimeout={200}
                transitionName='loadComponent'
            >
                <Grid alignItems='center' container spacing={10}>
                    <Grid item xs={12}>
                        <SearchInput
                            placeholder='Искать на stackoverflow'
                            onSearch={this.handleSearch}
                        />
                        {this.props.fetching && <LinearProgress />}
                    </Grid>
                    <Grid item xs={12}>
                        {this.lastSearch()}
                    </Grid>
                </Grid>
            </ReactCSSTransitionGroup>
        );
    }
}

const mapStateToProps = (state: RootState) => ({
    lastSearch: state.searchInput.lastSearch,
    fetching: state.searchInput.fetching
});

const mapDispatchToProps = (dispatch: any) => {
    return bindActionCreators(
        {
            searchAction: SearchAction,
            toResultsAction: ToResultsAction
        },
        dispatch
    );
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);
