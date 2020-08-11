import React from "react";
import Grid from "@material-ui/core/Grid";
import { Typography, TextField, Container, Modal, withStyles } from "@material-ui/core";
import axios from "axios";
import Button from "@material-ui/core/Button";

import NoticeModal from './NoticeModal'

const top = 50 + Math.round(Math.random() * 20) - 10;
const left = 50 + Math.round(Math.random() * 20) - 10;

const useStyles = theme => ({
    modal: {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
        position: 'absolute',
        width: 1000,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 4),
        outline: 'none',
    },
    container: {
      marginTop: '100px'
    },
    btn: {
      margin: 'auto',
      padding: '10px'
    },
    space: {
      margin: '70px'
    }
});

class AliveCreate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      corSeq: "",
      corName: "",
      noticeSeq: "",
      area: "",
      career: "",
      startDate: "",
      startTime: "",
      state: "",
      url:
        "http://localhost:8080/?room=" +
        Math.floor(Math.random() * 100000000 + 1)
    };
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleClick = e => {
    this.setState({open:true})
  }

  handleClose = rowData => {
    if(typeof rowData.noticeSeq!=='undefined'){
      this.setState({corSeq:rowData.corSeq})
      this.setState({corName:rowData.corName})
      this.setState({noticeSeq:rowData.noticeSeq})
      this.setState({career:rowData.career})
      this.setState({area:rowData.area})
    }
    this.setState({open:false})
  };

  handleSubmit = event => {
    event.preventDefault();

    const noticeSeq = event.target.noticeSeq.value;
    const alives = {
      corSeq: event.target.corSeq.value,
      corName: event.target.corName.value,
      noticeSeq: event.target.noticeSeq.value,
      area: event.target.area.value,
      career: event.target.career.value,
      startDate: event.target.startDate.value,
      startTime: event.target.startTime.value,
      state: "진행 예정",
      url: event.target.url.value
      // url: "http://localhost:8080/?room=" + Math.floor(Math.random()*100000000 + 1),
    };
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'JWT fefege..'
    }
    axios.post('/alives/upload',JSON.stringify(alives),{headers: headers})
    .then(res=>{
      if(res.data.result==='SUCCESS'){
        alert('생성 완료!');
        // 면접자 목록 생성
        axios.post(`/awaiters`,{liveSeq:res.data.liveSeq, noticeSeq:noticeSeq},{headers: headers})
        .then(res=>{
          if(res.data.result==='SUCCESS'){
            alert('면접자 목록 생성 성공');
            window.location = '/AliveAdmin';
          }else{
            alert('면접자 목록을 만드는 중 문제가 발생하였습니다.');
          }
        })
        .catch(e=>{
          alert('면접자 목록을 만드는데 실패하였습니다.')
        })
      }else{
        alert('면접 방을 만드는 과정에서 문제가 발생하였습니다.');
      }
    })
    .catch(e=>{
      alert('면접 방을 만드는데 실패 하였습니다.')
    })
  };

  render() {
    const { classes } = this.props
    const d = new Date()
    const nowDate = d.getFullYear().toString() + '-'
        + (d.getMonth()+1<10 ? '0':'') + (d.getMonth()+1).toString() + '-'
        + (d.getMonth()<10 ? '0':'') + d.getDate().toString()
    return (
      <React.Fragment>
        <form onSubmit={this.handleSubmit} onChange={this.handleChange}>
          <Container className={classes.container} maxWidth="md">
            <Typography variant="h6" gutterBottom>
              면접 방 생성
            </Typography>
            <Grid item xs={12} sm={4}>
            </Grid>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={4}>
                <TextField
                  id="corSeq"
                  name="corSeq"
                  label="기업 번호"
                  fullWidth
                  autoComplete="corSeq"
                  value={this.state.corSeq}
                  onClick={this.handleClick}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  id="corName"
                  name="corName"
                  label="기업명"
                  fullWidth
                  autoComplete="corName"
                  value={this.state.corName}
                  onClick={this.handleClick}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  id="noticeSeq"
                  name="noticeSeq"
                  label="공고 번호"
                  fullWidth
                  autoComplete="noticeSeq"
                  value={this.state.noticeSeq}
                  onClick={this.handleClick}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="area"
                  name="area"
                  label="직무"
                  fullWidth
                  autoComplete="area"
                  value={this.state.area}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="career"
                  name="career"
                  label="경력사항 (신입/경력/경력무관/인턴)"
                  fullWidth
                  autoComplete="career"
                  value={this.state.career}
                />
              </Grid>
              {
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="url"
                    name="url"
                    label="면접방 URL"
                    fullWidth
                    autoComplete="url"
                    defaultValue={this.state.url}
                  />
                </Grid>
              }
              <Grid item xs={4} sm={2}>
                <TextField
                  id="startDate"
                  name="startDate"
                  label="면접일"
                  type="date"
                  defaultValue={nowDate}
                  InputLabelProps={{
                    shrink: true
                  }}
                />
              </Grid>
              <Grid item xs={4} sm={2}>
                <TextField
                  id="startTime"
                  name="startTime"
                  label="면접시각"
                  type="time"
                  defaultValue="12:00"
                  InputLabelProps={{
                    shrink: true
                  }}
                  inputProps={{
                    step: 300
                  }}
                />
              </Grid>

              <Grid container spacing={10}>
                <p className={classes.space} />
              </Grid>
              <Grid container spacing={3}>
                <Button size="large" className={classes.btn} color="primary" type="submit">
                  Upload
                </Button>{" "}
              </Grid>
            </Grid>
          </Container>
        </form>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.open}
          onClose={this.handleClose}
          >
            <div className={classes.modal}>
              <NoticeModal callClose={this.handleClose} />
            </div>
        </Modal>
      </React.Fragment>
    );
  }
}

export default withStyles(useStyles)(AliveCreate)