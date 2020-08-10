import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux'
import * as serviceWorker from './serviceWorker';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";
import signin from "./auth/Signin";
const App = React.lazy(()=>import('./App'))

const rootReducer = combineReducers({

});

ReactDOM.render(
    <Router>
    <Provider store={createStore(rootReducer,applyMiddleware(thunk))}>
        <Suspense fallback={<div className={"loading"}/>}>
            <App />
        </Suspense>
    </Provider>
    </Router>,
    document.getElementById('root')
);

serviceWorker.unregister();