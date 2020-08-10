import { createStore, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { combineReducers } from 'redux';
import signin from '../auth/Signin';

/* redux devtools 때문에 js 파일로 대체함 */
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
    login: signin
});

export default rootReducer


