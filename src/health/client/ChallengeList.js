import React, { Component } from "react";
import axios from "axios";
import { Box, Heading, ResponsiveContext, Image, Text, Button } from "grommet";
import {Link} from 'react-router-dom';

//고정된 파일을 가져올때는 조건처리만 하면 되고, 사진업로드는 디비 저장해야한다.
//사진을 assets폴더 넣고, db의 파일명을 저장해서 불러온다.
//파일업로드 

//axios사용해서 운동 제목 selelctAll

class ChallengeList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      challenges: []
      // exercises: []
    };
  }

  componentDidMount() {
    console.log("didMount 접근")
    axios
      .get(`http://52.79.235.166/challenges/findAll`)
      .then(res => {
        const challenges = res.data;
        this.setState({
          challenges
        });
      })
      .catch(e => {
        alert("aixos 실패");
      });
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
              <Heading margin={{ top: "10%", bottom: "5%" }}>
                챌린지 목록
              </Heading>
              <Box
                      direction="row-responsive"
                      justify="center"
                      align="center"
                      margin={{ bottom: "10%" }}
                      wrap={true}
                      gap="medium"
              >
              {/* row-responsive */}
              {this.state.challenges.map( challenge => {
                  return(
                      <Box key={challenge.challengeId} direction="row-responsive" align="center" border="all" round="small">
                        <Box direction="row-responsive" height="small" width="small" margin="small">
                          {/* challengePhoto */}
                          <Image
                            src= {process.env.PUBLIC_URL+challenge.challengePhoto}
                            alt= {process.env.PUBLIC_URL+challenge.challengePhoto}
                            fit="cover"
                            round="large"
                          />
                        </Box>
                        {/* challengeName, Text */}
                        <Box direction="column" width="medium">
                          <Box>
                            <Link to = {{
                              pathname : `/exerciselist/${challenge.challengeId}/${challenge.challengeName}`
                            }}>
                            <Button>
                              <Heading level="3" style={{ color: "black" }}>
                                {/* challengeName */}
                                {challenge.challengeName}
                              </Heading>
                            </Button>
                            </Link>
                          </Box>
                          <Box>
                            {/* challengeText */}
                            <Text>{challenge.challengeText}</Text>
                          </Box>
                        </Box>
                      </Box>
                  )
                }
              )}
              </Box>
            </Box>
          </Box>
        )}
      </ResponsiveContext.Consumer>
    );
  }
}
export default ChallengeList;
