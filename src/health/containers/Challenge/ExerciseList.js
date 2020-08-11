import React, { Component } from "react";
import { Box, Heading, ResponsiveContext, Text, Button, Form } from "grommet";
import axios from "axios";

class ExerciseList extends Component {
  constructor(props) {
    super(props);
    this.state = {
        exercises: [],
        challengeName: '',
        
        myExerciseDate: new Date(),
        myExerciseComplete: false,
        myExerciseSet: '',
        myExerciseCount: ''
  };
}

  componentDidMount() {
    const {challengeId, challengeName } = this.props.match.params;

    axios
      .get(`http://52.79.235.166/exercises/findByChallengeId/${challengeId}`)
      .then(res => {

        const exercises = res.data

        this.setState({
            exercises,
            challengeName
        });

      })
      .catch(res =>{
          console.log("axios 접근 실패")
      });
  }
  
  // myExercise에 저장 set, count, complete(boolean)
  exercised = (exerciseId, myExerciseSet, myExerciseCount) => (e) => {

    let memberId = sessionStorage.getItem("memberId")
    let today = new Date();
    let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

    let data ={  
      myExerciseDate : date,
      myExerciseComplete : true,
      myExerciseSet : myExerciseSet,
      myExerciseCount : myExerciseCount
    }

    let headers={
      'Content-type' : 'application/json',
      // 'Authorization' : 'JWT fefege...'
      'Access-Control-Allow-Origin': '*'
    }
    axios
      .post(`http://52.79.235.166/MyExercise/insert2/${memberId}/${exerciseId}`,JSON.stringify(data),{headers: headers})
      .then(res => {
        alert("도전 완료 성공")
      })
      .catch(e => {
        alert('axios 실패')
      })
  }

  render() {
    return (
      <ResponsiveContext.Consumer>
        {size => (
          <Box direction="row" align="center" justify="center">
            <Box flex align="center" justify="center" overflow={{ vertical: "hidden" }}>
            {/* 상단 제목  */}
            <Box align="center" justify="center"><Heading margin={{top: "10%", bottom: "5%"}}> {this.state.challengeName} </Heading></Box>
            {/* 전체 박스 wrap */}
            <Box wrap={true} direction="row-responsive" justify="center" align="center" gap="medium">
            {/* map 값 select */}
            {this.state.exercises.map( (exercise) => {
              return(
                  <Box direction="row-responsive" key={exercise.exerciseId}>
                  {/* 전체 영역 잡기 */}
                  <Box direction="row-responsive" justify="center" align="center" margin={{bottom:"5%"}}>
                    
                      {/* 카드 형식, 운동 하나에 담을 내용 */}
                      <Box direction="column" align="center" border="all" round="small" margin="small">
                          {/* 유튜브 영상 */}
                          <Box margin="small" align="center">
                              <iframe width="320" height="315" src={exercise.exerciseVideo} frameBorder="0" allow="accelermeter; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen={true}></iframe>
                          </Box>
                          {/* 텍스트 */}
                          <Box direction="column" align="center" pad="small" justify="center">
                              {/* 운동 제목 */}
                              <Heading level="3"> {exercise.exerciseName} </Heading>
                            <Form onSubmit={this.exercised(exercise.exerciseId, exercise.exerciseSet, exercise.exerciseCount)} pad="0" margin="0">
                              {/* 세트, 카운트 */}
                                <Box direction="row" gap="medium" pad="0" margin="0">
                                    <Text textAlign="center">{exercise.exerciseSet}</Text>
                                    <Text textAlign="center">{exercise.exerciseCount}</Text>
                                </Box>
                                
                                {/* 각 운동 완료 버튼 */}
                                <Box>
                                  <Button type="submit" label="운동 완료"></Button>                          
                                </Box>
                            </Form>
                          </Box>
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
export default ExerciseList;
// map을 다른걸로 초기화
// 