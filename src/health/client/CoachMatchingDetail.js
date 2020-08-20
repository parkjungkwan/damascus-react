/*global daum*/
import React, { Component } from 'react'
import {
    Box,
    Image,
    ResponsiveContext,
    Paragraph,
    Heading,
    Text,
    Button,
    DropButton
} from "grommet";
import { Link } from 'react-router-dom'
// import ChatApp from './ChatApp';
// import ChatMessage from '../components/ChatMaessage';
import { default as Chatkit } from '@pusher/chatkit-server';
import CoachDetail from '../common/assets/coach.jpg';
import NullPhoto from '../common/assets/null_photo.png'
const chatkit = new Chatkit({
    instanceLocator: "v1:us1:e55ce926-ac88-4558-91e5-00767d8792c6",
    key: "ba8f3f02-dd0e-4ec7-b27a-ef4fbe188f88:Q+hfapQQTfjwuJTqsfFgm5LLgE78RvBnNKM6VX8Bh/s="
})
const style_1 = {
    width: "100%",
    height: "100%",
    align: "center"
}
const style_2 = {
    width: "150px",
    textalign: "left",
    align: "center"
}
const MenuA = (props) => {
    return (
        // eslint-disable-next-line jsx-a11y/anchor-has-content
        <a
            style={{ all: "inherit" }}
            {...props}
        />
    );
}
class CoachMatchingDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: '',
            currentView: 'ChatMessage',
            coach: [],
            gym: []
        }
        this.changeView = this.changeView.bind(this);
        this.createUser = this.createUser.bind(this);
        this.drawMap = this.drawMap.bind(this);
    }
    componentDidMount() {
        //fetch:coach
        const { coachId } = this.props.match.params
        console.log("coachId : " + coachId)
        fetch(`http://52.79.235.166/coaches/findbycoachid/${coachId}`)
            .then(res => res.json())
            
                .then(res => {
                this.setState({
                    coach: res
                })
            }).catch(error => {
                console.error(error);
                this.setState({
                    error: true
                })
            })
        // fetch:gym
        const { gymId } = this.props.match.params
        fetch(`http://52.79.235.166/gyms/find/${gymId}`)
            .then(res => res.json()
            ).then(res => {
                this.setState({
                    gym: res
                })
                // call
                this.drawMap(this.state.gym.gymLoc)
            }).catch(error => {
                console.error(error);
                this.setState({
                    error: true
                })
            })
    }
    //
    drawMap(gymLoc) {
        const kakao = window.kakao;
        const mapContiner = document.getElementById('map'),
            mapOption = {
                center: new kakao.maps.LatLng(33.450701, 126.570667),
                level: 3
            }
        let map = new kakao.maps.Map(mapContiner, mapOption);
        let geocoder = new kakao.maps.services.Geocoder();
        geocoder.addressSearch(gymLoc, function (result, status) {
            if (status === daum.maps.services.Status.OK) {
                let coords = new kakao.maps.LatLng(result[0].y, result[0].x);
                let marker = new kakao.maps.Marker({
                    map: map,
                    position: coords
                });
                let infowindow = new kakao.maps.InfoWindow({
                    content: '<div style={style_2}>' + gymLoc + '</div>'
                });
                infowindow.open(map, marker);
                map.setCenter(coords);
            }
        });
    }
    createUser() {
        fetch(`http://52.79.235.166/coaches/find/${this.state.coach.coachName}`)
            .then(res => res.json()
            ).then(res => {
                this.setState({
                    coach: res
                })
            })
        chatkit.createUser({
            id: 'jane',
            creatorId: '',
            name: 'jane',
        })
            .then(() => {
                console.log('User created successfully');
            }).catch((err) => {
                console.log(err);
            });
    }
    changeView(view) {
        this.setState({
            currentView: view
        })
    }
    render() {
        // let view = '';
        // if (this.state.currentView === "ChatMessage") {
        //     view = <ChatMessage changeView={this.changeView} />
        // } else if (this.state.currentView === "chatApp") {
        //     // view = <ChatApp id={this.state.id} />
        //     view = <ChatApp createUser={this.createUser} />
        // }
        return (
            <ResponsiveContext.Consumer>
                {size => (
                    <Box
                        align="center"
                        alignContent="center"
                        justify="evenly"
                        width="100%"
                        direction="column"
                    >
                        {/* top image */}
                        <Box height="large" width="full">
                            <Image fit="cover" src={CoachDetail} />
                          
                        </Box>
​
                        {/* introduce */}
                        <Box margin={{ top: "large", bottom: "medium" }}>
                            {/* <Text  weight="bold" size="60px" >"안녕하세요! {this.state.coach.coachName} 입니다."</Text> */}
                            <Heading>
                                "안녕하세요! {this.state.coach.coachName} 입니다."
                            </Heading>
                        </Box>
​
                        {/* coach Info*/}
                        <Box
                            width="xxlarge"
                            height="large"
                            direction="row"
                            align="start"
                            margin={{ horizontal: "xlarge", bottom: "xlarge", vertical: "large" }}
                            gap="medium"
                            border={{ color: 'brand', size: 'medium' }}
                            round="small"
                        >
                            <Box width="800" align="start">
                                <Image alignSelf="center" src={ (this.state.coach.CoachPhoto1 === null || this.state.coach.CoachPhoto1 === "") ? NullPhoto : "/user-image/"+ this.state.coach.coachPhoto1 } fit="cover" />
                            </Box>
​
                            <Box width="large" height="large" direction="column">
                                <Box margin={{ horizontal: "large" }} 
                                    //  pad={{ top: "medium" }}
                                >
                                    <Text weight="bold" size="45px">코치소개</Text>
                                </Box>
​
                                <Box
                                    width="xxlarge"
                                    margin={{ horizontal: "large" }}
                                    style={{ color: "black", textDecoration: "none" }}
                                >
                                    <Paragraph size="large">
                                        {this.state.coach.coachInfo}
                                    </Paragraph>
                                </Box>
                                <Box margin={{ horizontal: "large" }} pad={{ top: "small" }}>
                                    <Text weight="bold" size="45px">자격 및 경력</Text>
                                </Box>
                                <Box
                                    width="xxlarge"
                                    margin={{ horizontal: "large", vertical: "medium" }}
                                    style={{ color: "black", textDecoration: "none" }}
                                >
                                    <Text margin="small">
                                        {this.state.coach.coachResume1}
                                    </Text>
                                    <Text margin="small">
                                        {this.state.coach.coachResume2}
                                    </Text>
                                    <Text margin="small">
                                        {this.state.coach.coachResume3}
                                    </Text>
                                    <Text margin="small">
                                        {this.state.coach.coachResume4}
                                    </Text>
                                    <Text margin="small">
                                        {this.state.coach.coachResume5}
                                    </Text>
                                </Box>
                                <Box margin={{ horizontal: "large" }} pad={{ top: "small" }}>
                                    <Text weight="bold" size="45px">SNS</Text>
                                </Box>
                                <Box
                                    width="xlarge"
                                    margin={{ horizontal: "large", vertical: "medium" }}
                                    style={{ color: "black", textDecoration: "none" }}
                                >
                                    <a href={this.state.coach.coachLink} style={{ color: "black", textDecoration: "none" }}>
                                        <Text>{this.state.coach.coachLink}</Text>
                                    </a>
                                </Box>
                                <Box margin={{ horizontal: "large" }} pad={{ top: "small" }}>
                                    <Text weight="bold" size="45px">전화번호</Text>
                                </Box>
                                <Box
                                    width="xlarge"
                                    margin={{ horizontal: "large", vertical: "medium" }}
                                    style={{ color: "black", textDecoration: "none" }}
                                >
                                    <Text>{this.state.coach.coachPhone}</Text>
                                </Box>
                            </Box>
                        </Box>
​
                      
                        <Box margin="large">
                            <Text weight="bold" size="58px">
                                [{this.state.coach.coachName}] 
                                님의 소속 시설
                            </Text>
                            <Text></Text>
                        </Box>
​
                        <Box direction="row" fill="horizontal"
                            // align="center" 
                            alignContent="center" justify="center"
                            // margin={{ vertical: "large" }} 
                            width="90%">
​
                            {/* PT center */}
                            <Box
                                // direction="row"
                                width="30%"
                                border={{ color: 'brand', size: 'medium' }}
                                round="small"
                                align="center"
                                margin={{ bottom: "xlarge" }}
                            >
                                <Box direction="column" pad="large">
                                    <Box align="center">
                                        <Link to={`/GymMatchingDetail/${this.state.gym.gymId}`} style={{ textDecoration: "none" }}>
                                            <Box width="medium">
                                                <Box height="medium">
                                                    <Image src="https://placeimg.com/300/300" fit="cover" />
                                                </Box>
                                            </Box>
                                        </Link>
                                    </Box>
​
                                    <Box
                                        // direction="column"
                                        width="medium"
                                        margin={{ horizontal: "large", vertical: "medium" }}
                                    >
                                        <Box>
                                            <Link to={`/GymMatchingDetail/${this.state.gym.gymId}`} style={{ textDecoration: "none" }}>
                                                <Text weight="bold" size="28px" color="brand">
                                                    {this.state.gym.gymName}
                                                </Text>
                                            </Link>
                                        </Box>
                                        <Box>
​
                                        </Box>
                                        <Box>
                                            <Text weight="bold" size="22px" >위치</Text>
                                            <Box>
                                                <Text>{this.state.gym.gymLoc}</Text>
                                            </Box>
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
​
                            {/* map */}
                            <Box 
                                width="large" 
                                height="700"
                                border={{ color: 'brand', size: 'medium' }}
                                round="small"
                                margin={{bottom:"xlarge",left:"large"}}
                             >
                                <div id="map" style={style_1} />
                            </Box>
                        </Box>
                    </Box>
                )}
            </ResponsiveContext.Consumer>
        );
    }
}
export default CoachMatchingDetail