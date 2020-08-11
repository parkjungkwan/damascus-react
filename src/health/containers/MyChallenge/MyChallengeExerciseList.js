import React, { Component } from "react";
import { Box, Heading, ResponsiveContext, Text, Form, Button } from "grommet";
import axios from "axios";

class MyChallengeExerciseList extends Component {
  constructor(props) {
    super(props);
    this.state = {
        myExercises: [],
        myChallengeName: '',
        myChallengeId:'',
        myExerciseSet: '',
        myExerciseCount:'',
        myExerciseComplete: false
  }; 
}

  componentDidMount() {
    let self=this;
    const {myChallengeId, myChallengeName } = this.props.match.params;

    // this.setState({
    //   myChallengeId
    // })
    
    axios
        .get(`http://52.79.235.166/MyExercise/findbymychallengeid/${myChallengeId}`)
        .then(res => {
          console.log("myChallengeId : " + myChallengeId)
          const myExercises = res.data
          self.setState({
                myExercises,
                myChallengeName
            });
        })
        .catch(res =>{
            console.log("axios 접근 실패")
        });
  }

  myExercised = (myExerciseId, myExerciseSet, myExerciseCount) => (e) => {
    e.preventDefault();

    // let memberId = sessionStorage.getItem("memberId")
    let today = new Date();
    let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

    let data={

      myExerciseSet: myExerciseSet,
      myExerciseCount: myExerciseCount,
      myExerciseDate: date,
      myExerciseComplete: true,
    }

    let headers={
      'Content-type' : 'application/json',
      // 'Authorization' : 'JWT fefege...'
      'Access-Control-Allow-Origin': '*'
    }

    axios
      .put(`http://52.79.235.166/MyExercise/update2/${myExerciseId}`,JSON.stringify(data),{headers: headers})
      .then(res => {
        alert('운동 완료')
      })
  }

  render() {
    return (
      <ResponsiveContext.Consumer>
        {size => (
          <Box direction="row" align="center" justify="center">
            <Box flex align="center" justify="center" overflow={{ vertical: "hidden" }}>
            {/* 상단 제목  */}
            <Box align="center" justify="center"><Heading margin={{top: "10%", bottom: "5%"}}> {this.state.myChallengeName} </Heading></Box>
            
            {/* 전체 박스 wrap */}
            <Box wrap direction="row-responsive" justify="center" align="center" gap="medium">
            {/* map 값 select */}
            {this.state.myExercises.map(myExercise => {
                return(
                    <Box key={myExercise.myExerciseId} direction="row-responsive">
                    {/* 전체 영역 잡기 */}
                    <Box direction="row-responsive" justify="center" align="center" margin={{bottom:"5%"}}>
                        {/* 카드 형식, 운동 하나에 담을 내용 */}
                        <Box direction="column" align="center" border="all" round="small" margin="small">
                            {/* 유튜브 영상 */}
                            <Box margin="small" align="center">
                                <iframe width="320" height="315" src={myExercise.exerciseId.exerciseVideo} frameBorder="0" allow="accelermeter; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen={true}></iframe>
                            </Box>
                            {/* 텍스트 */}
                            <Form onSubmit={this.myExercised(myExercise.myExerciseId, myExercise.myExerciseSet, myExercise.myExerciseCount)}>
                              <Box direction="column" align="center" pad="small"> 
                                  {/* 운동 제목 */}
                                  <Heading level="3"> {myExercise.exerciseId.exerciseName} </Heading>
                                  {/* 세트, 카운트 */}
                                  <Box direction="row"  gap="medium">
                                      <Text>{myExercise.myExerciseSet}</Text>
                                      <Text>{myExercise.myExerciseCount}</Text>
                                  </Box>
                              </Box>
                              {/* 각 운동 완료 버튼 */}
                              <Box margin={{bottom: "10%"}}>
                                <Button type="submit" label="운동 완료"></Button>                          
                              </Box>
                            </Form>
                        {/* 운동 하나 컨텐츠 끝 */}
                        </Box> 
                    {/* 전체 영역 잡기 끝 */}
                    </Box>
                    </Box>
                );
            // map 값 끝
            })}
            <Box direction="column">
              <Box direction="row" align="center" justify="center" margin={{bottom:"5%"}}>
                  <Button label=" 세트 완료" primary  margin="medium" href="/" ></Button>
              </Box>
            </Box>
            {/* wrap Box 끝 */}
            </Box>
            </Box>
          </Box>
        )}
      </ResponsiveContext.Consumer>
    );
  }
}
export default MyChallengeExerciseList;
