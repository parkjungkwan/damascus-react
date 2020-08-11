import React, {useState} from 'react';
import {Avatar, Button, CssBaseline, TextField, 
        Typography, Container} from '@material-ui/core';

import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios'


const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
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
}));

export default function Login() {
  const classes = useStyles();
  const [value, setValue] = useState('1')

  function handleChange(e){
    setValue(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault();
    const data = {
      managerId: e.target.itvId.value,
      pwd: e.target.pwd.value
    }
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'JWT fefege..'
    }
    axios.post(`/managers/login`, JSON.stringify(data), {headers: headers})
      .then(res=>{
        if(res.data!==''){
          alert(`${res.data.managerId} 님 환영합니다.`)
          sessionStorage.setItem('authId', res.data.managerId)
          document.location.href='/CorporationAdmin'
        }else{
          alert('아이디 또는 비밀번호가 바르지 않습니다.')
        }
      })
      .catch(e=>{
        alert('가입된 회원정보를 찾지 못했습니다.')
      })
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Admin Login
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="itvId"
            name="itvId"
            label="아이디"
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
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Login In
          </Button>
        </form>
      </div>
    </Container>
  );
}
