import React from "react";
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import MyChatBot from "./components/MyChatBot";
import Home from "./components/Home";
import './App.css';

class App extends React.Component<any, any>{
    public render(){
        return  <Router>
                    <Link to="/">홈으로 이동</Link> <br/>
                    <Link to="/chat">챗봇 이동</Link>
                    <Route exact path='/chat' component={MyChatBot}/>
                    <Route exact path='/' component={Home}/>
                </Router>
    }
}

export default App;
