import createSagaMiddleware from 'redux-saga';
import { routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import SearchState from './search/types';
import { searchReducer } from './search/reducers';
import { sagaInitial } from '../sagas';

export const history = createBrowserHistory();
const sagaMiddleware = createSagaMiddleware();

const middleware = [sagaMiddleware, routerMiddleware(history)];

export interface State {
    search: SearchState;
}

const initialState = {};

const rootReducer = combineReducers<State>({
    search: searchReducer
});

const composedEnhancers = compose(applyMiddleware(...middleware));
export type RootState = ReturnType<typeof rootReducer>;
export function configureStore() {
    const store = createStore(rootReducer, initialState, composedEnhancers);
    sagaMiddleware.run(sagaInitial);
    return store;
}
