import React, { Component } from 'react';
import { Box, Button, Heading, MaskedInput, RangeInput, ResponsiveContext, Text } from 'grommet';
import { Save as SaveIcon, Previous as PrevIcon } from 'grommet-icons';

class ReportFood extends Component {
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
      foodtime: "",
      foodmenu: "",
      foodcal: 0,
      watertime: "",
      watermenu: "",
      watervol: 0
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
            <Box flex align="center" justify="center" margin={{ top: 'medium' }}>
              <Heading level="3">일일 보고서</Heading>
              <Box pad={{ bottom: 'small' }} align="center">
                <Text>섭취량</Text>
                <Text size="small">{this.state.date}</Text>
              </Box>
            </Box>
            <Box direction="row" margin={{ bottom: 'medium' }} align="center" justify="center" wrap>
              <Box direction="column" align="center" margin={{ horizontal: "large" }}>
                <Heading level="4">식사</Heading>
                <Box direction="row" align="center">
                  <Text>시간</Text>
                  <Box width="small" pad={{ left: "xsmall" }}>
                    <MaskedInput
                      name="foodtime"
                      mask={[
                        {
                          length: 2,
                          options: ["오전", "오후"],
                          regexp: /^오[전후]$/,
                          placeholder: "오전/오후"
                        },
                        { fixed: " " },
                        {
                          length: [1, 2],
                          options: Array.from({ length: 12 }, (v, k) => k + 1),
                          regexp: /^1[0,1-2]$|^0?[1-9]$|^0$/,
                          placeholder: "00시"
                        },
                        { fixed: ":" },
                        {
                          length: 2,
                          options: ["00", "15", "30", "45"],
                          regexp: /^[0-5][0-9]$|^[0-9]$/,
                          placeholder: "00분"
                        }
                      ]}
                      value={this.state.foodtime}
                      onChange={this.handleChange}
                    />
                  </Box>
                </Box>
                <Box direction="row" align="center">
                  <Text>메뉴</Text>
                  <Box width="small" pad={{ left: "xsmall" }}>
                    <MaskedInput
                      name="foodmenu"
                      mask={[
                        {
                          length: 12,
                          placeholder: "메뉴명 (12자 이내)"
                        }
                      ]}
                      value={this.state.foodmenu}
                      onChange={this.handleChange}
                    />
                  </Box>
                </Box>
                <Box direction="row" fill="horizontal" align="center" justify="around">
                  <Box>
                    <Text>섭취량</Text>
                  </Box>
                  <Box direction="column" align="center" width="75%" pad={{ left: "xsmall" }}>
                    <RangeInput name="foodcal" value={this.state.foodcal} onChange={this.handleChange} min={0} max={5000} step={1} />
                    <Box align="center" direction="row"><Text size="large" weight="bold">{this.state.foodcal}</Text><Text size="small">kcal</Text></Box>
                  </Box>
                </Box>
                <Box pad={{ vertical: 'xsmall' }}>
                  <Button size="small" icon={<SaveIcon />} label="식사 추가"></Button>
                </Box>
              </Box>
              <Box direction="column" align="center" margin={{ horizontal: "large" }}>
                <Heading level="4">수분</Heading>
                <Box direction="row" align="center">
                  <Text>시간</Text>
                  <Box width="small" pad={{ left: "xsmall" }}>
                    <MaskedInput
                      name="watertime"
                      mask={[
                        {
                          length: 2,
                          options: ["오전", "오후"],
                          regexp: /^오[전후]$/,
                          placeholder: "오전/오후"
                        },
                        { fixed: " " },
                        {
                          length: [1, 2],
                          options: Array.from({ length: 12 }, (v, k) => k + 1),
                          regexp: /^1[0,1-2]$|^0?[1-9]$|^0$/,
                          placeholder: "00시"
                        },
                        { fixed: ":" },
                        {
                          length: 2,
                          options: ["00", "15", "30", "45"],
                          regexp: /^[0-5][0-9]$|^[0-9]$/,
                          placeholder: "00분"
                        }
                      ]}
                      value={this.state.watertime}
                      onChange={this.handleChange}
                    />
                  </Box>
                </Box>
                <Box direction="row" align="center">
                  <Text>메뉴</Text>
                  <Box width="small" pad={{ left: "xsmall" }}>
                    <MaskedInput
                      name="watermenu"
                      mask={[
                        {
                          length: 12,
                          placeholder: "메뉴명 (12자 이내)"
                        }
                      ]}
                      value={this.state.watermenu}
                      onChange={this.handleChange}
                    />
                  </Box>
                </Box>
                <Box direction="row" fill="horizontal" align="center" justify="around">
                  <Box>
                    <Text>섭취량</Text>
                  </Box>
                  <Box direction="column" align="center" width="75%" pad={{ left: "xsmall" }}>
                    <RangeInput name="watervol" value={this.state.watervol} onChange={this.handleChange} min={0} max={10000} step={1} />
                    <Box align="center" direction="row"><Text size="large" weight="bold">{this.state.watervol}</Text><Text size="small">ml</Text></Box>
                  </Box>
                </Box>
                <Box pad={{ vertical: 'xsmall' }}>
                  <Button size="small" icon={<SaveIcon />} label="수분 추가"></Button>
                </Box>
              </Box>
            </Box>
            <Box margin={{ bottom: "large" }}>
              <Button size="small" icon={<PrevIcon />} label="돌아가기"></Button>
            </Box>
          </Box>
        )}
      </ResponsiveContext.Consumer>
    );
  }
}

export default ReportFood;