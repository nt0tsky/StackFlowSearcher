import React from "react";
import TextField from '@material-ui/core/TextField';
import { RootState } from "../../store";
import { connect } from "react-redux";

/**
 * Isearch
 */
interface ISearch
{
    onSearch?: (text: string) => void;
    searchString?: string;
    placeholder?: string;
    value?: string;
}

/**
 * Isearch state
 */
interface ISearchState
{
    value: string;
}

/**
 * Search
 */
class Search extends React.Component<ISearch, ISearchState>
{
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
    constructor(props: ISearch) {
        super(props);
        this.textSearch = decodeURIComponent(props.value || "");
        this.state = {
            value: ""
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
    }

    /**
     * Handle change field of search
     */
    handleChangeField = (e: any) => {
        const inputValue = e.target.value;
        if (inputValue !== "" && this.textSearch) {
            this.textSearch = "";
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
        return(
            <>
                <TextField
                    id="outlined-search"
                    type="search"
                    margin="normal"
                    variant="standard"
                    value={this.textSearch || this.state.value}
                    fullWidth={true}
                    placeholder={this.props.placeholder}
                    onChange={this.handleChangeField}
                />
          </>
        )
    }
}

const mapStateToProps = (state: RootState) => ({
    searchString: state.search.searchString
});

export default connect(mapStateToProps, null)(Search);