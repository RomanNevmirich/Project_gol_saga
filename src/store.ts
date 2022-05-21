import { createStore, combineReducers, applyMiddleware, compose, Reducer } from 'redux';
import createSagaMiddleware, { Saga } from 'redux-saga';
import { rootReducer } from './game';
import { rootSaga } from './sagas';

export const sagaMiddleware = createSagaMiddleware();

export const store = createStore(
    rootReducer,
    compose(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(rootSaga as Saga);