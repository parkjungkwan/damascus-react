import React, { Component } from 'react';
import { Box, Button, Heading, ResponsiveContext, Text, RangeInput } from 'grommet';
import { Play as PlayIcon, Previous as PrevIcon, Save as SaveIcon } from 'grommet-icons';

class ReportExercise extends Component {
  constructor() {
    super();
    let today = new Date();
    let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    let backday = new Date();
    backday.setDate(today.getDate() - 30);
    let prevdate = backday.getFullYear() + '-' + (backday.getMonth() + 1) + '-' + backday.getDate();
    this.state = {
      date: date,
      prevdate: prevdate,
      steps: 0
    }

    this.handleChange = (e) => {
      this.setState({
        [e.target.name]: e.target.value
      })
    }
  }
  render() {
    return (
      <ResponsiveContext.Consumer>
        {size => (
          <Box direction="column" align="center" justify="center">
            <Box flex align="center" justify="center" margin={{ top: 'medium', bottom: 'small' }}>
              <Heading level="3">일일 보고서</Heading>
              <Box pad={{ bottom: 'medium' }} align="center">
                <Text size="large" weight="bold">운동량</Text>
                <Text size="medium">{this.state.date}</Text>
              </Box>
            </Box>
            <Box direction="column" width="large" height="medium" border={{ color: 'brand', size: 'medium' }} round="small" margin={{ bottom: "large" }}>
              <Box pad="medium" margin={{ top: "medium" }} align="center" alignContent="center" gap="large">
                <Box direction="row" fill="horizontal" align="center" justify="around">
                  <Box>
                    <Text size="large" weight="bold">루틴</Text>
                  </Box>
                  <Box direction="row" gap="large" align="center">
                    <Box direction="row" align="center"><Text size="large" weight="bold">70</Text><Text size="small">%</Text></Box>
                    <Button size="small" icon={<PlayIcon />} label="루틴 계속하기"></Button>
                  </Box>
                </Box>
                <Box direction="row" fill="horizontal" align="center" justify="around">
                  <Box>
                    <Text size="large" weight="bold">걸음걸이</Text>
                  </Box>
                  <Box direction="column" align="center" width="42%">
                    <RangeInput name="steps" value={this.state.steps} onChange={this.handleChange} min={0} max={10000} step={1} />
                    <Box align="center" direction="row"><Text size="large" weight="bold">{this.state.steps}</Text><Text size="small">걸음</Text></Box>
                  </Box>
                </Box>
                <Box direction="row" fill="horizontal" align="center" justify="between">
                  <Box direction="column" pad={{ left: "10%"}}>
                    <Text textAlign="center" size="large" weight="bold">소모 칼로리</Text>
                    <Text textAlign="center" size="small">(예측치)</Text>
                  </Box>
                  <Box direction="row" align="center" pad={{ right: "27%" }}><Text size="large" weight="bold">2000</Text><Text>kcal</Text></Box>
                </Box>
                <Box direction="row" gap="small" fill="horizontal" align="center" pad={{ bottom: "small" }} justify="center">
                  <Button size="small" icon={<PrevIcon />} label="돌아가기"></Button>
                  <Button size="small" icon={<SaveIcon />} label="저장하기"></Button>
                </Box>
              </Box>
            </Box>
          </Box>
        )}
      </ResponsiveContext.Consumer>
    );
  }
}

export default ReportExercise;