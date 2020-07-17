import React, {Component} from "react";
import '../../assets/login.css'
import {connect} from "react-redux";

export const userConstants = {
    LOGIN_REQUEST: 'USER_LOGIN_REQUEST',
    LOGIN_SUCCESS: 'USER_LOGIN_SUCCESS',
    LOGIN_FAILURE: 'USER_LOGIN_FAILURE'
}

export function login(userid, password) {
    alert(`ID: ${userid}, PW: ${password}`)
    loginService(userid, password)

    return dispatch =>{
        dispatch(request(userid))
    }

    const request = user => { return { type: userConstants.LOGIN_REQUEST, user}}
    const success = user => { return { type: userConstants.LOGIN_SUCCESS, user}}
    const failure = user => { return { type: userConstants.LOGIN_FAILURE, user}}
}
function handleResponse(response) {
    return response.text()
        .then(text =>{
            const data = text && JSON.parse(text)
            if(!response.ok){
                if(response.status === 401){
                    window.location.reload()
                }
                const error = (data && data.message) ||
                    response.statusText
                return Promise.reject(error)
            }
            return data
        })
}
export function loginService(userid, password) {
    alert(` loginService 진입 `)
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({userid,password})
    }
    return fetch(`https://facebook.github.io/react-native/movies.json`, requestOptions)
        .then(handleResponse)
        .then(user => {
            alert(` json 읽기 성공 `)
            localStorage.setItem('user', JSON.stringify(user))
        })
}

class Login extends Component<any, any>{
    constructor(props) {
        super(props);
        this.state = {
            userid: '',
            password: '',
            name: '',
            submitted: false
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleChange(e){
        const {name, value} = e.target
        this.setState({[name]: value})
    }

    handleSubmit(e){
        e.preventDefault()
        this.setState({ submitted: true})
        const {userid, password} = this.state
        if(userid && password){
            this.props.login(userid, password)
        }
    }

    render() {
        const { userid, password, submitted } = this.state
        const helpBlock = { color: "red"}
        return <div>
            <h2>Login Form</h2>
            <form name="form" onSubmit={ this.handleSubmit }>
                <div className="imgcontainer">
                    <img id={"avatar"} src="https://www.w3schools.com/howto/img_avatar2.png" alt="Avatar" className="avatar"/>
                </div>
                <div className="container">
                    <label htmlFor="uname"><b>Username</b></label>
                    <input type="text" placeholder="Enter Username"
                           name="userid" value={userid}
                           onChange={this.handleChange}
                    />
                    { submitted && !userid &&
                    <div style={helpBlock}>아이디는 필수입력값입니다.</div>
                    }
                    <label htmlFor="psw"><b>Password</b></label>
                    <input type="password" placeholder="Enter Password"
                           name="password" value={password}
                           onChange={this.handleChange}
                    />
                    {
                        submitted && !password &&
                        <div style={helpBlock}> 비밀번호는 필수입력값입니다.</div>
                    }
                    <button type="submit">Login</button>
                    <label>
                        <input type="checkbox" checked={true} name="remember"/> Remember me
                    </label>
                </div>
                <div className="container">
                    <button type="button" className="cancelbtn">Cancel</button>
                    <span className="psw">Forgot <a href="#">password?</a></span>
                </div>
            </form>
        </div>
    }
}
function mapStateToProps(state) {
    const { loggingIn } = state.userReducers
    return { loggingIn}
}
const connectedLoginPage = connect(mapStateToProps, {login})(Login)
export { connectedLoginPage as Login }