import * as React from 'react';
import { RootState } from '../../store';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { GetQuestionAction } from '../../store/details/actions';
import { RouteComponentProps } from 'react-router';
import { AdvancedSearchItem } from '../../models/AdvancedSearchItem';
import { Paper } from '@material-ui/core';
import ReactCSSTransitionGroup = require('react-addons-css-transition-group');

/**
 * Idetails route
 */
interface IDetailsRoute {
    questionId?: string;
}

/**
 * Idetails
 */
interface IDetails extends RouteComponentProps<IDetailsRoute> {
    advancedItem: AdvancedSearchItem;
    fetching: boolean;
    questionDetails: (questionId: string) => void;
}

/**
 * Idetails state
 */
interface IDetailsState {}

/**
 * Details
 */
class Details extends React.Component<IDetails, IDetailsState> {
    
    /**
     * Components did mount
     */
    componentDidMount() {
        const id = this.props.match.params.questionId;
        if (id) {
            this.props.questionDetails(id);
        }
    }

    /**
     * Renders details
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
                <Paper>
                    <div dangerouslySetInnerHTML={{ __html: this.props.advancedItem.body }}></div>;
                </Paper>
            </ReactCSSTransitionGroup>
        )
    }
}

const mapStateToProps = (state: RootState) => ({
    advancedItem: state.details.advancedSearchItem,
    fetching: state.details.fetching
});

const mapDispatchToProps = (dispatch: any) => {
    return bindActionCreators(
        {
            questionDetails: GetQuestionAction
        },
        dispatch
    );
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Details);