import React, {useState} from 'react';
import {MDBBtn, MDBInput} from 'mdbreact'
import {Navigator} from "../commons";


export const Signup = () => {
    const [userid, setUserid] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    return <>
	    <Navigator/>
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
                        <MDBBtn className={"button3"}>Cancel</MDBBtn>
                        <MDBBtn className={"button3"}>Sign Up</MDBBtn>
                    </div>
                </div>
            </form>
        </div>
	    </>
};
export default Signup
