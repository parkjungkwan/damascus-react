import React, { Component } from 'react';
import { Box, Calendar, Heading, ResponsiveContext } from 'grommet';
import axios from 'axios';

class DiaryList extends Component {
  constructor() {
    super();

    this.state = {
      diaryPosts: [],
      memberId: sessionStorage.getItem("memberId")

    }

    this.whichComp = this.whichComp.bind(this)
  }

  onSelect = arg => {
    let chkDate = arg.slice(0,10)
    axios.get(`http://52.79.235.166/diary/exists/${this.state.memberId}/${chkDate}`)
      .then(res => {
        this.whichComp(res.data, chkDate)
      })
  }

  whichComp = (nextComp, chkDate) => {
    nextComp ? this.props.history.push('/diary/read/'+chkDate) : this.props.history.push('/diary/new/'+chkDate)
  }

  componentDidMount() {
    let self = this
    axios.get(`http://52.79.235.166/diary/list/${this.state.memberId}`)
      .then(res => {
        self.setState({ diaryPosts: res.data })
      })
  }

  render() {
    return (
      <ResponsiveContext.Consumer>
        {size => (
          <Box 
            direction="row" 
            align="center" 
            justify="center" 
            pad={{ vertical: "large" }} 
            margin={{ bottom: "small" }}
          >
            <Box flex align="center" justify="center" margin={{ vertical: "0" }}>
              <Heading level="3">다이어리 날짜 선택</Heading>
              <Calendar 
                dates={
                  this.state.diaryPosts.map((post) => {
                    return ('"'+post.diaryDate+'"')
                  })
                }
                daysOfWeek="true"
                locale="ko-KR"
                onSelect={this.onSelect}
              />
            </Box>
          </Box>
        )}
      </ResponsiveContext.Consumer>
    );
  }
}

export default DiaryList;