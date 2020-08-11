
import {createStore} from 'redux'
import {createBrowserHistory} from 'history'
import reducers from '../reducers'

export const history = createBrowserHistory()

function configureStore(history){
    return createStore(
        reducers(history),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
}

export default configureStore