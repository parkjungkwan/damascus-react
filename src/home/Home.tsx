import React from "react"
import { Route, BrowserRouter, Switch } from 'react-router-dom'
import { Navigator, Footer} from "../common"
import Main from "./Main"
import MyCounter from "../article/MyCounter";
import Signin from "../member/Signin";
import Signup from "../member/Signup";

const Home: React.FC = () => {
    return <>
        <Navigator/>
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Main} />
                <Route path={"/counter"} component={MyCounter}/>
                <Route path={"/signin"} component={Signin}/>
                <Route path={"/signup"} component={Signup}/>
            </Switch>
        </BrowserRouter>
        <Footer/>
    </>
}
export default Home