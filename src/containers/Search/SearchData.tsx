import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
    Paper,
    Grid,
    LinearProgress
} from '@material-ui/core';
import { HeaderItem } from '../../models/HeaderItem';
import { SearchItem } from '../../models/SearchItem';
import { SelectedItemDTO } from './models/SelectedItemDTO';
import { RootState } from '../../store';
import {
    OwnerQuestionsSearch,
    OwnerQuestionsClear
} from '../../store/search/actions';
import { SearchService } from './services/SearchService';
import { SearchDataTable } from './SearchDataTable';

/**
 * Isearch data
 */
interface ISearchData {
    headerItems: Array<HeaderItem>;
    searchItems: Array<SearchItem>;
    searchText: string;
    fetching: boolean;
    ownerQuestions: Array<SearchItem>;
    ownerQuestionsSearch: (userId: number) => void;
    ownerQuestionsClear: () => void;
}

/**
 * Isearch data state
 */
interface ISearchDataState {
    searchText: string;
}

/**
 * Search data
 */
class SearchData extends React.Component<ISearchData, ISearchDataState> {
    /**
     *
     */
    constructor(props: ISearchData) {
        super(props);
        this.state = {
            searchText: props.searchText
        };
    }

    /**
     * Handle select data item of search data
     */
    handleSelectDataItem = (item: SelectedItemDTO) => {
        this.props.ownerQuestionsSearch(item.item.owner.user_id);
    };

    /**
     * Handle remove filter of search data
     */
    handleRemoveFilter = () => {
        this.props.ownerQuestionsClear();
    };

    /**
     * Components did update
     */
    componentDidUpdate() {
        if (this.state.searchText != this.props.searchText) {
            this.setState({
                searchText: this.props.searchText
            });
        }
    }

    /**
     * Renders search data
     * @returns
     */
    render() {
        const baseClasses = `search-data ${
            this.props.ownerQuestions.length ? 'secondary-paper' : ''
        }`;
        return (
            <Grid container>
                <Grid item xs={12}>
                    <Paper className={baseClasses}>
                        <SearchDataTable
                            headerItems={SearchService.GetHeaderItems()}
                            searchItems={this.props.searchItems}
                            onSelectDataItem={this.handleSelectDataItem}
                            onRemoveFilter={this.handleRemoveFilter}
                            hideOnSelect={true}
                        />
                    </Paper>
                </Grid>

                <Grid item xs={12}>
                    {this.props.fetching && <LinearProgress />}
                    {this.props.ownerQuestions.length > 0 && (
                        <Paper className='search-data'>
                            <SearchDataTable
                                headerItems={SearchService.GetHeaderItems()}
                                searchItems={this.props.ownerQuestions}
                                hideOnSelect={false}
                            />
                        </Paper>
                    )}
                </Grid>
            </Grid>
        );
    }
}

const mapStateToProps = (state: RootState) => ({
    ownerQuestions: state.search.ownerItems,
    fetching: state.search.fetching
});

const mapDispatchToProps = (dispatch: any) => {
    return bindActionCreators(
        {
            ownerQuestionsSearch: OwnerQuestionsSearch,
            ownerQuestionsClear: OwnerQuestionsClear
        },
        dispatch
    );
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SearchData);
