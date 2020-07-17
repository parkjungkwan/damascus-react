import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux'
import * as serviceWorker from './serviceWorker';
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from "./store";

ReactDOM.render(
    <Provider store={createStore(
        rootReducer,
        applyMiddleware(
            thunk
        )
    )}>
        <App />
    </Provider>,
    document.getElementById('root')
);

serviceWorker.unregister();