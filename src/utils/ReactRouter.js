import React from "react";
import { Switch, Route } from 'react-router-dom'
import { Home } from '../home'

const Router = () => {
    return <>
    <Switch>
        <Route path={"/"} exact><Home/></Route>
    </Switch>
    </>
}
export default Router