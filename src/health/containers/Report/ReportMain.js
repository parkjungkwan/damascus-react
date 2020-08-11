import React, { Component } from 'react';
import { Box, Button, Chart, Heading, Meter, ResponsiveContext, Stack, Text } from 'grommet';
import { Add as AddIcon } from 'grommet-icons';

class ReportMain extends Component {
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
      exerciseComplete: 60,
      walkSteps: 900,
      spentCals: 1000,
      mealCount: 3,
      intakeCals: 1200,
      intakeWater: 1000
    }
  }
  render() {
    return (
      <ResponsiveContext.Consumer>
        {size => (
          <Box direction="column" align="center" justify="center">
            <Box flex align="center" justify="center" margin={{ top: 'large' }}>
              <Heading level="3">일일 보고서</Heading>
              <Box pad={{ bottom: 'medium' }}>
                <Text>{this.state.date}</Text>
              </Box>
              <Box direction="row" align="center" justify="center" wrap>
                <Box direction="column" width="medium" height="small" border={{ color: 'brand', size: 'medium' }} round="small" margin="medium">
                  <Box pad={{ horizontal: 'small' }} align="center" alignContent="center">
                    <Box pad={{ top: 'small' }} direction="row">
                      <Box>
                        <Text size="large" weight="bold">운동량</Text>
                      </Box>
                    </Box>
                    <Box direction="row" pad={{ vertical: 'xsmall' }} fill="horizontal">
                      <Box fill="horizontal"><Text textAlign="center">루틴</Text></Box>
                      <Box fill="horizontal"><Text textAlign="center">60%</Text></Box>
                    </Box>
                    <Box direction="row" pad={{ vertical: 'xsmall' }} fill="horizontal">
                      <Box fill="horizontal"><Text textAlign="center">걸음걸이</Text></Box>
                      <Box fill="horizontal"><Text textAlign="center">900걸음</Text></Box>
                    </Box>
                    <Box direction="row" pad={{ vertical: 'xsmall' }} fill="horizontal">
                      <Box fill="horizontal"><Text textAlign="center">칼로리 소모</Text></Box>
                      <Box fill="horizontal"><Text textAlign="center">1000kcal</Text></Box>
                    </Box>
                    <Box pad={{ vertical: 'xsmall' }}>
                      <Button size="small" icon={<AddIcon />} label="운동 추가"></Button>
                    </Box>
                  </Box>
                </Box>
                <Box direction="column" width="medium" height="small" border={{ color: 'brand', size: 'medium' }} round="small" margin="medium">
                  <Box pad={{ horizontal: 'small' }} align="center" alignContent="center">
                    <Box pad={{ top: 'small' }} direction="row">
                      <Box>
                        <Text size="large" weight="bold">식사량</Text>
                      </Box>
                    </Box>
                    <Box direction="row" pad={{ vertical: 'xsmall' }} fill="horizontal">
                      <Box fill="horizontal"><Text textAlign="center">식사횟수</Text></Box>
                      <Box fill="horizontal"><Text textAlign="center">3회</Text></Box>
                    </Box>
                    <Box direction="row" pad={{ vertical: 'xsmall' }} fill="horizontal">
                      <Box fill="horizontal"><Text textAlign="center">칼로리 섭취</Text></Box>
                      <Box fill="horizontal"><Text textAlign="center">1200kcal</Text></Box>
                    </Box>
                    <Box direction="row" pad={{ vertical: 'xsmall' }} fill="horizontal">
                      <Box fill="horizontal"><Text textAlign="center">수분 섭취</Text></Box>
                      <Box fill="horizontal"><Text textAlign="center">1000kcal</Text></Box>
                    </Box>
                    <Box pad={{ vertical: 'xsmall' }}>
                      <Button size="small" icon={<AddIcon />} label="식사/수분 추가"></Button>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box flex align="center" justify="center" margin={{ top:'medium', bottom: 'large' }}>
              <Heading level="3">월간 보고서</Heading>
              <Text>{this.state.prevdate} - {this.state.date}</Text>
              <Box direction="row" align="center" justify="center" wrap>
                <Box align="center" margin={{ horizontal: "large" }}>
                  <Heading level="4">운동일수</Heading>
                  <Stack anchor="center" margin={{ top: "large" }}>
                    <Meter
                      type="circle"
                      background="#ff5e5b"
                      values={[
                        { value: 30, color: "#00efd1" }
                      ]}
                      size="small"
                      thickness="medium"
                      round
                    />
                    <Box direction="row" align="center" pad={{ bottom: "xsmall" }}>
                      <Text size="xlarge" weight="bold">
                        10
                      </Text>
                      <Text size="small">일</Text>
                    </Box>
                  </Stack>
                </Box>
                <Box align="center" margin={{ horizontal: "large" }}>
                  <Heading level="4">칼로리 섭취/소비</Heading>
                  <Box direction="row" justify="evenly" gap="medium">
                    <Box flex={false} basis="xsmall" align="center" gap="small">
                      <Chart
                        bounds={[[0, 2], [0, 5000]]}
                        type="bar"
                        background="light-2"
                        values={[
                          { value: [1, 1300] }
                        ]}
                        color="#00acea"
                        size={{ height: "small", width: "xsmall" }}
                        round
                      />
                      <Box direction="column" align="center" pad={{ bottom: "xsmall" }}>
                        <Text margin={{ bottom: "small" }}>소비량</Text>
                        <Box direction="row" align="center">
                          <Text size="xlarge" weight="bold">1300</Text>
                          <Text size="small">kcal</Text>
                        </Box>
                      </Box>
                    </Box>
                    <Box flex={false} basis="xsmall" align="center" gap="small">
                      <Chart
                        bounds={[[0, 2], [0, 5000]]}
                        type="bar"
                        background="light-2"
                        values={[
                          { value: [1, 3100] }
                        ]}
                        color="#fedb41"
                        size={{ height: "small", width: "xsmall" }}
                        round
                      />
                      <Box direction="column" align="center" pad={{ bottom: "xsmall" }}>
                        <Text margin={{ bottom: "small" }}>섭취량</Text>
                        <Box direction="row" align="center">
                          <Text size="xlarge" weight="bold">3100</Text>
                          <Text size="small">kcal</Text>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        )}
      </ResponsiveContext.Consumer>
    );
  }
}

export default ReportMain;