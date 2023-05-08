import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App/App';
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import axios from 'axios';



const favorites = (state = [], action) => {
    if (action.type === 'SET_FAVORITE_GIF') {
        return [...state, action.payload];
    }
    return state;
}


const sagaMiddleware = createSagaMiddleware();

const storeInstance = createStore(
    combineReducers({
        favorites,
    }),
    applyMiddleware(sagaMiddleware, logger),
);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Provider store={storeInstance}>
            <App />
        </Provider>
    </React.StrictMode>
);
