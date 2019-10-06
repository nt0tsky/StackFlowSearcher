import * as React from 'react';
import { RootState } from '../../store';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { GetQuestionAction } from '../../store/details/actions';
import { RouteComponentProps, withRouter } from 'react-router';
import { AdvancedSearchItem } from '../../models/AdvancedSearchItem';
import {
    Card,
    CardContent,
    CardHeader,
    CssBaseline,
    Typography,
    CardActions,
    Fab
} from '@material-ui/core';
import ReactCSSTransitionGroup = require('react-addons-css-transition-group');
import { DetailsHeader } from './DetailsHeader';
import { DetailsAvatar } from './DetailsAvatar';
import { DetailsSubHeader } from './DetailsSubheader';
import './index.less';
import { DetailsTags } from './DetailsTags';
import BackspaceOutlined from '@material-ui/icons/BackspaceOutlined';

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
     * Handle click back of details
     */
    handleClickBack = () => {
        this.props.history.goBack();
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
                <CssBaseline />
                <Card>
                <Fab aria-label='add' className="floating-back" onClick={this.handleClickBack}>
                    <BackspaceOutlined />
                </Fab>
                    <CardHeader
                        avatar={
                            <DetailsAvatar
                                avatarUrl={
                                    this.props.advancedItem &&
                                    this.props.advancedItem.owner &&
                                    this.props.advancedItem.owner.profile_image
                                }
                            />
                        }
                        title={
                            <DetailsHeader
                                title={this.props.advancedItem.title}
                            />
                        }
                        subheader={
                            <DetailsSubHeader item={this.props.advancedItem} />
                        }
                        className='details-header-container'
                    />
                    <CardContent>
                        <Typography
                            variant='body1'
                            className='details-stack-html'
                        >
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: this.props.advancedItem.body
                                }}
                            ></div>
                        </Typography>
                    </CardContent>
                    <CardActions className='details-stack-footer'>
                        <div></div>
                        <DetailsTags item={this.props.advancedItem} />
                    </CardActions>
                </Card>
                {/* <Paper>
                    <div dangerouslySetInnerHTML={{ __html: this.props.advancedItem.body }}></div>;
                </Paper> */}
            </ReactCSSTransitionGroup>
        );
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
)(withRouter(Details));
