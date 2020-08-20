import React, { Component } from 'react'
import {
    Box,
    Button,
    Image,
    ResponsiveContext,
    Text,
    Form,
    FormField
} from 'grommet';
import NullPhoto from '../assets/null_photo.png'


class CoachForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            gymId: '',
            coach: '',
            gym: ''
        }
    }

    componentDidMount() {
        let memberId = sessionStorage.getItem("memberId")
        fetch(`http://52.79.235.166/coaches/find/${memberId}`)
            .then(res => res.json()
            ).then(res => {
                this.setState({
                    coach: res,
                    gym: res.gymId
                })
            }).catch(error => {
                console.error(error);
                this.setState({
                    error: true
                })
            })
    }

    render() {
        let coachThumb = this.state.coach.coachPhoto1 === null || this.state.coach.coachPhoto1 === ""
        ? NullPhoto : "/user-image/" + this.state.coach.coachPhoto1
        let gymThumb = this.state.gym.gymPhoto === null || this.state.gym.gymPhoto === "" 
        ? NullPhoto : "/user-image/" + this.state.gym.gymPhoto
        return (
            <ResponsiveContext.Consumer>
                {size => (
                    <Box align="center" justify="center" margin="xlarge">
                        <Text weight="bold" size="70px" >코치 페이지</Text>
                        <Box
                            margin="large"
                            width="80%"
                            style={{ color: "black" }}
                            border={{ color: 'brand', size: 'medium' }}
                            round="small"
                        >
                            <Box direction="row" margin="medium" align="center" wrap>

                                <Box direction="column">
                                    
                                    <Box width="medium" alignSelf="start">
                                        <Form>
                                            <Box align="center" justify="center" height="medium" round="small" border={{ color: "brand", size: "medium" }} margin="large">
                                                <Box pad="medium">
                                                    <Image 
                                                        fit="contain" 
                                                        src={coachThumb}
                                                    />
                                                </Box>
                                            </Box>
                                        </Form>
                                    </Box>

                                    <Box width="medium" alignSelf="start">
                                        <Form>
                                            <Box align="center" justify="center" height="medium" round="small" border={{ color: "brand", size: "medium" }} margin="large">
                                                <Box pad="medium">
                                                    <Image
                                                        fit="contain"
                                                        src={gymThumb}
                                                        id="photoThumb"
                                                    />
                                                </Box>
                                            </Box>
                                        </Form>
                                    </Box>
                                </Box>

                                <Box width="65%" alignContent="center">
                                    <Form onSubmit={this.updateCoach}>
                                        <Box width="100%">
                                            <Box margin="medium">
                                                <Text weight="bold" size="40px">코치 정보</Text>
                                            </Box>
                                            <Box margin={{ bottom: "medium " }}>
                                                <FormField
                                                    name="coachName"
                                                    label="이름"
                                                    input="readonly"
                                                    value={this.state.coach.coachName}
                                                >
                                                    <Text>{this.state.coach.coachName}</Text>
                                                </FormField>
                                            </Box>
                                            <Box margin={{ bottom: "medium " }}>
                                                <FormField
                                                    name="coachLoc"
                                                    label="위치"
                                                    value={this.state.coach.coachLoc}
                                                    onChange={this.handleChange}
                                                >
                                                    <Text>{this.state.coach.coachLoc}</Text>
                                                </FormField>
                                            </Box>

                                            <Box margin={{ bottom: "medium " }}>
                                                <FormField
                                                    name="coachInfo"
                                                    label="코치소개"
                                                    value={this.state.coach.coachInfo}
                                                    onChange={this.handleChange}
                                                >
                                                    <Text>{this.state.coach.coachInfo}</Text>
                                                </FormField>
                                            </Box>
                                            <Box>
                                                <Box margin={{ bottom: "medium " }}>
                                                    <FormField
                                                        name="coachLink"
                                                        label="SNS"
                                                        value={this.state.coach.coachLink}
                                                        onChange={this.handleChange}
                                                    >
                                                        <Text>{this.state.coach.coachLink}</Text>
                                                    </FormField>
                                                </Box>
                                                <Box margin={{ bottom: "medium " }}>
                                                    <FormField
                                                        name="coachResume1"
                                                        label="자격 및 경력"
                                                        value={this.state.coach.coachResume1}
                                                        placeholder="경력사항 1"
                                                        onChange={this.handleChange}
                                                    >
                                                        <Text>{this.state.coach.coachResume1}</Text>
                                                    </FormField>
                                                    <FormField
                                                        name="coachResume2"
                                                        value={this.state.coach.coachResume2}
                                                        placeholder="경력사항 2"
                                                        onChange={this.handleChange}
                                                    >
                                                        <Text>{this.state.coach.coachResume2}</Text>
                                                    </FormField>
                                                    <FormField
                                                        name="coachResume3"
                                                        value={this.state.coach.coachResume3}
                                                        placeholder="경력사항 3"
                                                        onChange={this.handleChange}
                                                    >
                                                        <Text>{this.state.coach.coachResume3}</Text>
                                                    </FormField>
                                                    <FormField
                                                        name="coachResume4"
                                                        value={this.state.coach.coachResume4}
                                                        placeholder="경력사항 4"
                                                        onChange={this.handleChange}
                                                    >
                                                        <Text>{this.state.coach.coachResume4}</Text>
                                                    </FormField>
                                                    <FormField
                                                        name="coachResume5"
                                                        value={this.state.coach.coachResume5}
                                                        placeholder="경력사항 5"
                                                        onChange={this.handleChange}
                                                    >
                                                        <Text>{this.state.coach.coachResume5}</Text>
                                                    </FormField>
                                                </Box>
                                                {/*  */}
                                                <Box margin="medium">
                                                    <Text weight="bold" size="40px">피트니스 정보</Text>
                                                </Box>
                                                <Box margin={{ bottom: "medium " }}>
                                                    <FormField
                                                        name="gymName"
                                                        label="헬스장명"
                                                        value={this.state.gym.gymName}
                                                        onChange={this.handleChange}
                                                    >
                                                        <Text>{this.state.gym.gymName}</Text>
                                                    </FormField>
                                                </Box>
                                                <Box margin={{ bottom: "medium " }}>
                                                    <FormField
                                                        name="gymInfo"
                                                        label="소개"
                                                        value={this.state.gym.gymInfo}
                                                        onChange={this.handleChange}
                                                    >
                                                        <Text>{this.state.gym.gymInfo}</Text>
                                                    </FormField>
                                                </Box>
                                                <Box margin={{ bottom: "medium " }}>
                                                    <FormField
                                                        name="gymInfo1"
                                                        label="정보"
                                                        value={this.state.gym.gymInfo1}
                                                        placeholder="정보 1"
                                                        onChange={this.handleChange}
                                                    >
                                                        <Text>{this.state.gym.gymInfo1}</Text>
                                                    </FormField>
                                                    <FormField
                                                        name="gymInfo2"
                                                        value={this.state.gym.gymInfo2}
                                                        placeholder="정보 2"
                                                        onChange={this.handleChange}
                                                    >
                                                        <Text>{this.state.gym.gymInfo2}</Text>
                                                    </FormField>
                                                    <FormField
                                                        name="gymInfo3"
                                                        value={this.state.gym.gymInfo3}
                                                        placeholder="정보 3"
                                                        onChange={this.handleChange}
                                                    >
                                                        <Text>{this.state.gym.gymInfo3}</Text>
                                                    </FormField>
                                                </Box>
                                                <Box margin={{ bottom: "medium " }}>
                                                    <FormField
                                                        name="gymPrice"
                                                        label="가격"
                                                        value={this.state.gym.gymPrice}
                                                        onChange={this.handleChange}
                                                    >
                                                        <Text>{this.state.gym.gymInfo3}</Text>
                                                    </FormField>
                                                </Box>
                                                <Box margin={{ bottom: "medium " }}>
                                                    <FormField
                                                        name="gymTime"
                                                        label="영업 시간"
                                                        value={this.state.gym.gymTime}
                                                        onChange={this.handleChange}
                                                    >
                                                        <Text>{this.state.gym.gymTime}</Text>
                                                    </FormField>
                                                </Box>
                                                <Box margin={{ bottom: "medium " }}>
                                                    <FormField
                                                        name="gymLoc"
                                                        label="주소"
                                                        value={this.state.gym.gymLoc}
                                                        onChange={this.handleChange}
                                                    >
                                                        <Text>{this.state.gym.gymLoc}</Text>
                                                    </FormField>
                                                </Box>

                                            </Box>

                                        </Box>

                                    </Form>
                                </Box>

                            </Box>

                        </Box>
                        <Box width="80%" align="center" pad="large">
                            <Button
                                label="수정하기"
                                href="/CoachUpdateForm" />
                        </Box>
                    </Box>
                )}


            </ResponsiveContext.Consumer>
        )
    }
}
export default CoachForm