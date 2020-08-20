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
import axios from 'axios';
import NullPhoto from '../common/assets/null_photo.png';


class CoachUpdateForm extends Component {
    constructor() {
        super()
        this.state = {
            coach:'',
            coachId: '',
            coachName: '',
            coachInfo: '',
            coachLoc: '',
            coachLink: '',
            coachResume1: '',
            coachResume2: '',
            coachResume3: '',
            coachResume4: '',
            coachResume5: '',
            newPhoto: '',
            coachPhoto1: '',
            gym:'',
            gymId: '',
            gymName: '',
            gymInfo: '',
            gymInfo1: '',
            gymInfo2: '',
            gymInfo3: '',
            gymPrice: '',
            gymTime: '',
            gymLoc: '',
            gymPhoto: ''
        }
        this.updateCoach = this.updateCoach.bind(this)
        this.updateGym = this.updateGym.bind(this)
    }
    componentDidMount() {
        let self = this
        let memberId = sessionStorage.getItem("memberId")
        //
        fetch(`http://52.79.235.166/coaches/find/${memberId}`)
            .then(res => res.json()
            ).then(res => {
                this.setState({
                    coach: res,
                    coachId: res.coachId,
                    coachName: res.coachName,
                    coachInfo: res.coachInfo,
                    coachLoc: res.coachLoc,
                    coachLink: res.coachLink,
                    coachResume1: res.coachResume1,
                    coachResume2: res.coachResume2,
                    coachResume3: res.coachResume3,
                    coachResume4: res.coachResume4,
                    coachResume5: res.coachResume5,
                    coachPhoto1: res.coachPhoto1,
                    gym: res.gymId,
                    gymId: res.gymId.gymId,
                    gymName: res.gymId.gymName,
                    gymInfo: res.gymId.gymInfo,
                    gymInfo1:res.gymId.gymInfo1,
                    gymInfo2: res.gymId.gymInfo2,
                    gymInfo3: res.gymId.gymInfo3,
                    gymPrice: res.gymId.gymPrice,
                    gymTime: res.gymId.gymTime,
                    gymLoc: res.gymId.gymLoc,
                    gymPhoto: res.gymId.gymPhoto,
                    newPhoto: ''
                })
            }).catch(error => {
                console.error(error);
                this.setState({
                    error: true
                })
            })

    }

    changePhoto = (e) => {
        // 
        let self = this
        this.setState({ newPhoto: e.target.files[0] })
        let data = new FormData()
        data.append("file", e.target.files[0])
        let fileReader = new FileReader()
        fileReader.readAsDataURL(e.target.files[0])
        fileReader.onload = function (e) {
            e.preventDefault()
            const headers = { "Content-Type": "multipart/form-data" }
            axios.post("http://52.79.235.166/upload", data, { headers: headers })
                .then(res => {
                    alert("사진이 업로드 되었습니다")
                    document.getElementById("photoThumb").src = e.target.result
                    self.setState({ coachPhoto1: res.data })
                })
                .catch(e => { alert("업로드 실패") })
        }
    }

    changeGymPhoto = (e) => {
        let self = this
        this.setState({ newPhoto: e.target.files[0] })
        let data = new FormData()
        data.append("file", e.target.files[0])
        let fileReader = new FileReader()
        fileReader.readAsDataURL(e.target.files[0])
        fileReader.onload = function (e) {
            e.preventDefault()
            const headers = { "Content-Type": "multipart/form-data" }
            axios.post("http://52.79.235.166/upload", data, { headers: headers })
                .then(res => {
                    alert("사진이 업로드 되었습니다")
                    document.getElementById("gymThumb").src = e.target.result
                    self.setState({ gymPhoto: res.data })
                })
                .catch(e => { alert("업로드 실패") })
        }
    }

    handleChange = (e) => {
        e.preventDefault();
        this.setState({
            [e.target.name]: e.target.value
        })
    }

     // Gym 값 넣는 거
     updateGym = () => {
        console.log("updateGym로 접근")
        let gymId = this.state.gymId
        let data = {
            gymName: this.state.gymName,
            gymInfo: this.state.gymInfo,
            gymInfo1: this.state.gymInfo1,
            gymInfo2: this.state.gymInfo2,
            gymInfo3: this.state.gymInfo3,
            gymPrice: this.state.gymPrice,
            gymTime: this.state.gymTime,
            gymLoc: this.state.gymLoc,
            gymPhoto: this.state.gymPhoto,
        }
        let headers = {
            'Content-type' : 'application/json',
            // 'Authorization' : 'JWT fefege...'
            'Access-Control-Allow-Origin': '*'
        }
        console.log(data)
        axios.put(`http://52.79.235.166/gyms/update/${gymId}`, JSON.stringify(data), { headers: headers })
            .then( res => {
            alert("Gym 입력 성공")   
            this.props.history.push('/CoachInForm')
            })
            .catch(e => { alert("Gym 작성실패") })
    }

    updateCoach = () => {
        let data = {
            coachName: this.state.coachName,
            coachInfo: this.state.coachInfo,
            coachLoc: this.state.coachLoc,
            coachLink: this.state.coachLink,
            coachResume1: this.state.coachResume1,
            coachResume2: this.state.coachResume2,
            coachResume3: this.state.coachResume3,
            coachResume4: this.state.coachResume4,
            coachResume5: this.state.coachResume5,
            coachPhoto1: this.state.coachPhoto1
        }
        let headers = {
            'Content-type' : 'application/json',
      // 'Authorization' : 'JWT fefege...'
      'Access-Control-Allow-Origin': '*'
        }
        axios.put(`http://52.79.235.166/coaches/update/${this.state.coachId}`, JSON.stringify(data), { headers: headers })
            .then(res => {
                alert("수정성공")
            })
            .catch(e => { alert("작성실패") })
    }

    updateInfo = (e) => {
        this.updateCoach();
        this.updateGym();
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
                                {/*  */}
                                <Box margin="small">
                                    <Box width="medium" alignSelf="start">
                                        <Form>
                                            <Box align="center" justify="center" height="medium" round="small" border={{ size: "medium", style: "dashed" }} margin="large">
                                                <Box pad="medium">
                                                    <Image fit="contain" src={coachThumb} alt="Coach Photo" id="photoThumb" />
                                                    <Text size="medium" weight="bold" textAlign="center">사진 등록</Text>
                                                    <Text size="small" textAlign="center">jpg, png, gif</Text>
                                                    <Text size="small" textAlign="center">5MB 이내로</Text>
                                                    <Box align="center" justify="center">
                                                        <input id="uploadButton" type="file" accept="image/*" onChange={this.changePhoto} />
                                                    </Box>
                                                </Box>
                                            </Box>
                                        </Form>
                                    </Box>

                                    <Box width="medium" alignSelf="start">
                                        <Form>
                                            <Box align="center" justify="center" height="medium" round="small" border={{ size: "medium", style: "dashed" }} margin="large">
                                                <Box pad="medium">
                                                    <Image fit="contain" src={gymThumb} alt="Gym Photo" id="gymThumb" />
                                                    <Text size="medium" weight="bold" textAlign="center">사진 등록</Text>
                                                    <Text size="small" textAlign="center">jpg, png, gif</Text>
                                                    <Text size="small" textAlign="center">5MB 이내로</Text>
                                                    <Box align="center" justify="center">
                                                        <input id="uploadButton" type="file" accept="image/*" onChange={this.changeGymPhoto} />
                                                    </Box>
                                                </Box>
                                            </Box>
                                        </Form>
                                    </Box>
                                </Box>


                                <Box width="65%" alignContent="center">
                                    <Form onSubmit={this.updateInfo}>
                                        <Box width="100%">
                                            {/*  */}
                                            <Box margin="medium">
                                                <Text weight="bold" size="40px">코치</Text>
                                            </Box>
                                            <Box
                                            // margin={{ bottom: "medium", vertical: "large" }}
                                            >
                                                <FormField
                                                    name="coachName"
                                                    label="이름"
                                                    value={this.state.coachName}
                                                    onChange={this.handleChange}
                                                    placeholder={this.state.coachName}
                                                />
                                             
                                            </Box>
                                            <Box
                                            // margin={{ bottom: "medium" }}
                                            >
                                                <FormField
                                                    name="coachLoc"
                                                    label="위치"
                                                    value={this.state.coachLoc}
                                                    onChange={this.handleChange}
                                                    placeholder={this.state.coachLoc}
                                               />
                                             
                                            </Box>
                                            <Box margin={{ bottom: "medium" }}>
                                                <FormField
                                                    name="coachInfo"
                                                    label="코치소개"
                                                    value={this.state.coachInfo}
                                                    onChange={this.handleChange}
                                                    placeholder={this.state.coachInfo}
                                                />
                                            </Box>
                                            <Box>
                                                <Box margin={{ bottom: "medium" }}>
                                                    <FormField
                                                        name="coachLink"
                                                        label="SNS"
                                                        value={this.state.coachLink}
                                                        onChange={this.handleChange}
                                                        placeholder={this.state.coachLink}
                                                    />
                                                </Box>
                                                <Box margin={{ bottom: "medium" }}>
                                                    <FormField
                                                        name="coachResume1"
                                                        label="자격 및 경력"
                                                        value={this.state.coachResume1}
                                                        placeholder="경력사항 1"
                                                        onChange={this.handleChange}
                                                        placeholder={this.state.coachResume1}
                                                    />
                                                    <FormField
                                                        name="coachResume2"
                                                        value={this.state.coachResume2}
                                                        placeholder="경력사항 2"
                                                        onChange={this.handleChange}
                                                        placeholder={this.state.coachResume2}
                                                    />
                                                    <FormField
                                                        name="coachResume3"
                                                        value={this.state.coachResume3}
                                                        placeholder="경력사항 3"
                                                        onChange={this.handleChange}
                                                        placeholder={this.state.coachResume3}
                                                    />
                                                    <FormField
                                                        name="coachResume4"
                                                        value={this.state.coachResume4}
                                                        placeholder="경력사항 4"
                                                        onChange={this.handleChange}
                                                        placeholder={this.state.coachResume4}
                                                    />
                                                    <FormField
                                                        name="coachResume5"
                                                        value={this.state.coachResume5}
                                                        placeholder="경력사항 5"
                                                        onChange={this.handleChange}
                                                        placeholder={this.state.coachResume5}
                                                    />
                                                </Box>


                                                {/*  */}
                                                <Box margin="medium">
                                                    <Text weight="bold" size="40px">피트니스</Text>
                                                </Box>
                                                <Box
                                                // margin={{ bottom: "medium", vertical: "large" }}
                                                >
                                                    <FormField
                                                        name="gymName"
                                                        label="헬스장명"
                                                        value={this.state.gymName}
                                                        onChange={this.handleChange}
                                                        placeholder={this.state.gymName}
                                                    />
                                                </Box>
                                                <Box margin={{ bottom: "medium" }}>
                                                    <FormField
                                                        name="gymInfo"
                                                        label="소개"
                                                        value={this.state.gymInfo}
                                                        onChange={this.handleChange}
                                                        placeholder={this.state.gymInfo}
                                                    />
                                                </Box>
                                                <Box margin={{ bottom: "medium" }}>
                                                    <FormField
                                                        name="gymInfo1"
                                                        label="정보"
                                                        value={this.state.gymInfo1}
                                                        placeholder="정보 1"
                                                        onChange={this.handleChange}
                                                        placeholder={this.state.gymInfo1}
                                                    />
                                                    <FormField
                                                        name="gymInfo2"
                                                        value={this.state.gymInfo2}
                                                        placeholder="정보 2"
                                                        onChange={this.handleChange}
                                                        placeholder={this.state.gymInfo2}
                                                        
                                                    />
                                                    <FormField
                                                        name="gymInfo3"
                                                        value={this.state.gymInfo3}
                                                        placeholder="정보 3"
                                                        onChange={this.handleChange}
                                                        placeholder={this.state.gymInfo3}
                                                    />
                                                </Box>
                                                <Box margin={{ bottom: "medium" }}>
                                                    <FormField
                                                        name="gymPrice"
                                                        label="가격"
                                                        value={this.state.gymPrice}
                                                        onChange={this.handleChange}
                                                        placeholder={this.state.gymPrice}
                                                    />
                                                </Box>
                                                <Box margin={{ bottom: "medium" }}>
                                                    <FormField
                                                        name="gymTime"
                                                        label="영업 시간"
                                                        value={this.state.gymTime}
                                                        onChange={this.handleChange}
                                                        placeholder={this.state.gymTime}
                                                    />
                                                </Box>
                                                <Box margin={{ bottom: "medium" }}>
                                                    <FormField
                                                        name="gymLoc"
                                                        label="주소"
                                                        value={this.state.gymLoc}
                                                        onChange={this.handleChange}
                                                        placeholder={this.state.gymLoc}
                                                    />
                                                </Box>
                                            </Box>
                                        </Box>
                                        <Box width="80%" align="center" pad="large">
                                            <Button
                                                label="수정하기"
                                                type="submit"
                                            />
                                        </Box>
                                    </Form>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                )}
            </ResponsiveContext.Consumer>
        )
    }
}

export default CoachUpdateForm