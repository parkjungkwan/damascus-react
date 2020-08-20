/* eslint-disable no-undef */
import React, { Component } from "react";
import {
  ResponsiveContext,
  Box,
  TextInput,
  Heading,
  Form,
  FormField,
  Button
} from "grommet";
import axios from "axios";
import {Link} from "react-router-dom";

class MyChallengeName extends Component {

  constructor(props) {
    super(props);
    this.state={
        myChallengeName: '',
        myChallenges: []
    }
  }

  //넣은 값 변경하기
  writeChallengeName = (e) => {
    this.setState({
      myChallengeName: e.target.value
      
    })
  }

  //버튼 누르면 myChallengeName DB에 저장
  insertChallengeName = (memberId) => (e) => {
    e.preventDefault();
    let memberId = sessionStorage.getItem("memberId")
      let data={
        myChallengeName: this.state.myChallengeName
      }
      let headers={
        'Content-type' : 'application/json',
        // 'Authorization' : 'JWT fefege...'
        'Access-Control-Allow-Origin': '*'
      }
        axios
        .post(`http://52.79.235.166/myChallenges/insert/${memberId}`,JSON.stringify(data), {headers: headers})
        .then(res =>{
          alert('저장완료')
          axios
            .get(`http://52.79.235.166/myChallenges/findFirstByOrderByMyChallengeIdDesc`)
            .then(res => {
              const myChallenges = res.data
              this.setState({
                myChallenges
              })
            })
            .catch(e => {
              alert("axios 실패")
            })
          })
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
              {/* 내 챌린지 만들기 */}
              <Heading margin={{top:"5%"}}> 나만의 챌린지 구성하기 </Heading>

              {/* 챌린지 이름 넣기 */}
              <Box align="center" justify="center" margin={{bottom:"10%", top:"5%"}}>
                <Form onSubmit={this.insertChallengeName(this.state.memberId)}>
                <FormField label="챌린지 이름" align="center" justify="center" onSubmit={this.insertChallengeName}>
                    <TextInput
                    placeholder="나만의 챌린지 이름 짓기"
                    size="large"
                    name= "myChallengeName"
                    value={this.state.myChallengeName}
                    onChange={this.writeChallengeName}
                    />
                </FormField>
                {/* 버튼  */}
                <Box direction="row-responsive" gap="large" align="center">
                    <Box>
                      <Button type="submit" label="저장" margin={{ top: "10%" }}></Button>
                    </Box>
                    <Box>
                      <Link to = {{
                        pathname: `/MyChallengeExerciseInsert/${this.state.myChallenges.myChallengeId}`
                      }}>
                        <Button type="submit" label="다음" margin={{top:"10%"}}></Button>
                      </Link>
                    </Box>  
                </Box>
                </Form>
              </Box>
            </Box>
          </Box>
        )}
      </ResponsiveContext.Consumer>
    );
  }
}
export default MyChallengeName;
