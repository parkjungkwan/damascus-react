import {applyMiddleware, createStore} from 'redux'
import createBrowserHistory from 'history/createBrowserHistory';
import reducers from '../reducers'

export const history = createBrowserHistory()

function configureStore(){
    return createStore(
        reducers(history),
        applyMiddleware(
            
        )
    )
}

export default configureStore