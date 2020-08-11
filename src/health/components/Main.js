import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Heading,
  Image,
  ResponsiveContext,
  Stack
} from 'grommet';
import { PlayFill as PlayIcon } from 'grommet-icons';
import WhiteCircle from '../assets/white_circle.svg';

class Main extends Component {
  constructor(props) {
    super(props)
    this.state = {
      vidname: ''
    }
  }
  componentDidMount() {
    this.setVideo()
  }
  setVideo() {
    let vidno = Math.floor(Math.random() * 5) + 1
    let setvidname = "/videos/bigvideo" + vidno + ".mp4"
    this.setState({ vidname: setvidname })
  }
  render() {
    let loginTrue = sessionStorage.getItem("memberId") === null || sessionStorage.getItem("memberId") === "" 
      ? "/login" : "/ChallengeList"
    return (
      <ResponsiveContext.Consumer>
        {size => (
          <Box direction="row" align="center" justify="center">
            <Box flex align="center" justify="center" margin={{ vertical: '0' }} pad={{ vertical: '0' }} background="brand">
              <Stack anchor="center" margin={{ vertical: '0' }} pad={{ vertical: '0' }}>
                <video autoPlay loop muted playsInline width="100%" margin={{ vertical: '0' }} pad={{ vertical: '0' }} src={process.env.PUBLIC_URL + this.state.vidname} />
                <Box fill="true" width="100%" alignContent="stretch">
                  <Image src={WhiteCircle} width="100%" fill="true" fit="contain" opacity="medium" />
                </Box>
                {(size !== 'small') ? (
                  <Link to={loginTrue} style={{ textDecoration: "none"}}>
                    <Box direction="row" align="center" justify="center" width="medium">
                      <Box width="xsmall" margin={{ right: "medium" }}>
                        <PlayIcon size="xlarge" color="brand" />
                      </Box>
                      <Heading size="large" level="1" color="brand" responsive="true">START!</Heading>
                    </Box>
                  </Link>
                ) : (
                    <Link to={loginTrue} style={{ textDecoration: "none"}}>
                      <Box direction="row" align="center" justify="center" width="medium">
                        <Box margin={{ right: "medium" }}>
                          <PlayIcon size="large" color="brand" />
                        </Box>
                        <Heading size="medium" level="1" color="brand" margin="0">START!</Heading>
                      </Box>
                    </Link>
                  )}
              </Stack>
            </Box>
          </Box>
        )}
      </ResponsiveContext.Consumer>
    );
  }
}
export default Main;