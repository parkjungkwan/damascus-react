import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {
    Box,
    Button,
    Heading,
    Image,
    ResponsiveContext,
    Text,
    Carousel,
    TextInput
} from 'grommet';
import Gym from '../common/assets/gym.jpg';
import NullPhoto from '../common/assets/null_photo.png'
class GymMatching extends Component {
    constructor(props) {
        super(props);
        this.state = {
            keyword: '',
            gyms: [],
            error: false,
            gymnull: false
        };
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange = e => {
        this.setState({
            keyword: e.target.value
        })
    }
    onSubmit() {
        // alert
        // alert("클릭");
        const search = {
            'keyword': this.state.keyword
        }
        fetch("http://52.79.235.166/gyms/search/" + this.state.keyword)
            .then((res) => res.json()
            ).then(res => {
                this.setState({
                    gyms: res
                })
                // alert
                // alert(Object.keys(this.state.gyms).length);
                if (Object.keys(this.state.gyms).length === 0) {
                    this.setState({
                        gymnull: true
                    })
                } else {
                    this.setState({
                        gymnull: false
                    })
                }
            }).catch(error => {
                console.error(error);
                this.setState({
                    error: true
                })
            })
    }
    render() {
        let listcontent;
        if (this.state.gymnull) {
            listcontent = <Box pad="large" align="center">
                <Heading level="3"> 검색결과가 없습니다. </Heading>
            </Box>
        }
        return (
            <ResponsiveContext.Consumer>
                {size => (
                    <Box direction="row" align="center" justify="center">
                        <Box flex align="center" justify="center" overflow={{ vertical: 'hidden' }}>
​
                            <Box overflow="hidden" width='full' height="full" >
                                <Box height="full" width="full" overflow="hidden">
                                    <Box height="medium" width="full">
                                        <Image fit="cover" src={Gym} />
                                    </Box>
                                </Box>
                            </Box>
​
                            <Box width='80%'>
                                <Box align="center">
                                    <Heading level="1">주변 피트니스 센터</Heading>
                                    <Text> 지역을 검색해주세요. </Text>
                                </Box>
​
                                {/* 검색창 */}
                                <Box pad="large">
                                    <TextInput
                                        placeholder="예시: 종로구 또는 종로"
                                        type="text"
                                        name="keyword"
                                        value={this.state.keyword}
                                        onChange={this.handleChange}
                                    />
                                    <Button type="submit" onClick={this.onSubmit.bind(this)} primary label="검색" />
                                </Box>
​
                                {/* list */}
                                <Box>
                                    {listcontent}
                                    {this.state.gyms.map((gym) => {
                                        return (
                                            <Box key={gym.gymId}>
                                            <Link to={`/GymMatchingDetail/${gym.gymId}`} style={{ color: "black", textDecoration: "none" }}>
                                                <Box
                                                    direction="column"
                                                    pad={{ vertical: "medium", horizontal: "large" }}
                                                    margin={{ horizontal: "large" }}
                                                >
                                                    <Box>
                                                        <Box height="medium">
                                                        <Image src={ (gym.gymPhoto === null || gym.gymPhoto === "") ? NullPhoto : "/user-image/"+ gym.gymPhoto } fit="cover" />
                                                        </Box>
                                                        <Box size="medium">
                                                            <Heading level="3">{gym.gymName}</Heading>
                                                            <Text>{gym.gymLoc}</Text>
                                                        </Box>
                                                    </Box>
                                                </Box>
                                            </Link>
                                            </Box>
                                        )
                                    })}
​
                                </Box>
​
                            </Box>
                        </Box>
                    </Box>
                )}
            </ResponsiveContext.Consumer>
        )
    }
}
export default GymMatching