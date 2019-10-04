import React from "react";
import { Route, Switch, RouteComponentProps, withRouter } from 'react-router-dom';
import Home from "./Home";
import Result from "./Result";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { RootState } from "../store";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

interface IRoutes extends RouteComponentProps {

}

class Routes extends React.Component<IRoutes>
{
    render() {
        return(
            <Switch location={this.props.location}>
                <Route exact path="/" component={Home} />
                <Route path="/result/:intitle?" component={Result}/>
            </Switch>
        )
    }
}

export default withRouter(Routes);