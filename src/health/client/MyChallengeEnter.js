import React, { Component } from "react";
import {
  ResponsiveContext,
  Box,
  Button,
  Heading,
  Text
} from "grommet";


class MemChallengeEnter extends Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
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
              {/* 헤딩 */}
              <Heading margin={{ top: "10%" }}>내 챌린지</Heading>
              <Box
                direction="row-responsive"
                justify="center"
                align="center"
                pad="xlarge"
                gap="medium"
                round
                margin={{ bottom: "5%" }}
              >
                {/* 챌린지 만들기 */}
                <Box
                  pad="large"
                  align="center"
                  round
                  gap="small"
                  border={{ style: "solid", size: "medium", color: "black" }}
                >
                  <Heading size="small"> 챌린지 만들기 </Heading>
                  {/* 챌린지 만들기 */}
                  <Box
                    round
                    gap="small"
                    margin={{ bottom: "5%" }}
                    width="medium"
                  >
                    <Text textAlign="center">
                      <p>운동 루틴 순서, 목록 조합</p>
                      <p>세트 & 카운트 & 시간, 내가 원하는 대로 구성</p>
                    </Text>
                  </Box>
                  <Button
                    label="챌린지 만들기"
                    color="black"
                    primary
                    // eslint-disable-next-line react/jsx-no-duplicate-props
                    color="status-disabled"
                    href="/MyChallengeName"
                  />
                </Box>
                {/* 내 챌린지 보여주기 */}
                <Box
                  pad="large"
                  align="center"
                  round
                  gap="small"
                  border={{ style: "solid", size: "medium", color: "black" }}
                >
                  <Heading size="small"> 내 챌린지 보여주기 </Heading>
                  {/* 내 챌린지 보여주기 간단 설명 */}
                  <Box
                    round
                    gap="small"
                    margin={{ bottom: "5%" }}
                    width="medium"
                  >
                    <Text textAlign="center">
                      <p>내가 만든 챌린지 불러오기</p>
                      <p>내가 만든 운동 루틴 실천</p>
                    </Text>
                  </Box>
                  <Button
                    label="내 챌린지 보여주기"
                    primary
                    color="status-disabled"
                    href="/MyChallengeList"
                  />
                </Box>
              </Box>
            </Box>
          </Box>
        )}
      </ResponsiveContext.Consumer>
    );
  }
}
export default MemChallengeEnter;
