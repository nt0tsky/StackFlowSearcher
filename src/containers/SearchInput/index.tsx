import React from 'react';
import TextField from '@material-ui/core/TextField';
import { RootState } from '../../store';
import { connect } from 'react-redux';

/**
 * Isearch
 */
interface ISearchInput {
    onSearch?: (text: string) => void;
    searchString?: string;
    placeholder?: string;
    value?: string;
}

/**
 * Isearch state
 */
interface ISearchInputState {
    value: string;
}

/**
 * Search
 */
class SearchInput extends React.Component<ISearchInput, ISearchInputState> {
    private textSearch?: string;

    /**
     * Timeout id of search
     */
    private timeoutId: any;

    /**
     * Timeout of search
     */
    private timeout: number = 700;

    /**
     * Creates an instance of search.
     * @param props
     */
    constructor(props: ISearchInput) {
        super(props);
        this.textSearch = decodeURIComponent(props.value || '');
        this.state = {
            value: ''
        };
    }

    /**
     * Listen changes of search
     */
    listenChanges = (text: string) => {
        clearTimeout(this.timeoutId);

        this.timeoutId = setTimeout(() => {
            if (this.props.searchString !== text) {
                if (this.props.onSearch) {
                    this.props.onSearch(text);
                }
            }
        }, this.timeout);
    };

    /**
     * Handle change field of search
     */
    handleChangeField = (e: any) => {
        const inputValue = e.target.value;
        if (inputValue !== '' && this.textSearch) {
            this.textSearch = '';
        }

        this.listenChanges(inputValue);
        this.setState({
            value: inputValue
        });
    };

    /**
     * Renders search
     * @returns
     */
    render() {
        return (
            <>
                <TextField
                    id='outlined-search'
                    type='search'
                    margin='normal'
                    variant='standard'
                    value={this.textSearch || this.state.value}
                    fullWidth={true}
                    placeholder={this.props.placeholder}
                    onChange={this.handleChangeField}
                />
            </>
        );
    }
}

const mapStateToProps = (state: RootState) => ({
    searchString: state.searchInput.searchString
});

export default connect(
    mapStateToProps,
    null
)(SearchInput);
