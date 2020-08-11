import React from 'react'

import Login from './Login'
import Corporation from '../corporation/Corporation';

class Home extends React.Component {
    render(){
        return(
            <div>
                {sessionStorage.getItem('authId') ?
                <Corporation />
                :<Login />
                }
            </div>
        )
    }
}

export default Home