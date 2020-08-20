import React, { Component } from 'react';
import { Box, Button, Heading, ResponsiveContext, Text } from 'grommet';
import { Up as UpIcon, Down as DownIcon, Edit as EditIcon, Trash as TrashIcon } from 'grommet-icons';

class MyExerciseRead extends Component {
  constructor() {
    super();
    var today = new Date(),
        date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    this.state = {
      date: date,
      myExerciseDate: "",
      myExerciseTime: 15,
      myExerciseOrder: 1,
      exerciseName: "냅다 달리기",
      myChallengeName: "살기 위해 하는 운동",
      myExerciseSet: 3,
      myExerciseCount: 12
    }
  }
  render() {
    return (
      <ResponsiveContext.Consumer>
        {size => (
          <Box direction="row" align="center" justify="center">
            <Box flex align="center" justify="center" margin={{ vertical: '0' }}>
              <Heading level="3">운동기록</Heading>
              <Text>{this.state.date}</Text>
              {(size !== 'small') ? (
                <Box direction="row" gap="medium">
                  <Box direction="column" width="medium" height="small" border={{ color: 'brand', size: 'medium' }} round="small">
                    <Box pad={{ horizontal: 'small' }}>
                      <Box pad={{ top: 'small' }} direction="row">
                        <Box pad="small" border={{ color: 'brand', size: 'xsmall', side: 'right' }}>
                          <Text size="large" weight="bold">{this.state.myExerciseOrder}</Text>
                        </Box>
                        <Box pad="small">
                          <Text size="large" >{this.state.exerciseName}</Text>
                        </Box>
                      </Box>
                      <Box pad={{ top: 'small', bottom: 'xsmall' }}>
                        <Text>{this.state.myChallengeName}</Text>
                      </Box>
                      <Box direction="row" pad={{ bottom: 'xsmall' }}>
                        <Box pad={{ right: 'small' }} border={{ color: 'brand', size: 'xsmall', side: 'right' }}>
                          <Text>{this.state.myExerciseSet}셋트 {this.state.myExerciseCount}회</Text>
                        </Box>
                        <Box pad={{ left: 'small' }}>
                          <Text>{this.state.myExerciseTime}분</Text>
                        </Box>
                      </Box>
                      <Box direction="row" gap="large">
                        <Box direction="row" gap="xsmall">
                          <Button primary color="dark-2" margin="xsmall" icon={<EditIcon size="small" />} />
                          <Button primary color="dark-2" margin="xsmall" icon={<TrashIcon size="small" />} />
                        </Box>
                        <Box direction="row" gap="xsmall">
                          <Button primary color="light-2" margin="xsmall" icon={<UpIcon size="small" />} />
                          <Button primary color="light-2" margin="xsmall" icon={<DownIcon size="small" />} />
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                  <Box direction="column" width="medium" height="small" border={{ color: 'brand', size: 'medium' }} round="small">
                    <Box pad={{ horizontal: 'small' }}>
                      <Box pad={{ top: 'small' }} direction="row">
                        <Box pad="small" border={{ color: 'brand', size: 'xsmall', side: 'right' }}>
                          <Text size="large" weight="bold">{this.state.myExerciseOrder}</Text>
                        </Box>
                        <Box pad="small">
                          <Text size="large" >{this.state.exerciseName}</Text>
                        </Box>
                      </Box>
                      <Box pad={{ top: 'small', bottom: 'xsmall' }}>
                        <Text>{this.state.myChallengeName}</Text>
                      </Box>
                      <Box direction="row" pad={{ bottom: 'xsmall' }}>
                        <Box pad={{ right: 'small' }} border={{ color: 'brand', size: 'xsmall', side: 'right' }}>
                          <Text>{this.state.myExerciseSet}셋트 {this.state.myExerciseCount}회</Text>
                        </Box>
                        <Box pad={{ left: 'small' }}>
                          <Text>{this.state.myExerciseTime}분</Text>
                        </Box>
                      </Box>
                      <Box direction="row" gap="large">
                        <Box direction="row" gap="xsmall">
                          <Button primary color="dark-2" margin="xsmall" icon={<EditIcon size="small" />} />
                          <Button primary color="dark-2" margin="xsmall" icon={<TrashIcon size="small" />} />
                        </Box>
                        <Box direction="row" gap="xsmall">
                          <Button primary color="light-2" margin="xsmall" icon={<UpIcon size="small" />} />
                          <Button primary color="light-2" margin="xsmall" icon={<DownIcon size="small" />} />
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              ) : (
                <Box direction="column" width="medium" height="small" border={{ color: 'brand', size: 'medium' }} round="small">
                    <Box pad={{ horizontal: 'small' }}>
                      <Box pad={{ top: 'small' }} direction="row">
                        <Box pad="small" border={{ color: 'brand', size: 'xsmall', side: 'right' }}>
                          <Text size="large" weight="bold">{this.state.myExerciseOrder}</Text>
                        </Box>
                        <Box pad="small">
                          <Text size="large" >{this.state.exerciseName}</Text>
                        </Box>
                      </Box>
                      <Box pad={{ top: 'small', bottom: 'xsmall' }}>
                        <Text>{this.state.myChallengeName}</Text>
                      </Box>
                      <Box direction="row" pad={{ bottom: 'xsmall' }}>
                        <Box pad={{ right: 'small' }} border={{ color: 'brand', size: 'xsmall', side: 'right' }}>
                          <Text>{this.state.myExerciseSet}셋트 {this.state.myExerciseCount}회</Text>
                        </Box>
                        <Box pad={{ left: 'small' }}>
                          <Text>{this.state.myExerciseTime}분</Text>
                        </Box>
                      </Box>
                      <Box direction="row" gap="large">
                        <Box direction="row" gap="xsmall">
                          <Button primary color="dark-2" margin="xsmall" icon={<EditIcon size="small" />} />
                          <Button primary color="dark-2" margin="xsmall" icon={<TrashIcon size="small" />} />
                        </Box>
                        <Box direction="row" gap="xsmall">
                          <Button primary color="light-2" margin="xsmall" icon={<UpIcon size="small" />} />
                          <Button primary color="light-2" margin="xsmall" icon={<DownIcon size="small" />} />
                        </Box>
                      </Box>
                    </Box>
                  </Box>
              )}
            </Box>
          </Box>
        )}
      </ResponsiveContext.Consumer>
    );
  }
}

export default MyExerciseRead;