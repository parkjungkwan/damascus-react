import React, { Component } from "react";
import {
  ResponsiveContext,
  Box,
  Button,
  Heading,                                      
  Form,
  FormField,
  Text
} from "grommet";
import axios from "axios";

class MemberAdd extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      checked: !!props.checked,
      memberEmail: '',
      memberName: '',
      memberPw: '',
      memberType: ''
    };
  }

  //회원가입 데이터 최신
  joinSetState = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  //회원가입 data db에 전송
  join =(e) => {
    e.preventDefault();
    let data={
      memberEmail: this.state.memberEmail,
      memberName: this.state.memberName,
      memberPw: this.state.memberPw,
      memberType: this.state.memberType
    }
    let headers ={
      'Content-type' : 'application/json',
      // 'Authorization' : 'JWT fefege...'
      'Access-Control-Allow-Origin': '*'
    }
    console.log("data : " + data)
    axios
      .post(`http://52.79.235.166/members/join`, JSON.stringify(data), {headers: headers})
      .then(res =>{
        alert('회원 가입 성공')
        //처음 메인페이지로 보내기
        this.props.history.push('/Login')
      })
      .catch(e =>{
        alert('axios 접근 실패')
      })
  }
  // document.querySelectorAll(".StyledTextInput-sc-1x30a0s-0.duvNfq")[0].value="대박";
  // document.querySelectorAll(".StyledTextInput-sc-1x30a0s-0.duvNfq")[1].value="test@naver.com";
  // document.querySelectorAll(".StyledTextInput-sc-1x30a0s-0.duvNfq")[2].value="123123";
  
  componentDidMount() {
    const { memberType } = this.props.match.params
    this.setState({ memberType: memberType })
  }

  render() {
    return (
      <ResponsiveContext.Consumer>
        {size => (
          <Box direction="row" align="center" justify="center">
            <Box
              flex
              align="center"
              justify="center"
              overflow={{ vertical: "hidden" }}
            >
              {/* 회원가입 제목 */}
              <Heading margin={{ top: "10%" }}> 회원가입 </Heading>

              <Box direction="row-responsive" justify="center" align="center" pad="xlarge" gap="medium" round margin={{ bottom: "5%" }} >
                {/* 회원가입 폼 */}
                <Box align="center" margin="medium">
                  <Form>
                  {/* <Form onSubmit={this.join}> */}
                    <FormField name="memberName" label="Name" type="name" value={this.state.memberName} onChange={this.joinSetState}
                      required validate={{regexp: /^[가-힝A-Za-z]{2,}$/, message: '이름을 입력해주세요'}}/>
                    <FormField name="memberEmail" label="Email" type="email" value={this.state.memberEmail} onChange={this.joinSetState} 
                      required validate={{regexp: /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i, message: '이메일형식이 올바르지 않습니다.'}}/>
                    <FormField  name="memberPw" label="Password" type="password" value={this.state.memberPw} onChange={this.joinSetState}
                      required validate={{regexp: /[A-Za-z0-9]{6,12}$/, message: '숫자를 포함한 6~12자리 비밀번호를 입력해주세요.' }}/>
                    <Box align="end" margin={{ top: "20%" }}>
                      {/* <Button type="submit" label="회원가입" primary /> */}
                      <Button label="회원가입" primary onClick={this.join} />
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
export default MemberAdd;
