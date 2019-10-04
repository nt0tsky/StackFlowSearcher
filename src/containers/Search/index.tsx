import React from 'react';
import { Grid } from '@material-ui/core';
import SearchInput from '../SearchInput';
import { RootState } from '../../store';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { MovebackAction } from '../../store/result/actions';
import { SearchItem } from '../../models/SearchItem';
import { SearchAction } from '../../store/search/actions';
import { withRouter, RouteComponentProps } from 'react-router';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import './index.less';
import SearchData from './SearchData';
import { SearchService } from './services/SearchService';

interface MatchParams {
    intitle: string;
}

/**
 * Iresult
 */
interface ISearch extends RouteComponentProps<MatchParams> {
    searchString: string;
    SearchItems: Array<SearchItem>;
    movebackAction: Function;
    searchAction: Function;
}

interface ISearchState {
    page: number;
    rowsPerPage: number;
}

/**
 * Result
 */
class Search extends React.Component<ISearch, ISearchState> {
    /**
     *
     */
    constructor(props: ISearch) {
        super(props);
        this.state = {
            page: 0,
            rowsPerPage: 5
        };
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
     * Handle search of result
     */
    handleSearch = (text: string) => {
        this.props.searchAction(text);
    };

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
                transitionName='loadComponent'
            >
                <Grid container>
                    <Grid item xs={12}>
                        <div className='search-result-row'>
                            <SearchInput
                                onSearch={this.handleSearch}
                                value={this.props.match.params.intitle}
                                placeholder='Результаты поиска'
                            />
                        </div>
                    </Grid>
                    <Grid item xs={12}>
                        <SearchData
                            SearchItems={this.props.SearchItems}
                            headerItems={SearchService.GetHeaderItems()}
                        />
                    </Grid>
                </Grid>
            </ReactCSSTransitionGroup>
        );
    }
}

const mapStateToProps = (state: RootState) => ({
    searchString: state.search.searchString,
    SearchItems: state.search.SearchItems
});

const mapDispatchToProps = (dispatch: any) => {
    return bindActionCreators(
        {
            movebackAction: MovebackAction,
            searchAction: SearchAction
        },
        dispatch
    );
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(Search));
