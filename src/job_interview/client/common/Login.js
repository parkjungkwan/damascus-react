import React from 'react';
import {Avatar, Button, CssBaseline, TextField, 
        FormControlLabel, Link, withStyles,
        Grid, Typography, Container, RadioGroup, Radio} from '@material-ui/core';

import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import axios from 'axios'
import { connect } from 'react-redux'

const useStyles = theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});

class Login extends React.Component {
  constructor(){
    super()
    this.state = {
      value: '1'
    }
  }

  handleChange=(e)=>{
    this.setState({value:e.target.value})
  }

  handleReplace=(e)=>{
    if((e.target.value).search(/\s/) !== -1){
      e.target.value = e.target.value.replace(' ','')
    }
  }

  handleSubmit=(e)=>{
    e.preventDefault();
    if(e.target.loginId.value===""){
      alert('아이디를 입력해주세요.')
    }else if(e.target.pwd.value===""){
      alert('비밀번호를 입력해주세요.')
    }else{
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'JWT fefege..'
      }
      if(this.state.value==='1'){
        const url = '/interviewers'
        const data = {
          itvId: e.target.loginId.value,
          pwd: e.target.pwd.value
        }
        axios.post(`${url}/login`, JSON.stringify(data), {headers: headers})
        .then(res=>{
          if(res.data!==''){
            alert(`${res.data.name} 님 환영합니다.`)
            sessionStorage.setItem('authSeq', res.data.itvSeq)
            sessionStorage.setItem('authId', res.data.itvId)
            sessionStorage.setItem('authType', this.state.value)
            document.location.href='/'
  /*           this.props.dispatch({
              type:'LOGIN', 
              authSeq: res.data.itvSeq, 
              authId: res.data.itvId,
              authType: this.state.value
              })
            this.props.history.push('/') */
          }else{
            alert('아이디 또는 비밀번호가 바르지 않습니다.')
          }
        })
        .catch(e=>{
          alert('가입된 회원정보를 찾지 못했습니다.')
        })
      }else if(this.state.value==='2'){
        const url = '/corporations'
        const data = {
          corId: e.target.loginId.value,
          pwd: e.target.pwd.value
        }
        axios.post(`${url}/login`, JSON.stringify(data), {headers: headers})
        .then(res=>{
          if(res.data!==''){
            alert(`${res.data.name} 님 환영합니다.`)
            sessionStorage.setItem('authSeq', res.data.corSeq)
            sessionStorage.setItem('authId', res.data.corId)
            sessionStorage.setItem('authType', this.state.value)
            document.location.href='/'
          }else{
            alert('아이디 또는 비밀번호를 찾을 수 없습니다.')
          }
        })
        .catch(e=>{
          alert('가입된 회원정보를 찾지 못했습니다.')
        })
      }else{
        alert('선택값 오류')
      }
    }
  }

  render(){
    const { classes } = this.props
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            로그인
          </Typography>
          <RadioGroup
            name="selection"
            value={this.state.value}
            onChange={this.handleChange}
            row
          >
            <FormControlLabel value="1" control={<Radio />} label="개인회원" />
            <FormControlLabel value="2" control={<Radio />} label="기업회원" />
          </RadioGroup>
          <form className={classes.form} noValidate onSubmit={this.handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="loginId"
              name="loginId"
              label="아이디"
              onChange={this.handleReplace}
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="pwd"
              name="pwd"
              label="비밀번호"
              type="password"
              autoComplete="current-password"
              onChange={this.handleReplace}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="/join" >
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
              <Grid item>
                <Link href="/findpwd" >
                  Forgot password?
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    );
  }
}

export default connect()(withStyles(useStyles)(Login))