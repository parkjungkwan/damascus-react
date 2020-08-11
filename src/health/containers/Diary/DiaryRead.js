import React, { Component } from 'react';
import { 
  Box, 
  Button, 
  Form, 
  FormField, 
  Heading, 
  Image, 
  ResponsiveContext, 
  Text, 
  TextArea 
} from 'grommet';
import axios from 'axios';
import NullPhoto from '../../assets/null_photo.png';

class DiaryRead extends Component {
  constructor() {
    super();

    this.state = {
      date: '',
      diaryId: 0,
      diaryDays: 0,
      diaryGoal: 0,
      diaryFat: 0.0,
      diaryWater: 0.0,
      diaryMuscle: 0.0,
      diarySkeletal: 0.0,
      diaryComment: '',
      diaryPhoto: '',
      memberId: sessionStorage.getItem('memberId')
    }
  }

  deleteDiary = (diaryId) => (e) => {
    e.preventDefault()
    axios.delete(`http://52.79.235.166/diary/delete/${diaryId}`)
      .then(res => {
        alert("다이어리 항목이 삭제되었습니다")
        this.props.history.push(`/diary/list`)
      })
      .catch(e => { alert('삭제 실패') })
  }

  componentDidMount() {
    let self = this
    const { date } = this.props.match.params
    this.setState({ date: date })
    let memberId = this.state.memberId
    axios.get(`http://52.79.235.166/diary/find/${date}/${memberId}`)
      .then(res => {
        const diaryPost = res.data
        self.setState({ 
          diaryId: diaryPost.diaryId,
          diaryDays: diaryPost.diaryDays, 
          diaryGoal: diaryPost.diaryGoal,
          diaryFat: diaryPost.diaryFat,
          diaryWater: diaryPost.diaryWater,
          diaryMuscle: diaryPost.diaryMuscle,
          diarySkeletal: diaryPost.diarySkeletal,
          diaryComment: diaryPost.diaryComment,
          diaryPhoto: diaryPost.diaryPhoto
        })
      })
  }

  render() {
    let diaryThumb = this.state.diaryPhoto === null || this.state.diaryPhoto === "" 
      ? NullPhoto : "/user-image/" + this.state.diaryPhoto
    return (
      <ResponsiveContext.Consumer>
        {size => (
          <Box direction="column" align="center" justify="center" pad={{ }}>
            <Heading level="3">다이어리 글 읽기</Heading>
            <Text>{this.state.date}</Text>
            <Box fill direction="row" align="stretch" justify="evenly" wrap>
              <Box 
                direction="column" 
                align="center" 
                justify="center" 
                width="small" 
                height="medium" 
                round="small" 
                border={{ color: "brand", size: "medium" }}
              >
                <Box fill align="stretch" justify="evenly">
                  <Image src={diaryThumb} fit="contain" alt="Diary Photo" id="photoThumb" margin="xsmall" />
                </Box>
              </Box>
              <Box direction="column" align="center" justify="center" basis="2/3">
                <Box fill="horizontal">
                  <Form>
                    <FormField 
                      label="운동 경과일" 
                      name="diaryDays" 
                      readOnly 
                      value={this.state.diaryDays}
                    >
                      <Text margin={{ left: "small" }}>
                        {this.state.diaryDays}일
                      </Text>
                    </FormField>
                    <FormField 
                      label="목표 달성률" 
                      name="diaryGoal" 
                      readOnly 
                      value={this.state.diaryGoal}
                    >
                      <Text margin={{ left: "small" }}>
                        {this.state.diaryGoal}%
                      </Text>
                    </FormField>
                    <FormField 
                      label="체지방률" 
                      name="diaryFat" 
                      readOnly 
                      value={this.state.diaryFat}
                    >
                      <Text margin={{ left: "small" }}>
                        {this.state.diaryFat}%
                      </Text>
                    </FormField>
                    <FormField 
                      label="체수분" 
                      name="diaryWater" 
                      readOnly 
                      value={this.state.diaryWater}
                    >
                      <Text margin={{ left: "small" }}>
                        {this.state.diaryWater}L
                      </Text>
                    </FormField>
                    <FormField 
                      label="근육량" 
                      name="diaryMuscle" 
                      readOnly 
                      value={this.state.diaryMuscle}
                    >
                      <Text margin={{ left: "small" }}>
                        {this.state.diaryMuscle}kg
                      </Text>
                    </FormField>
                    <FormField 
                      label="골격근량" 
                      name="diarySkeletal" 
                      readOnly 
                      value={this.state.diarySkeletal}
                    >
                      <Text margin={{ left: "small" }}>
                        {this.state.diarySkeletal}kg
                      </Text>
                    </FormField>
                    <FormField 
                      label="소감" 
                      name="diaryComment" 
                      component={TextArea} 
                      readOnly 
                      value={this.state.diaryComment}
                    >
                      <Text margin={{ left: "small" }}>
                        {this.state.diaryComment}
                      </Text>
                    </FormField>
                    <Box 
                      direction="row" 
                      alignContent="start" 
                      pad={{ vertical: "medium" }} 
                      gap="medium"
                    >
                      <Button 
                        primary 
                        color="dark-2" 
                        label="수정" 
                        href={"/diary/edit/"+this.state.date} 
                      />
                      <Button 
                        primary 
                        color="dark-6" 
                        label="삭제" 
                        onClick={this.deleteDiary(this.state.diaryId)}
                        {...this.props} 
                      />
                      <Button 
                        primary 
                        color="light-2" 
                        label="목록" 
                        href={"/diary/list"}
                        {...this.props} 
                      />
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

export default DiaryRead;