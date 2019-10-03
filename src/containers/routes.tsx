import React from "react";
import { Route, Switch } from 'react-router-dom';
import Home from "./Home";
import Result from "./Result";

export default class Routes extends React.Component
{
    render() {
        return(
            <Switch>
                <Route exact={true} path="/" component={Home} />
                <Route exact={true} path="/result" component={Result} />
            </Switch>
        )
    }
}