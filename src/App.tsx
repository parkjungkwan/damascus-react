import React, {Component} from "react";
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import {Counter, HelloName, Clock, Cat, MyChatBot} from "./_components";
import {Provider} from 'react-redux';
import {ConnectedRouter} from 'connected-react-router';
import {Home} from "./progress";
import './App.css';

class App extends Component<any, any>{
    public render(){

        return  <div>
                    <Router>
                    <Link to="/">홈으로</Link> <br/>
                    <Link to="/chat">챗봇</Link><br/>
                    <Link to="/counter">카운터</Link><br/>
                    <Link to="/hello">헬로우</Link><br/>
                    <Link to="/clock">시계</Link><br/>
                    <Link to="/cat">고양이</Link><br/>
                    <Route exact path='/' component={Home}/>
                    <Route exact path='/chat' component={MyChatBot}/>
                    <Route exact path='/cat' component={Cat}/>
                    <Route exact path='/clock' component={Clock}/>
                    <Route exact path='/counter'><Counter/></Route>
                </Router>
        </div>
    }
}

export default App;
