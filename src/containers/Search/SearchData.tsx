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
    OwnerQuestionsClear,
    TagFamousSearch,
    TagFamousClear
} from '../../store/search/actions';
import { SearchService } from './services/SearchService';
import { SearchDataTable } from './SearchDataTable';

/**
 * Isearch data
 */
interface ISearchData {
    headerItems: Array<HeaderItem>;
    searchItems: Array<SearchItem>;
    tagItems: Array<SearchItem>;
    searchText: string;
    fetching: boolean;
    ownerQuestions: Array<SearchItem>;
    ownerQuestionsSearch: (userId: number) => void;
    ownerQuestionsClear: () => void;
    tagSearch: (name: string) => void;
    tagFamousClear: () => void;
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
        if (this.props.ownerQuestionsSearch) {
            this.props.ownerQuestionsSearch(item.item.owner.user_id);
        }
    };

    /**
     * Handle select tag item of search data
     */
    handleSelectTagItem = (name: string) => {
        if (this.props.tagSearch) {
            this.props.tagSearch(name);
        }
    }

    /**
     * Handle remove filter of search data
     */
    handleRemoveFilter = () => {
        this.props.ownerQuestionsClear();
        this.handleRemoveTagFilter();
    };

    /**
     * Handle remove tag filter of search data
     */
    handleRemoveTagFilter = () => {
        this.props.tagFamousClear();
    }

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
                            onSelectTagItem={this.handleSelectTagItem}
                            onRemoveFilter={this.handleRemoveFilter}
                            hideOnSelect={true}
                            label={"Результаты поиска"}
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
                                onSelectDataItem={this.handleSelectDataItem}
                                onSelectTagItem={this.handleSelectTagItem}
                                onRemoveFilter={this.handleRemoveFilter}
                                hideOnSelect={true}
                                label={"Наиболее популярные вопросы автора"}
                            />
                        </Paper>
                    )}
                </Grid>
                <Grid item xs={12}>
                    {this.props.fetching && <LinearProgress />}
                    {this.props.tagItems.length > 0 && (
                        <Paper className='search-data'>
                            <SearchDataTable
                                headerItems={SearchService.GetHeaderItems()}
                                searchItems={this.props.tagItems}
                                onSelectDataItem={this.handleSelectDataItem}
                                onSelectTagItem={this.handleSelectTagItem}
                                onRemoveFilter={this.handleRemoveTagFilter}
                                hideOnSelect={true}
                                label={"Поиск по тегам"}
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
    fetching: state.search.fetching,
    tagItems: state.search.tagItems
});

const mapDispatchToProps = (dispatch: any) => {
    return bindActionCreators(
        {
            ownerQuestionsSearch: OwnerQuestionsSearch,
            ownerQuestionsClear: OwnerQuestionsClear,
            tagSearch: TagFamousSearch,
            tagFamousClear: TagFamousClear
        },
        dispatch
    );
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SearchData);
