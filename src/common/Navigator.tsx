import React from "react";
import { Route, NavLink} from 'react-router-dom'
import Home from "../home/Home";
import MyCounter from "../article/MyCounter";

const Navigator :React.FC = () => {


        return <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
            {/*Brand*/}
            <a className="navbar-brand" href="#">
                <span className="glyphicon glyphicon-home"></span>
            </a>
            {/*Links*/}
            <ul className="navbar-nav">
                <li className="nav-item">
                    <NavLink to={"/counter"}>카운터</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to={"/counter"}>업무관리</NavLink>
                </li>
                {/*Dropdown*/}
                <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="#" id="navbardrop" data-toggle="dropdown">
                        로그인
                    </a>
                    <div className="dropdown-menu">
                        <NavLink to={"/signin"}>Sign In</NavLink>
                        <NavLink to={"/signup"}>Sign Up</NavLink>
                    </div>
                </li>
            </ul>

        </nav>
}
export default Navigator