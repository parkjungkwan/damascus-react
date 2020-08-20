import React, { Component } from "react";
import { ResponsiveContext, Box, Button, Heading, Form, FormField, Text } from "grommet";
import axios from "axios";

class MemberAuth extends Component {
  constructor(props) {
    super(props);
    this.state = {
       checked: !!props.checked,
      memberEmail: '',
      memberPw: ''
    };
  }

  //login state 반영
  loginSetState = (e) => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  // login 작용
  login = (e) =>{
    e.preventDefault();

    let data ={
      memberEmail: this.state.memberEmail,
      memberPw: this.state.memberPw
    }
    let headers ={
      'Content-type' : 'application/json',
      // 'Authorization' : 'JWT fefege...'
      'Access-Control-Allow-Origin': '*'
    }
    axios
      .post(`http://52.79.235.166/members/login`,JSON.stringify(data), {headers: headers})
      .then(res =>{
        if(res.data){
          alert('로그인 성공')
          sessionStorage.setItem("memberEmail", res.data.memberEmail)
          sessionStorage.setItem("memberId", res.data.memberId)
          sessionStorage.setItem("memberType", res.data.memberType)
          window.location.assign("/")
        }else{
          alert('아이디와 비밀번호가 틀리거나 없습니다.')
        }
      })
      .catch(e => {
        alert('axios 접근 실패')
      })
  }

  render() {
    return (
      <ResponsiveContext.Consumer>
        {size => (
          <Box direction="row" align="center" justify="center">
            <Box flex align="center" justify="center" overflow={{ vertical: "hidden" }} >
                {/* 로그인 제목 */}
                <Heading margin={{ top: "10%" }}> 로그인 </Heading>

                <Box direction="row-responsive" justify="center" align="center" pad="small" gap="medium" round margin={{bottom:"5%"}}>
                    {/* 로그인 폼 */}
                    <Box align="center" pad="large">
                        <Form onSubmit={this.login}>
                            <FormField type="Email" name="memberEmail" label="Email" value={this.state.memberEmail} onChange={this.loginSetState} />
                            <FormField name="memberPw" label="Password" type="password" value={this.state.memberPw} onChange={this.loginSetState} />
                            <Box  align="center" margin={{top:"20%"}} direction="row" gap="small">
                              <Box> <Button label="회원가입으로 " primary href="/SignUpType" /> </Box>
                              <Box> <Button type="submit" label="로그인" primary /> </Box>
                            </Box>
                        </Form>
                    </Box>
                   
                </Box>
            </Box>
          </Box>
        )}
      </ResponsiveContext.Consumer>
    );
  }
}
export default MemberAuth;