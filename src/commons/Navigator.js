import React from "react";
import { Route, NavLink} from 'react-router-dom'
import style from './commons.module.scss'

const Navigator = () => {


        return <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
            {/*Brand*/}
            <a className="navbar-brand" href="#">
                <span className="glyphicon glyphicon-home"></span>
            </a>
            {/*Links*/}
            <ul className="navbar-nav">
                <li className="nav-item">
                    <NavLink to={"/counter"}>카운터</NavLink>

                </li><span className={`${style.width20px}`}></span>
                <li className="nav-item">
                    <NavLink to={"/counter"}>업무관리</NavLink>
                </li>
                {/*Dropdown*/}
                <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="#" id="navbardrop" data-toggle="dropdown">
                        접 속
                    </a>
                    <div className="dropdown-menu">
                        <NavLink to={"/signin"}>로그인</NavLink><br/>
                        <NavLink to={"/signup"}>회원가입</NavLink>
                    </div>
                </li>
            </ul>

        </nav>
}
export default Navigator