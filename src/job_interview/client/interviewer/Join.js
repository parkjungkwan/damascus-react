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
        width: '100%',
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
        if(e.target.itvId.value===''){
            alert('아이디는 필수 입력정보 입니다.')
        }else if(this.state.errorYN===true){
            alert('아이디를 다시 입력해 주세요.')
        }else if(e.target.pwd.value===''){
            alert('비밀번호는 필수 입력정보 입니다.')
        }else if(e.target.pwdchk.value===''){
            alert('비밀번호 확인은 필수 입력정보 입니다.')
        }else if(e.target.pwdchk.value!==e.target.pwd.value){
            alert('비밀번호가 일치하지 않습니다.')
        }else if(e.target.name.value===''){
            alert('이름은 필수 입력정보 입니다.')
        }else if(e.target.birth.value===''){
            alert('생년월일은 필수 입력정보 입니다.')
        }else if(e.target.birth.value.length < 6){
            alert('생년월일 6자리를 입력해 주세요.')
        }else if(e.target.email.value===''){
            alert('이메일은 필수 입력정보 입니다.')
        }else if((e.target.email.value).match(checkStr)===null){
            alert('이메일 형식이 올바르지 않습니다.')
        }else{
            const data = {
                itvId: e.target.itvId.value,
                pwd: e.target.pwd.value,
                name: e.target.name.value,
                birth: e.target.birth.value,
                phone: e.target.phone.value,
                email: e.target.email.value,
                area: e.target.area.value,
                location: e.target.location.value
            }
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': 'JWT fefege..'
            }
            axios.post(`/interviewers/join`,JSON.stringify(data),{headers: headers})
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
            axios.get(`/interviewers/checkId/${e.target.value}`)
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
        if(e.target.name!=='area' && e.target.name!=='location'){
            if((e.target.value).search(/\s/) !== -1){
                e.target.value = e.target.value.replace(' ','')
            }
        }
        // 특수문자 제거 : 이름, 아이디, 휴대폰번호, 산업/직군, 근무지
        if(e.target.name!=='area' && e.target.name!=='email'
            && e.target.name!=='pwd' && e.target.name!=='pwdchk'
            && e.target.name!=='birth'){
            const checkStr = /[`~!@#$%^&*{}<>()+=_|\-\-\\'".,;:/?]/gi;
            e.target.value = e.target.value.replace(checkStr,'')
/*             if(checkChar.test(e.target.value)){
                e.target.value = e.target.value.replace(checkChar,'')
            } */
        }
        /*  한글 제거 : 아이디, 생년월일, 휴대폰번호 */
        if(e.target.name!=='area' && e.target.name!=='location'
            && e.target.name!=='email' && e.target.name!=='name'){
            const checkStr = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/gi
            e.target.value = e.target.value.replace(checkStr, '')
        }
        /*  영문 제거 : 생년월일, 휴대폰번호 */
        if(e.target.name==='birth' || e.target.name==='phone'){
            const checkStr = /[a-zA-Z]/gi
            e.target.value = e.target.value.replace(checkStr, '')
        }
         /* 숫자 제거 : 이름 */
        if(e.target.name==='name'){
            const checkStr = /[0-9]/gi
            e.target.value = e.target.value.replace(checkStr, '')
        }
        /*  하이픈(-) 추가 */
        if(e.target.name==='phone'){
            const num = e.target.value.replace(/[^0-9]/g, '')
            const checkStr = /^01([0|1|6|7|8|9]?)$/;
            let phone = ''
            /*  휴대전화 일때 */
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
            /* 일반전화 일때 */
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
    }

    render(){
        const {classes} = this.props
        const d = new Date()
        const nowDate = (d.getFullYear()-20).toString() + '-'
            + (d.getMonth()+1<10 ? '0':'') + (d.getMonth()+1).toString() + '-'
            + (d.getMonth()<10 ? '0':'') + d.getDate().toString()
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
                                label="이름"
                                id="name"
                                name="name"
                                inputProps={{maxLength: 16}}
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField 
                                fullWidth
                                margin="normal"
                                label="생년월일"
                                id="birth"
                                name="birth"
                                type="date"
                                defaultValue={nowDate}
                                InputLabelProps={{
                                    shrink: true
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField 
                                fullWidth
                                required
                                margin="normal"
                                label="아이디"
                                id="itvId"
                                name="itvId"
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
                                inputProps={{maxLength: 18}}
                                type="password"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField 
                                fullWidth
                                required
                                margin="normal"
                                label="휴대폰번호"
                                id="phone"
                                name="phone"
                                inputProps={{maxLength: 13}}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField 
                                fullWidth
                                required
                                margin="normal"
                                label="이메일주소"
                                id="email"
                                name="email"
                                inputProps={{maxLength: 70}}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField 
                                fullWidth
                                margin="normal"
                                label="희망산업/직군"
                                id="area"
                                name="area"
                                inputProps={{maxLength: 33}}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField 
                                fullWidth
                                margin="normal"
                                label="희망근무지"
                                id="location"
                                name="location"
                                inputProps={{maxLength: 33}}
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