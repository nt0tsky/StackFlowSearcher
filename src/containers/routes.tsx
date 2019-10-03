import React from "react";
import { Route, Switch } from 'react-router-dom';
import Home from "./Home";
import Result from "./Result";

export default class Routes extends React.Component
{
    render() {
        return(
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/result/:intitle?" component={Result}/>
            </Switch>
        )
    }
}