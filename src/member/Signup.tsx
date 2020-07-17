import React, {useState} from "react";

const SignUp = () =>{

    return (
        <form name="form" onSubmit={ this.handleSubmit }>
            <div className="container">
                <h1>Sign Up</h1>
                <p>Please fill in this form to create an account.</p>
                <hr/>

                <label htmlFor="email"><b>Email</b></label>
                <input type="text" placeholder="Enter Email" name="userid" onChange={this.handleChange}/>

                <label htmlFor="psw"><b>Password</b></label>
                <input type="password" placeholder="Enter Password" name="password" onChange={this.handleChange} />

                <label htmlFor="psw-repeat"><b>Name</b></label>
                <input type="text" placeholder="Enter Name" name="name" onChange={this.handleChange}/>

                <label>
                    <input type="checkbox" name="remember" style={temp}/>
                </label>

                <p>By creating an account you agree to our <a href="#" style={temp}>Terms
                    & Privacy</a>.</p>

                <div className="clearfix">
                    <button type="button" className="cancelbtn">Cancel</button>
                    <button type="submit" className="signupbtn">Sign Up</button>
                </div>
            </div>
        </form>
    )
}