import React from 'react'
import {Avatar, Button, CssBaseline, TextField, Grid,
    withStyles, Typography, Container, RadioGroup,
    FormControlLabel, Radio } from '@material-ui/core';
    
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import axios from 'axios';

const useStyles = theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    btn: {
        margin: theme.spacing(2),
        height: '70%',
        width: '60%'
    },
    typography: {
        color: '#ff0000'
    }
});

class Findpwd extends React.Component{
    constructor(){
        super()
        this.state = {
            chktext: '',
            value: '1'
        }
    }

    handleChange=(e)=>{
        this.setState({value:e.target.value})
    }

    handleSubmit=(e)=>{
        e.preventDefault()
        let findId = e.target.findId.value
        if(findId===''){
            this.setState({chktext:'아이디를 입력해주세요'})
        }else{
            if(this.state.value==='1'){
                // 개인회원 체크
                axios.get(`/interviewers/checkId/${findId}`)
                    .then(res=>{
                        if(res.data>0){
                            axios.put(`/interviewers/sendMail/${findId}`)
                                .then(res=>{
                                    if(res.data.result==='SUCCESS'){
                                        this.setState({chktext:'가입된 이메일로 임시 비밀번호를 보냈습니다.\n임시 비밀번호로 로그인 해주세요'})
                                    }
                                })
                        }else{
                            this.setState({chktext:'입력한 아이디가 존재하지 않습니다.'})
                        }
                    })

            }else if(this.state.value==='2'){
                // 기업회원 체크
                axios.get(`/corporations/checkId/${findId}`)
                    .then(res=>{
                        if(res.data>0){
                            axios.put(`/corporations/sendMail/${findId}`)
                                .then(res=>{
                                    if(res.data.result==='SUCCESS'){
                                        this.setState({chktext:'가입된 이메일로 임시 비밀번호를 보냈습니다.\n임시 비밀번호로 로그인 해주세요'})
                                    }
                                })
                        }else{
                            this.setState({chktext:'입력한 아이디가 존재하지 않습니다.'})
                        }
                    })
            }
                
        }
    }

    render(){
        const {classes} = this.props
        return (
            <Container component="main" maxWidth="sm">
                <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    비밀번호 찾기
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
                    <Grid container>
                        <Grid item xs={12} sm={9}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="findId"
                                name="findId"
                                label="비밀번호를 찾을 아이디"
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.btn}
                            >
                                찾기
                            </Button>
                        </Grid>
                    </Grid>
                </form>
                <Typography className={classes.typography} id="chktext" variant="h10" gutterBottom>
                    {this.state.chktext}
                </Typography> 
            </div>
            </Container>
        )
    }
}

export default withStyles(useStyles)(Findpwd)