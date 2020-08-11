import {combineReducers} from 'redux'
import { connectRouter } from 'connected-react-router'

//import loginReducer from './LoginReducer'

const reducers = (history) => combineReducers({
    router: connectRouter(history),
    //loginReducer
})

export default reducers