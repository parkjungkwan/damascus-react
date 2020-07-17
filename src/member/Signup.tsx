import React, {useState} from 'react';
import {MDBBtn, MDBInput} from 'mdbreact'
const signupActions = {
    REQUEST: 'signup/REQUEST',
    SUCCESS: 'signup/SUCCESS',
    FAILURE: 'signup/FAILURE'
}
export function request(member) { return {type: signupActions.REQUEST, member} }
export function success(member) { return {type: signupActions.SUCCESS, member} }
export function failuer(error) { return {type: signupActions.FAILURE, error}}

const initialState = { userid: '', password: '', name: ''}

export default function signup( state = initialState, action) {
    switch (action.type) {
        case signupActions.REQUEST:
            return {
                ...state
            }
        case signupActions.SUCCESS:
            return {
                ...state
            }
        case signupActions.FAILURE:
            return {
                ...state
            }
        default:
            return state
    }
}
function register() {
    const userid = ''
    const password = ''
    const name = ''
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({userid,password, name})
    }
    return fetch(``)
        .then()
}
function cancel() {

}
const Signup:React.FC = () => {
    const [userid, setUserid] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    return (
        <div>
            <form name="form">
                <div className="container">
                    <h1>Sign Up</h1>
                    <p>Please fill in this form to create an account.</p>
                    <hr/>

                    <label htmlFor="email"><b>Email</b></label>
                    <input type="text" placeholder="Enter Email" name="userid" onChange={e => setUserid(e.target.value)} />

                    <label htmlFor="psw"><b>Password</b></label>
                    <input type="password" placeholder="Enter Password" name="password" onChange={e => setPassword(e.target.value)} />

                    <label htmlFor="psw-repeat"><b>Name</b></label>
                    <input type="text" placeholder="Enter Name" name="name" onChange={e => setName(e.target.value)} />

                    <label>
                        <input type="checkbox" name="remember" />
                    </label>

                    <p>By creating an account you agree to our <a href="/#" >Terms
                        & Privacy</a>.</p>

                    <div className="clearfix">
                        <MDBBtn onClick={register} className={"button3"}>Cancel</MDBBtn>
                        <MDBBtn onClick={cancel} className={"button3"}>Sign Up</MDBBtn>
                    </div>
                </div>
            </form>
        </div>
    );
};

