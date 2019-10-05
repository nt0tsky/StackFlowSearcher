import React from 'react';
import {
    Route,
    Switch,
    RouteComponentProps,
    withRouter
} from 'react-router-dom';
import Home from './Home';
import Search from './Search';
import Details from './Details';

interface IRoutes extends RouteComponentProps {}

class Routes extends React.Component<IRoutes> {
    render() {
        return (
            <Switch location={this.props.location}>
                <Route exact path='/' component={Home} />
                <Route path='/result/:intitle?' component={Search} />
                <Route path='/details/:questionId?' component={Details} />
            </Switch>
        );
    }
}

export default withRouter(Routes);
