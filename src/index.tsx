import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { history, configureStore } from './store';
import App from './containers/App';

const store = configureStore();

const Root = () => (
    <Provider store={store}>
        <Router history={history}>
            <App />
        </Router>
    </Provider>
);

render(<Root />, document.getElementById('main'));
