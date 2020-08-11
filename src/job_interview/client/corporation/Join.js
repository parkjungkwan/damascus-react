import React from 'react'
import { Container, CssBaseline, Grid, Button, 
        TextField, withStyles } from '@material-ui/core';

import axios from 'axios';

const useStyles = theme => ({
    '@global': {
      body: {
        backgroundColor: theme.palette.common.white,
      },
    },
    form: {
        marginTop: theme.spacing(5),
        marginBottom: theme.spacing(5),
        width: '100%'
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
});

class Join extends React.Component{
    constructor(){
        super()
        this.state = {
            helpLabel: '',
            errorYN: false
        }
    }

    handleSubmit=(e)=>{
        e.preventDefault();
        const checkStr = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
        if(e.target.corRegNo.value===''){
            alert('사업자등록번호는 필수 입력정보 입니다.')
        }else if(this.state.errorYN===true){
            alert('아이디를 다시 입력해 주세요.')
        }else if(e.target.name.value===''){
            alert('회사명은 필수 입력정보 입니다.')
        }else if(e.target.ceoName.value===''){
            alert('대표명은 필수 입력정보 입니다.')
        }else if(e.target.area.value===''){
            alert('업종은 필수 입력정보 입니다.')
        }else if(e.target.pmName.value===''){
            alert('가임자명은 필수 입력정보 입니다.')
        }else if(e.target.pmPhone.value===''){
            alert('가입자연락처는 필수 입력정보 입니다.')
        }else if(e.target.pmEmail.value===''){
            alert('가입자이메일은 필수 입력정보 입니다.')
        }else if((e.target.pmEmail.value).match(checkStr)===null){
            alert('이메일 형식이 올바르지 않습니다.')
        }else if(e.target.corId.value===''){
            alert('아이디는 필수 입력정보 입니다.')
        }else if(e.target.pwd.value===''){
            alert('비밀번호는 필수 입력정보 입니다.')
        }else if(e.target.pwdchk.value===''){
            alert('비밀번호 확인은 필수 입력정보 입니다.')
        }else if(e.target.pwdchk.value!==e.target.pwd.value){
            alert('비밀번호가 일치하지 않습니다.')
        }else{
            const data = {
                corId: e.target.corId.value,
                pwd: e.target.pwd.value,
                corRegNo: e.target.corRegNo.value,
                name: e.target.name.value,
                ceoName: e.target.ceoName.value,
                area: e.target.area.value,
                pmName: e.target.pmName.value,
                pmPhone: e.target.pmPhone.value,
                pmEmail: e.target.pmEmail.value,
                homepage: e.target.homepage.value,
                city: e.target.city.value
            }
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': 'JWT fefege..'
            }
            axios.post(`/corporations/join`,JSON.stringify(data),{headers: headers})
                .then(res=>{
                    alert('회원가입 되었습니다.\n로그인 후 이용해 주세요')
                    document.location.href = '/login'
                })
                .catch(e=>{
                    alert('회원가입에 실패하였습니다.')
                })
        }
    }

    handleFocusout=(e)=>{
        if(e.target.value!==''){
            axios.get(`/corporations/checkId/${e.target.value}`)
                .then(res=>{
                    if(res.data>0){
                        this.setState({
                            helpLabel: '이미 가입된 아이디가 존재합니다.',
                            errorYN: true
                        })
                    }else if(res.data===0){
                        this.setState({
                            helpLabel: '사용가능한 아이디입니다.',
                            errorYN: false
                        })
                    }
                })
                .catch(e=>{
                    alert('서버 통신 에러')
                })
        }else{
            this.setState({
                helpLabel: '',
                errorYN: false
            })
        }
    }

    handleValidation=(e)=>{
        e.preventDefault();
        // 공백 제거
        if(e.target.name!=='name' && e.target.name!=='area'
            && e.target.name!=='city' && e.target.name!=='ceoName'){
            if((e.target.value).search(/\s/) !== -1){
                e.target.value = e.target.value.replace(' ','')
            }
        }
        // 특수문자 제거 : 사업자번호, 회사명, 대표명, 가입자명, 연락처, 아이디
        if(e.target.name==='corRegNo' || e.target.name==='name'
            || e.target.name==='ceoName' || e.target.name==='pmName'
            || e.target.name==='pmPhone' || e.target.name==='corId'){
            const checkStr = /[`~!@#$%^&*{}<>()+=_|\-\-\\'".,;:/?]/gi;
            e.target.value = e.target.value.replace(checkStr,'')
        }
        // 한글 제거 : 사업자번호, 연락처, 아이디
        if(e.target.name==='corRegNo' || e.target.name==='pmPhone'
            || e.target.name==='corId'){
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
            // 일반전화 일때
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
        // 하이픈(-) 추가 사업자등록번호
        if(e.target.name==='corRegNo'){
            const num = e.target.value.replace(/[^0-9]/g, '')
            let corRegNo = ''
            if(num.length < 4) {
                return num;
            } else if(num.length < 6) {
                corRegNo += num.substr(0, 3);
                corRegNo += "-";
                corRegNo += num.substr(3);
            } else if(num.length < 10) {
                corRegNo += num.substr(0, 3);
                corRegNo += "-";
                corRegNo += num.substr(3, 2);
                corRegNo += "-";
                corRegNo += num.substr(5);
            } else {
                corRegNo += num.substr(0, 3);
                corRegNo += "-";
                corRegNo += num.substr(3, 2);
                corRegNo += "-";
                corRegNo += num.substr(5);
            }
            e.target.value = corRegNo
        }
    }

    render(){
        const { classes } = this.props
        return(
            <Container component="main" maxWidth="md">
                <CssBaseline/>
                <form className={classes.form} noValidate onSubmit={this.handleSubmit} onChange={this.handleValidation}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <TextField 
                                fullWidth
                                required
                                margin="normal"
                                label="아이디"
                                id="corId"
                                name="corId"
                                inputProps={{maxLength: 18}}
                                onBlur={this.handleFocusout}
                                helperText={this.state.helpLabel}
                                FormHelperTextProps={{error: this.state.errorYN}}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField 
                                fullWidth
                                required
                                margin="normal"
                                label="비밀번호"
                                id="pwd"
                                name="pwd"
                                inputProps={{maxLength: 18}}
                                type="password"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}></Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField 
                                fullWidth
                                required
                                margin="normal"
                                id="pwdchk"
                                name="pwdchk"
                                label="비밀번호 확인"
                                type="password"
                                inputProps={{maxLength: 18}}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                required
                                margin="normal"
                                id="name"
                                name="name"
                                label="회사명"
                                inputProps={{maxLength: 33}}
                            />
                        </Grid> 
                        <Grid item xs={12} sm={6}>
                            <TextField 
                                fullWidth
                                required
                                margin="normal"
                                id="corRegNo"
                                name="corRegNo"
                                label="사업자등록번호"
                                inputProps={{maxLength: 12}}
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                required
                                margin="normal"
                                id="ceoName"
                                name="ceoName"
                                label="대표명"
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
                                inputProps={{maxLength: 99}}
                            />
                        </Grid>

                        <Grid item xs={12} sm={4}>
                            <TextField 
                                fullWidth
                                required
                                margin="normal"
                                label="담당자명"
                                id="pmName"
                                name="pmName"
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
                                inputProps={{maxLength: 13}}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField 
                                fullWidth
                                margin="normal"
                                label="담당자 이메일"
                                id="pmEmail"
                                name="pmEmail"
                                inputProps={{maxLength: 70}}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            >
                                가입하기
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Container>
        )
    }
}

export default withStyles(useStyles)(Join)