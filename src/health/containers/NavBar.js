import React, { Component } from 'react';
import { BrowserRouter as BRouter, Route} from 'react-router-dom';
import {Box,Button,Heading,Layer,Menu,ResponsiveContext,Text} from 'grommet';
import { FormClose, Menu as MenuIcon } from 'grommet-icons';
import logo from '../assets/logo.png';
import Main from '../components/Main';
import SignUpType from './Member/SignUpType';
import Login from './Member/Login';
import SignUp from './Member/SignUp';
import MyPage from './Member/MyPage';
import ChallengeList from './Challenge/ChallengeList';
import ExerciseList from './Challenge/ExerciseList';
import MyChallengeEnter from './MyChallenge/MyChallengeEnter';
import MyChallengeName from './MyChallenge/MyChallengeName';
import MyChallengeList from './MyChallenge/MyChallengeList';
import MyChallengeExerciseInsert from './MyChallenge/MyChallengeExerciseInsert';
import MyChallengeExerciseList from './MyChallenge/MyChallengeExerciseList';
import DiaryNew from './Diary/DiaryNew';
import DiaryList from './Diary/DiaryList';
import DiaryRead from './Diary/DiaryRead';
import DiaryEdit from './Diary/DiaryEdit';
import MyExerciseList from './MyExercise/MyExerciseList';
import MyExerciseRead from './MyExercise/MyExerciseRead';
import PhotoUpload from '../components/PhotoUpload';
import ReportMain from './Report/ReportMain';
import ReportExercise from './Report/ReportExercise';
import ReportFood from './Report/ReportFood';
import CoachMatching from './Coach/CoachMatching';
import CoachMatchingDetail from './Coach/CoachMatchingDetail';
import GymMatchingDetail from './Gym/GymMatchingDetail';
import GymMatching from './Gym/GymMatching';
import CoachInForm from './Coach/CoachInForm';
import CoachUpdateForm from './Coach/CoachUpdateForm'
import CoachInsertForm from './Coach/CoachInsertForm'

// 로그인했을 때 로그인, 회원가입 버튼 --> 로그아웃, 프로필버튼으로 수정 --> 콜백으로 해야함

const HeadBar = (props) => (
  <Box
    tag="header"
    direction="row"
    align="center"
    justify="between"
    background="brand"
    pad={{ left: "medium", right: "small", vertical: "small" }}
    elevation="medium"
    style={{ zIndex: "1" }}
    {...props}
  />
);

const MenuA = (props) => {
  return(
    // eslint-disable-next-line jsx-a11y/anchor-has-content
    <a 
      style={{ all: "inherit" }}
      {...props}
    />
  );
}

class NavBar extends Component {
  state = {
    showMenu: false,
    imageIsReady: false,
    // session에 memberId 찾기
    check: sessionStorage.getItem('memberEmail')
  }

  // 로그인 검사 , session 확인
  isLoginCheck = (props) => {
    sessionStorage.getItem('memberEmail')
    this.setState({
      check: true
    })
    alert('로그인 체크')
  }
  // 로그아웃 정의
  isLogout = (props) => {
    sessionStorage.clear();
    this.setState({
      check: false
    })
    window.location.assign("/")
  }

  componentDidMount() {
    const img  = new Image();
    img.src = logo;

    img.onload = () => {
      this.setState({ imageIsReady: true });
    }
  }

  shouldComponentUpdate(nextState) {
    if (this.state.showMenu === nextState.showMenu) {
      return false;
    } else {
      return true;
    }
  }

  render() {
    const { showMenu } = this.state;
    const { imageIsReady }  = this.state;

    if (!imageIsReady) {
      return null;
    } else {
    return (
      <ResponsiveContext.Consumer>
        {size => (
          <BRouter>
          <HeadBar>
            <a href="/">
              <img src={logo} alt="URCoach" style={{ height: 30 }} />
            </a>
              {(size !== 'small') ? (
                <Box fill="horizontal" justify="evenly" direction="row">
                  <Box pad="xsmall" direction="row" align="center">
                    <Menu pad="xsmall" gap="small" plain items={[
                      { label: "챌린지 목록", href: "/ChallengeList" },
                      { label: "내 챌린지", href: "/MyChallengeEnter" }
                    ]}>
                      {({ drop, hover }) => {
                        const color = hover && !drop ? "#00efd1" : undefined;
                        return (
                          <Box direction="row" gap="small" pad={{ horizontal: "large", vertical: "small" }}>
                            <Text color={color} size="large">챌린지</Text>
                          </Box>
                        )
                      }}
                    </Menu>
                  </Box>
                  <Box pad="xsmall" direction="row" align="center">
                    <Menu pad="xsmall" gap="small" plain items={[
                      { label: "운동 다이어리", href: "/diary/list" }
                    ]}>
                      {({ drop, hover }) => {
                        const color = hover && !drop ? "#00efd1" : undefined;
                        return (
                          <Box direction="row" gap="small" pad={{ horizontal: "large", vertical: "small" }}>
                            <Text color={color} size="large">기록</Text>
                          </Box>
                        )
                      }}
                    </Menu>
                  </Box>
                  <Box pad="xsmall" direction="row" align="center">
                    <Menu pad="xsmall" gap="small" plain items={[
                      { label: "코치 추천", href: "/coachmatching" },
                      { label: "휘트니스 추천", href: "/GymMatching" }
                    ]}>
                      {({ drop, hover }) => {
                        const color = hover && !drop ? "#00efd1" : undefined;
                        return (
                          <Box direction="row" gap="small" pad={{ horizontal: "large", vertical: "small" }}>
                            <Text color={color} size="large">매칭</Text>
                          </Box>
                        )
                      }}
                    </Menu>
                  </Box>
                  {this.state.check ? 
                    <Box direction="row" align="center" gap="small" pad="xsmall">
                      <Button primary color="dark-2" label="마이페이지" href="/MyPage" />
                      <Button primary color="light-2" label="로그아웃" onClick={this.isLogout}/>
                    </Box>
                    :  
                    <Box direction="row" align="center" gap="small" pad="xsmall">
                      <Button primary color="dark-2" label="로그인" href="/login"/>
                      <Button primary color="light-2" label="회원가입" href="/SignUpType" />
                    </Box>
                  }
                </Box>
              ) : (
                  <Box align="end" gap="xsmall" pad="xsmall">
                    <Button icon={<MenuIcon />} onClick={() => this.setState(prevState => ({ showMenu: !prevState.showMenu }))} />
                    {showMenu && (
                      <Layer full>
                        <Box background="brand" tag="header" justify="end" align="center" direction="row" >
                          <Button icon={<FormClose />} onClick={() => this.setState({ showMenu: false })} />
                        </Box>
                        <Box fill background="brand" align="center" justify="center">
                          <Box direction="column" pad="large">
                            <a href="/">
                              <img src={logo} alt="URCoach" style={{ height: 50 }} pad={{ vertical: "large" }} />
                            </a>

                            {this.state.check ? 
                              <Box direction="row" justify="center" gap="large" pad={{ vertical: "large" }}>
                                <Button primary color="dark-2" label="마이페이지" href="/MyPage" />
                                <Button primary color="light-2" label="로그아웃" href="/" onClick={this.isLogout}/>
                              </Box>
                              :
                              <Box direction="row" justify="center" gap="large" pad={{ vertical: "large" }}>
                                <Button primary color="dark-2" label="로그인" href="/login"/>
                                <Button primary color="light-2" label="회원가입" href="/SignUpType" />
                              </Box>
                            }

                            <Box tag="ul" justify="start" alignContent="start" alignSelf="start" direction="column">
                              <Box tag="li" pad="small" direction="row" justify="between">
                                <Heading level="4" size="small">
                                  챌린지
                                        </Heading>
                              </Box>
                              <Box tag="li" pad="small" direction="row" justify="between">
                                <Text><MenuA href="/ChallengeList">챌린지 목록</MenuA></Text>
                              </Box>
                              <Box tag="li" pad="small" direction="row" justify="between">
                                <Text><MenuA href="/MyChallengeEnter">내 챌린지</MenuA></Text>
                              </Box>
                            </Box>
                            <Box tag="ul" justify="start" alignContent="start" alignSelf="start" direction="column">
                              <Box tag="li" pad="small" direction="row" justify="between">
                                <Heading level="4" size="small">
                                  기록
                                </Heading>
                              </Box>
                              <Box tag="li" pad="small" direction="row" justify="between">
                                <Text><MenuA href="/diary/list">운동 다이어리</MenuA></Text>
                              </Box>
                            </Box>
                            <Box tag="ul" justify="start" alignContent="start" alignSelf="start" direction="column">
                              <Box tag="li" pad="small" direction="row" justify="between">
                                <Heading level="4" size="small">
                                  매칭
                                </Heading>
                              </Box>
                              <Box tag="li" pad="small" direction="row" justify="between">
                                <Text><MenuA href="/coachmatching">코치 추천</MenuA></Text>
                              </Box>
                              <Box tag="li" pad="small" direction="row" justify="between">
                                <Text><MenuA href="/GymMatching">휘트니스 추천</MenuA></Text>
                              </Box>
                            </Box>
                          </Box>
                        </Box>
                      </Layer>
                    )}
                  </Box>
                )}
          </HeadBar>
          <Route path="/" exact component={ Main } />
          <Route path="/SignUpType" component={SignUpType} />
          <Route path="/login" component={Login} />
          <Route path="/challengelist" component={ChallengeList} />
          <Route path="/exerciselist/:challengeId/:challengeName" component={ExerciseList} />
          <Route path="/MyChallengeEnter" component={MyChallengeEnter} />
          <Route path="/MyChallengeName" component={MyChallengeName} />
          <Route path="/MyChallengeList" component={MyChallengeList} />
          <Route path="/MyChallengeExerciseInsert/:myChallengeId" component={MyChallengeExerciseInsert} />
          <Route path="/MyChallengeExerciseList/:myChallengeId/:myChallengeName" component={MyChallengeExerciseList} />
          <Route path="/SignUp" exact component={SignUp} />
          <Route path="/SignUp/:memberType" exact component={SignUp} />
          <Route path="/MyPage" component={MyPage} />
          <Route path="/diary/new/:date" exact component={DiaryNew} />
          <Route path="/diary/list" exact component={DiaryList} />
          <Route path="/diary/read" exact component={DiaryRead} />
          <Route path="/diary/read/:date" exact component={DiaryRead} />
          <Route path="/diary/edit/:date" exact component={DiaryEdit} />
          <Route path="/photoupload" exact component={PhotoUpload} />              
          <Route path="/myexercise/list" exact component={MyExerciseList} />
          <Route path="/myexercise/read" exact component={MyExerciseRead} />
          <Route path="/report/main" exact component={ReportMain} />
          <Route path="/report/exercise" exact component={ReportExercise} />
          <Route path="/report/food" exact component={ReportFood} />
          <Route path="/coachmatching" component={CoachMatching} />
          <Route path="/CoachMatchingDetail/:coachId/:gymId" component={CoachMatchingDetail} />
          <Route path="/GymMatching" exact component={GymMatching}/>
          <Route path="/GymMatchingDetail/:gymId" exact component={GymMatchingDetail}/>
          <Route path="/CoachInForm" component={CoachInForm}/>
          <Route path="/CoachUpdateForm" component={CoachUpdateForm}/>
          <Route path="/CoachInsertForm" component={CoachInsertForm}/>

          </BRouter>
        )}
      </ResponsiveContext.Consumer>
    );}
  }
}

export default NavBar;