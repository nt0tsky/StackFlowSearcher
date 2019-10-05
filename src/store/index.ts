import createSagaMiddleware from 'redux-saga';
import { routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import SearchInputState from './searchinput/types';
import { searchInputReducer } from './searchinput/reducers';
import { searchReducer } from "./search/reducers";
import { detailsReducer } from "./details/reducers";
import { sagaInitial } from '../sagas';
import { SearchState } from './search/types';
import DetailsState from './details/types';

export const history = createBrowserHistory();
const sagaMiddleware = createSagaMiddleware();

const middleware = [sagaMiddleware, routerMiddleware(history)];

export interface State {
    searchInput: SearchInputState;
    search: SearchState;
    details: DetailsState
}

const initialState = {};

const rootReducer = combineReducers<State>({
    searchInput: searchInputReducer,
    search: searchReducer,
    details: detailsReducer
});

const composedEnhancers = compose(applyMiddleware(...middleware));
export type RootState = ReturnType<typeof rootReducer>;
export function configureStore() {
    const store = createStore(rootReducer, initialState, composedEnhancers);
    sagaMiddleware.run(sagaInitial);
    return store;
}
