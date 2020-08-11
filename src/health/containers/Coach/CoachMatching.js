import React, { Component } from 'react'
import { Add } from "grommet-icons"

import {
    Box,
    Button,
    Heading,
    Image,
    ResponsiveContext,
    Text,
    Stack
} from 'grommet';

import { Link } from 'react-router-dom'
import CoachPhoto from '../../assets/match_main.jpg'
import NullPhoto from '../../assets/null_photo.png'

class CoachMatching extends Component {

    constructor(props) {
        super(props);
        this.state = {
            coaches: [],
            visible: 6,
            error: false
        };
        this.loadMore = this.loadMore.bind(this)
    }

    loadMore() {
        this.setState((prev) => {
            return { visible: prev.visible + 4 };
        })
    }

    componentDidMount() {
        fetch("http://52.79.235.166/coaches/find")
            .then(res => res.json()
            ).then(res => {
                this.setState({
                    coaches: res
                })
            }).catch(error => {
                console.error(error);
                this.setState({
                    error: true
                })
            })
    }

    render() {
        return (
            <ResponsiveContext.Consumer>
                {size => (
                    <Box direction="row" align="center" justify="center" >
                        <Box flex align="center" justify="center" overflow={{ vertical: 'hidden' }}>
                            <Box overflow="hidden" width="100%">
                                <Stack anchor="center">
                                    <Box height="large" width="full">
                                        <Image fit="cover" src={CoachPhoto} />
                                    </Box>
                                    {/* <Box width="100%" height="100%">
                                        <Box margin={{ left: "xxlarge",}}>
                                            <Text weight="bold" size="45px" color="#000000">최고의 코치를 만나보세요.</Text>
                                        </Box>
                                    </Box> */}
                                </Stack>
                            </Box>
​
                            <Box width="80%" align="center" alignContent="center" justify="evenly">
                                <Box align="center" margin="xlarge">
                                    <Text weight="bold" size="70px">코치 추천</Text>
                                </Box>
​
                                
                                <Box
                                    fill="horizontal"
                                    align="center"
                                    justify="evenly"
                                    width="100%"
                                    direction="row"
                                    wrap
                                >
                                    {this.state.coaches.slice(0,
                                        this.state.visible).map((coach) => {
                                            return (
                                                <Box
                                                    direction="column"
                                                    width="medium"
                                                    height="medium"
                                                    border={{ color: 'brand', size: 'medium' }}
                                                    round="small"
                                                    align="center"
                                                    margin={{ horizontal: "medium", bottom: "medium" }}
                                                    key={coach.coachId}
                                                >
                                                    <Link to={`/CoachMatchingDetail/${coach.coachId}/${coach.gymId.gymId}`} style={{ color: "black", textDecoration: "none" }} >
                                                        <Box height="medium" width="medium" pad="small">
                                                            <Box width="small" height="small" alignSelf="center" >
                                                            <Image src={ (coach.CoachPhoto1 === null || coach.CoachPhoto1 === "") ? NullPhoto : "/user-image/"+ coach.coachPhoto1 } fit="cover" />
                                                            </Box>
                                                            <Heading level="4" textAlign="center">{coach.coachId}</Heading>
                                                            <Text textAlign="center" margin="xsmall" weight="bold" size="25px">{coach.coachName}</Text>
                                                            <Text textAlign="center" margin="xsmall">{coach.coachLoc}</Text>
                                                        </Box>
                                                    </Link>
                                                </Box>
                                            );
                                        })}
                                </Box>
                                <Box >
                                    {this.state.visible < this.state.coaches.length &&
                                        <Button primary color="#111111" icon={<Add />} onClick={this.loadMore} type="button" className="load-more">Load more</Button>}
​
                                </Box>
                                <br />
                                <br />
​
                            </Box>
                        </Box>
                    </Box>
                )}
            </ResponsiveContext.Consumer>
        );
    }
}
export default CoachMatching