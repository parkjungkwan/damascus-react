import React, { Component} from "react";
import { ResponsiveContext, Box, Heading, Button, Text } from "grommet";


// 필요 양식 : 이메일, 이름 , 비밀번호
class SignUp extends Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ResponsiveContext.Consumer>
        {size => (
          <Box direction="row" align="center" justify="center">
            <Box flex align="center" justify="center" overflow={{ vertical: "hidden" }}>
              {/* 헤딩 */}
              <Heading margin={{ top: "10%" }}>회원가입</Heading>
              <Box direction="row-responsive" justify="center" align="center" pad="xlarge" gap="medium" round margin={{bottom:"5%"}}>
                {/* 운동 회원 */}
                <Box pad="large" align="center" round gap="small" border={{style:"solid", size: "medium", color: "black"}} >
                <Heading size="small"> 운동 회원 </Heading>
                  {/* 운동 회원 간단 설명 */}
                  <Box round gap="small" margin={{bottom:"5%"}} width="medium">
                    <Text textAlign="center">
                      <p>챌린지 가져오기 및 수정</p>
                      <p>추천 코치 조회 및 매칭</p>
                      <p>운동 및 식사 일일 기록</p>
                    </Text>
                  </Box>
                  <Button label="운동 회원으로 가입하기" color="black" primary color="status-disabled" href="/SignUp/1"></Button>
                </Box>
                {/* 코치 회원 */}
                <Box pad="large" align="center" round gap="small" border={{style: "solid", size: "medium", color: "black"}} >
                <Heading size="small"> 코치 회원 </Heading>
                {/* 코치 회원 간단 설명 */}
                <Box round gap="small" margin={{bottom:"5%"}} width="medium">
                  <Text textAlign="center">
                    <p>코치 프로필 작성</p>
                    <p>코치 추천 게시판에 프로필 게시</p>  
                    <p>운동 회원들에게 맞춤형 챌린지 추천</p>
                  </Text>
                </Box>
                <Button label="코치 회원으로 가입하기" primary color="status-disabled" href="/SignUp/2"></Button>
                </Box>
              </Box>
            </Box>
          </Box>
        )}
      </ResponsiveContext.Consumer>
    );
  };
}
export default SignUp;
