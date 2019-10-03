import React from "react";
import { Route, Switch, RouteComponentProps, withRouter } from 'react-router-dom';
import Home from "./Home";
import Result from "./Result";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { RootState } from "../store";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

interface IRoutes extends RouteComponentProps {

}

class Routes extends React.Component<IRoutes>
{
    render() {
        return(
            <TransitionGroup>
                <CSSTransition
                    key={this.props.location.key}
                    timeout={{ enter: 300, exit: 300 }}
                    classNames={'fade'}
                >
                    <Switch location={this.props.location}>
                        <Route exact path="/" component={Home} />
                        <Route path="/result/:intitle?" component={Result}/>
                    </Switch>
                </CSSTransition>
            </TransitionGroup>
        )
    }
}

export default withRouter(Routes);