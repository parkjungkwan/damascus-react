import React from 'react'
import PropTypes from 'prop-types';
import { Container, CssBaseline, Grid, TextField, Button, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios'

const useStyles = theme => ({
    form: {
        marginTop: theme.spacing(10),
        marginBottom: theme.spacing(10),
        width: '100%', // Fix IE 11 issue.
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    }
});

class Modify extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            corRegNo: '',
            corId: '',
            pwd: '',
            name: '',
            ceoName: '',
            area: '',
            pmName: '',
            pmPhone: '',
            city: '',
            homepage: ''
        }
    }
    componentDidMount(){
        const corId = sessionStorage.getItem('authId')
        axios.get(`/corporations/${corId}`)
            .then(res=>{
                this.setState(res.data)
            })
            .catch(e=>{
                alert('정보를 불러오지 못 했습니다.')
            })
    }

    handleChange=(e)=>{
        e.preventDefault();
        // 공백 제거
        if(e.target.name!=='name' && e.target.name!=='area'
            && e.target.name!=='city' && e.target.name!=='ceoName'){
            if((e.target.value).search(/\s/) !== -1){
                e.target.value = e.target.value.replace(' ','')
            }
        }
        // 특수문자 제거 : 사업자번호, 회사명, 대표명, 가입자명, 연락처, 아이디
        if(e.target.name==='name' || e.target.name==='ceoName' 
            || e.target.name==='pmName' || e.target.name==='pmPhone'){
            const checkStr = /[`~!@#$%^&*{}<>()+=_|\-\-\\'".,;:/?]/gi;
            e.target.value = e.target.value.replace(checkStr,'')
        }
        // 한글 제거 : 사업자번호, 연락처, 아이디
        if(e.target.name==='corRegNo' || e.target.name==='pmPhone'){
            const checkStr = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/gi
            e.target.value = e.target.value.replace(checkStr, '')
        }
        // 영문 제거 : 사업자번호, 연락처
        if(e.target.name==='corRegNo' || e.target.name==='pmPhone'){
            const checkStr = /[a-zA-Z]/gi
            e.target.value = e.target.value.replace(checkStr, '')
        }
        // 숫자 제거 : 가입자이름
        if(e.target.name==='pmName'){
            const checkStr = /[0-9]/gi
            e.target.value = e.target.value.replace(checkStr, '')
        }
        // 하이픈(-) 추가 가입자연락처
        if(e.target.name==='pmPhone'){
            const num = e.target.value.replace(/[^0-9]/g, '')
            const checkStr = /^01([0|1|6|7|8|9]?)$/;
            let phone = ''
            // 휴대전화 일때
            if(checkStr.test(num.substr(0,3))){
                if(num.length < 10) {
                    phone = num;
                }else if(num.length === 10) {
                    phone += num.substr(0, 3);
                    phone += "-";
                    phone += num.substr(3, 3);
                    phone += "-";
                    phone += num.substr(6);
                }else if(num.length === 11){
                    phone += num.substr(0, 3);
                    phone += "-";
                    phone += num.substr(3, 4);
                    phone += "-";
                    phone += num.substr(7);
                }
            }else{ 
            /*  일반전화 일때 */
                if(num.length < 9) {
                    phone = num;
                }else if(num.length === 9) {
                    phone = num.substr(0, 2);
                    phone += "-";
                    phone += num.substr(2, 3);
                    phone += "-";
                    phone += num.substr(5);
                }else if(num.length === 10 && num.substr(0,2) === '02') {
                    phone = num.substr(0, 2);
                    phone += "-";
                    phone += num.substr(2, 4);
                    phone += "-";
                    phone += num.substr(6);
                }else if(num.length === 10 && num.substr(0,2) !== '02') {
                    phone = num.substr(0, 3);
                    phone += "-";
                    phone += num.substr(3, 3);
                    phone += "-";
                    phone += num.substr(6);
                }else if(num.length === 11) {
                    phone = num.substr(0, 3);
                    phone += "-";
                    phone += num.substr(3, 4);
                    phone += "-";
                    phone += num.substr(7);
                }
            }
            e.target.value = phone
        }
        this.setState({[e.target.name]: e.target.value})
    }

    handleSubmit=(e)=>{
        e.preventDefault();
        if(document.activeElement.id==='modify'){
            const data = {
                corId: e.target.corId.value,
                pwd: e.target.pwd.value,
                name: e.target.name.value,
                ceoName: e.target.ceoName.value,
                area: e.target.area.value,
                pmName: e.target.pmName.value,
                pmPhone: e.target.pmPhone.value,
                pmEmail: e.target.pmEmail.value,
                city: e.target.city.value,
                homepage: e.target.homepage.value
            }
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': 'JWT fefege..'
            }
            axios.put(`/corporations/modify`,JSON.stringify(data),{headers: headers})
                .then(res=>{
                    if(res.data.result==='SUCCESS'){
                        alert('회원정보가 수정 되었습니다.')
                        this.props.history.push('/')
                    }else if(res.data.result==='FAIL'){
                        alert('회원정보 수정 실패')
                    }
                })
                .catch(e=>{
                    alert('회원정보 수정 실패')
                })
        }else if(document.activeElement.id==='del'){
            const delyn = window.confirm('정말로 탈퇴 하시겠습니까?')
            if(delyn===true){
                axios.delete(`/corporations/${sessionStorage.getItem('authSeq')}`)
                .then(res=>{
                    if(res.data.result==='SUCCESS'){
                        alert('회원탈퇴 처리 되었습니다.')
                        sessionStorage.removeItem('authSeq')
                        sessionStorage.removeItem('authId')
                        sessionStorage.removeItem('authType')
                        document.location.href='/'
                    }else if(res.data.result==='FAIL'){
                        alert('회원 탈퇴에 실패하였습니다.')
                    }
                })
                .catch(e=>{
                    alert('회원 탈퇴에 실패하였습니다.')
                })
            }
        }
    }

    render(){
        const { classes } = this.props
        return(
            <Container component="main" maxWidth="md">
                <CssBaseline/>
                <form className={classes.form} noValidate onSubmit={this.handleSubmit} onChange={this.handleChange}>
                    <Typography variant="h6" gutterBottom>
                        정보 수정 
                    </Typography> 
                    <Grid container spacing={3}>                     
                        <Grid item xs={12} sm={6}>
                            <TextField 
                                fullWidth
                                margin="normal"
                                label="아이디"
                                id="corId"
                                name="corId"
                                value={this.state.corId}
                                disabled
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField 
                                fullWidth
                                margin="normal"
                                label="비밀번호"
                                id="pwd"
                                name="pwd"
                                value={this.state.pwd}
                                inputProps={{maxLength: 18}}
                                type="password"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField 
                                fullWidth
                                margin="normal"
                                label="회사명"
                                id="name"
                                name="name"
                                value={this.state.name}
                                inputProps={{maxLength: 33}}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField 
                                fullWidth
                                margin="normal"
                                label="사업자등록번호"
                                id="corRegNo"
                                name="corRegNo"
                                value={this.state.corRegNo}
                                disabled
                            />
                        </Grid>
                        
                        <Grid item xs={12} sm={6}>
                            <TextField 
                                fullWidth
                                margin="normal"
                                label="대표명"
                                id="ceoName"
                                name="ceoName"
                                value={this.state.ceoName}
                                inputProps={{maxLength: 16}}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField 
                                fullWidth
                                margin="normal"
                                label="업종"
                                id="area"
                                name="area"
                                value={this.state.area}
                                inputProps={{maxLength: 33}}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField 
                                fullWidth
                                margin="normal"
                                label="지역"
                                id="city"
                                name="city"
                                value={this.state.city}
                                inputProps={{maxLength: 33}}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField 
                                fullWidth
                                margin="normal"
                                label="홈페이지"
                                id="homepage"
                                name="homepage"
                                value={this.state.homepage}
                                inputProps={{maxLength: 99}}
                            />
                        </Grid>

                        <Grid item xs={12} sm={4}>
                            <TextField 
                                fullWidth
                                margin="normal"
                                label="담당자명"
                                id="pmName"
                                name="pmName"
                                value={this.state.pmName}
                                inputProps={{maxLength: 16}}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField 
                                fullWidth
                                margin="normal"
                                label="담당자 연락처"
                                id="pmPhone"
                                name="pmPhone"
                                value={this.state.pmPhone}
                                inputProps={{maxLength: 13}}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField 
                                fullWidth
                                margin="normal"
                                label="담당자이메일"
                                id="pmEmail"
                                name="pmEmail"
                                value={this.state.pmEmail}
                                inputProps={{maxLength: 97}}
                            />
                        </Grid>
                        
                        <Grid item xs={12} sm={6}>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                id="modify"
                                name="modify"
                                className={classes.submit}
                            >
                                수정하기
                            </Button>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                id="del"
                                name="del"
                                className={classes.submit}
                            >
                                탈퇴하기
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Container>
        )
    }
}

Modify.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(useStyles)(Modify)