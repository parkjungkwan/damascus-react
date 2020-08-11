/*global daum*/
import React, { Component } from 'react'
import {
    Box,
    Button,
    Image,
    ResponsiveContext,
    Heading,
    Text
} from "grommet";
import { FormPreviousLink as PrevLinkIcon } from 'grommet-icons';
import NullPhoto from '../../assets/null_photo.png'
const style_1 = {
    width: "100%",
    height: "100%",
    align: "center"
}
const style_2 = {
    width: "150px",
    textalign: "center",
    // padding:"6px"
}
class GymMatchingDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            gym: []
        }
        this.drawMap = this.drawMap.bind(this)
        this.goBack = this.goBack.bind(this);
    }
    goBack() {
        this.props.history.goBack();
    }
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
            if (status === kakao.maps.services.Status.OK) {
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
    componentDidMount() {
        //fetch
        const { gymId } = this.props.match.params
        fetch(`http://52.79.235.166/gyms/find/${gymId}`)
            .then(res => res.json()
            ).then(res => {
                this.setState({
                    gym: res
                })
                this.drawMap(this.state.gym.gymLoc)
            }).catch(error => {
                console.log(error);
                this.setState({
                    error: true
                })
            })
    }
    render() {
        return (
            <ResponsiveContext.Consumer>
                {size => (
                    <Box>
                        <Box align="center">
​
                            {/* full image */}
                            <Box>
                                <Image fit="cover" src="https://placeimg.com/3000/800/place" />
                            </Box>
​
                            <Box align="center" margin={{ top: "large" }}>
                                <Heading level={2} size="large">근처 피트니스 매칭</Heading>
                            </Box>
​
                            <Box align="center" margin="medium">
                                <Text size="45px">{this.state.gym.gymName}</Text>
                            </Box>
​
                            <Box
                                direction="row"
                                width="80%"
                                margin="medium"
                                border={{ color: 'brand', size: 'medium' }}
                                round="small"
                                align="center"
                                justify="center"
                                wrap
                            >
                                <Box
                                    direction="column"
                                    width="large"
                                    pad="medium"
                                >
                                    <Box height="medium">
                                    <Image src={ (this.state.gym.gymPhoto === null || this.state.gym.gymPhoto === "") ? NullPhoto : "/user-image/"+ this.state.gym.gymPhoto } fit="cover" />
                                    </Box>
                                    <Box height="medium">
                                        <div id="map" style={style_1} />
                                    </Box>
                                </Box>
                                <Box
                                    direction="column"
                                    width="medium"
                                    pad="medium"
                                >
                                    <Box margin={{ vertical: "large" }}>
                                        <Text size="xlarge">{this.state.gym.gymLoc}</Text>
                                    </Box>
                                    <Box margin={{ bottom: "large" }}>
                                        <Box margin={{ bottom: "medium" }}>
                                            <Text size="xlarge" weight="bold">소개</Text>
                                        </Box>
                                        <Text size="large">{this.state.gym.gymInfo}</Text>
                                    </Box>
                                    <Box margin={{ bottom: "large" }}>
                                        <Box margin={{ bottom: "medium" }}>
                                            <Text size="xlarge" weight="bold">요금</Text>
                                        </Box>
                                        <Text size="large">{this.state.gym.gymPrice}</Text>
                                    </Box>
                                    <Box margin={{ bottom: "large" }}>
                                        <Box margin={{ bottom: "medium" }}>
                                            <Text size="xlarge" weight="bold">이용시간</Text>
                                        </Box>
                                        <Text size="large">{this.state.gym.gymTime}</Text>
                                    </Box>
                                    <Box margin={{ bottom: "large" }}>
                                        <Box margin={{ bottom: "medium" }}>
                                            <Text size="xlarge" weight="bold">편의시설</Text>
                                        </Box>
                                        <Text size="large">{this.state.gym.gymInfo1}</Text>
                                        <Text size="large">{this.state.gym.gymInfo2}</Text>
                                        <Text size="large">{this.state.gym.gymInfo3}</Text>
                                    </Box>
                                </Box>
                            </Box>
​
                            <Box margin={{ top: "large", bottom: "xlarge" }}>
                                <Button icon={<PrevLinkIcon />} label="뒤로 가기" onClick={this.goBack} />
                            </Box>
                        </Box>
                    </Box>
                )}
            </ResponsiveContext.Consumer>
        );
    }
}
export default GymMatchingDetail