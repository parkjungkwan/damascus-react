import React from 'react';
import {
  Box,
  Heading,
  Image,
  ResponsiveContext,
  Text
} from 'grommet';
import { Github } from 'grommet-icons';
import logo from '../assets/logo.png';

const FootBar = (props) => (
  <Box
    tag="footer"
    direction="row"
    align="center"
    justify="between"
    background="brand"
    pad={{ horizontal: "xlarge", top: "xlarge", bottom: "large" }}
    elevation="medium"
    style={{ zIndex: "1" }}
    {...props}
  />
);

const FootA = (props) => {
  return(
    <a 
      style={{ all: "inherit" }}
      {...props}
    />
  );
}

function FooBar() {
  return (
    <ResponsiveContext.Consumer>
      {size => (
        <FootBar>
          <Box justify="start" alignContent="start" alignSelf="start" direction="column">
            <Image src={logo} alt="URCoach" style={{ height: 30 }} alignSelf="start" />
          </Box>
          {size !== 'small' && (
            <Box fill="horizontal" justify="evenly" direction="row" pad="xsmall" gap="xsmall">
              <Box tag="ul" justify="start" alignContent="start" alignSelf="start" direction="column">
                <Box tag="li" pad="small" direction="row" justify="between">
                  <Heading level="4" size="small">
                    챌린지
                            </Heading>
                </Box>
                <Box tag="li" pad="small" direction="row" justify="between">
                  <Text><FootA href="#">챌린지 목록</FootA></Text>
                </Box>
                <Box tag="li" pad="small" direction="row" justify="between">
                  <Text><FootA href="#">내 챌린지</FootA></Text>
                </Box>
              </Box>
              <Box tag="ul" justify="start" alignContent="start" alignSelf="start" direction="column">
                <Box tag="li" pad="small" direction="row" justify="between">
                  <Heading level="4" size="small">
                    기록
                            </Heading>
                </Box>
                <Box tag="li" pad="small" direction="row" justify="between">
                  <Text><FootA href="#">운동 다이어리</FootA></Text>
                </Box>
              </Box>
              <Box tag="ul" justify="start" alignContent="start" alignSelf="start" direction="column">
                <Box tag="li" pad="small" direction="row" justify="between">
                  <Heading level="4" size="small">
                    매칭
                            </Heading>
                </Box>
                <Box tag="li" pad="small" direction="row" justify="between">
                  <Text><FootA href="#">코치 추천</FootA></Text>
                </Box>
                <Box tag="li" pad="small" direction="row" justify="between">
                  <Text><FootA href="#">휘트니스 추천</FootA></Text>
                </Box>
              </Box>
            </Box>
          )}
          <Box tag="ul" justify="start" alignContent="start" alignSelf="start" direction="column">
            <Box tag="li" direction="row" justify="start">
              <Heading level="6" size="small">Copyright &copy; 2019 Team 4Ward</Heading>
            </Box>
            <Box tag="li" pad={{ bottom: "small" }} direction="row" justify="start">
              <Text size="small">Members</Text>
            </Box>
            <Box tag="li" direction="row" justify="start">
              <FootA href="https://github.com/yong1227" target="_blank" rel="noopener noreferrer"><Github size="small" />&nbsp;<Text size="small">&nbsp;Kwon Yongjae</Text></FootA>
            </Box>
            <Box tag="li" direction="row" justify="start">
              <FootA href="https://github.com/afigurekim/" target="_blank" rel="noopener noreferrer"><Github size="small" />&nbsp;<Text size="small">&nbsp;Kim Dohyoung</Text></FootA>
            </Box>
            <Box tag="li" direction="row" justify="start">
              <FootA href="https://github.com/KATEKEITH" target="_blank" rel="noopener noreferrer"><Github size="small" />&nbsp;<Text size="small">&nbsp;Sim Eunji</Text></FootA>
            </Box>
          </Box>
        </FootBar>
      )}
    </ResponsiveContext.Consumer>
  );
}

export default FooBar;