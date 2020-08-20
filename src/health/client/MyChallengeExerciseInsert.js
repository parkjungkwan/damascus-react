import React, { Component } from "react";
import { ResponsiveContext, Box, Button, Heading, FormField, TextInput,Form } from "grommet";
import axios from "axios";
import {Link} from 'react-router-dom';

class MyChallengeExercise extends Component {
  constructor(props) {
    super(props);
    this.state= {
        exercises: [],
        myExerciseSet: '',
        myExerciseCount: '',
        myChallengeId: '',
        exerciseId: []
    }
  }

  // 시작할 때 운동목록 값 뿌려준다.
  componentDidMount() {
    const { myChallengeId } = this.props.match.params;
    axios
      .get(`http://52.79.235.166/exercises/findGroupByExerciseName`)
      .then(res => {
        const exercises = res.data;

        this.setState({
          exercises,
          myChallengeId
        });
      })
      .catch(e => {
        console.log("axios 접근 실패");
      });
  }

  // set 입력
  myExerciseSetChange = (e) => {
    this.setState({
      myExerciseSet: e.target.value
    })
  }
  
  //count 입력
  myExerciseCountChange = (e) =>{
    this.setState({
      myExerciseCount: e.target.value
    })
  }

  // 운동 값 저장
  handleSubmit = (exerciseId, memberId, myChallengeId) => (e) => {
    e.preventDefault();
    let memberId = sessionStorage.getItem("memberId")

    this.setState({
      exerciseId
    })

    let data = {
      myExerciseSet: this.state.myExerciseSet,
      myExerciseCount: this.state.myExerciseCount
    }
    
    let headers={
      'Content-type' : 'application/json',
      // 'Authorization' : 'JWT fefege...'
      'Access-Control-Allow-Origin': '*'
    }

    axios
      .post(`http://52.79.235.166/MyExercise/insert/${memberId}/${exerciseId}/${myChallengeId}`, JSON.stringify(data), {headers: headers})
      .then(res => {
        alert('저장 성공')
      })
      .catch( e =>{console.log('axios 실패')})
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
              {/* 운동 목록만 뿌려줄거야 */}
              <Heading level="2">원하시는 운동을 선택해주세요.</Heading>
              {/* 전체 영역 wrap */}
              <Box
                wrap={true}
                direction="row-responsive"
                align="center"
                gap="medium"
                justify="center"
              >
                {this.state.exercises.map((exercise,index) => {
                    return(
                        <Box direction="column" key={index} align="center">
                            {/* 전체 영역 잡기 */}
                            <Box direction="row-responsive" justify="center" align="center" margin={{bottom:"5%"}}>
                                {/* 카드 형식, 운동 하나에 담을 내용 */}
                                <Box direction="column" align="center" border="all" round="small" margin="small">
                                 
                                    {/* 유튜브 영상 */} 
                                    <Box margin="small" align="center">
                                        <iframe width="320" height="315" src={exercise.exerciseVideo} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen={true}></iframe>
                                    </Box>
                                     {/* 텍스트 */}
                                     <Box direction="column" align="center" pad="small">
                                        {/* 운동 제목 */}
                                     
                                      <Form onSubmit={this.handleSubmit(exercise.exerciseId, this.state.memberId, this.state.myChallengeId)} align="center">
                                        <Button><Heading level="3" color="black"> {exercise.exerciseName} </Heading> </Button>

                                        {/* 세트 */}
                                        <Box direction="column" margin="small">
                                          <FormField label="세트">
                                            <TextInput name={this.myExerciseSet} onChange={this.myExerciseSetChange} placeholder="ex) 3세트"></TextInput>
                                          </FormField>
                                        </Box>

                                         {/* 카운트 or 초 */}
                                        <Box direction="column" margin="small">
                                          <FormField label="카운트 & 초">
                                            <TextInput name={this.myExerciseCount} onChange={this.myExerciseCountChange} placeholder=" ex) 20회 & 30초"></TextInput>
                                          </FormField>
                                        </Box>    
                                        <Button type="submit" label="저장"></Button>
                                      </Form>
                              </Box>
                            </Box>
                          </Box>
                        </Box>
                        
                    )
                })}
                <Link to={{
                  pathname: `/MyChallengeList`
                }}>
                  <Button label="저장한 챌린지 보여주기" margin="5%"></Button>
                </Link>
              </Box>
                
            </Box>
          </Box>
        )}
      </ResponsiveContext.Consumer>
    );
  }
}
export default MyChallengeExercise;
