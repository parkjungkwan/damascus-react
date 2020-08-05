import React from "react"
import { Route, BrowserRouter, Switch } from 'react-router-dom'
import { Navigator, TourMap, Footer, Contact, Guide, Modal, Tour} from "../commons"
import MyCounter from "../article/MyCounter";
import Signin from "../member/Signin";
import Signup from "../member/Signup";

const Home = () => {
    return <>
        <Navigator/>
	    <TourMap/>
	    <Tour/>
	    <Guide/>
        <BrowserRouter>
            <Switch>
                <Route path={"/counter"} component={MyCounter}/>
                <Route path={"/signin"} component={Signin}/>
                <Route path={"/signup"} component={Signup}/>
            </Switch>
        </BrowserRouter>
        <Footer/>
    </>
}
export default Home