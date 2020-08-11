import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import axios from 'axios'
import Button from '@material-ui/core/Button';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import NoticeModal from './NoticeModal'
import { Modal } from "@material-ui/core";

export default class NoticeUpload extends React.Component {

  constructor(props){
    super(props);
    this.state={  
      title:'',
      area:'',
      career:'',
      content:'',
      tagLocation:'',
      tagAttribute:'',
      tagCareer:'',
      state:'',
      corSeq: '',
      corName: '',
      startDate:'',
      startTime:'',
      open: false
    };   
  }
  handleClick = e => {
    this.setState({open:true})
  }
  handleChange=(e)=>{
    this.setState({[e.target.name]: e.target.value})
  }

  changeTextData = (text) => {
    this.setState({content: text})
  }

  handleSubmit = (event) =>{
    event.preventDefault();
    const notices = {
      title: event.target.title.value,
      area: event.target.area.value,
      career: event.target.career.value,  
      content : this.state.content,  
      tagLocation: event.target.tagLocation.value,
      tagAttribute: event.target.tagAttribute.value,
      tagCareer: event.target.tagCareer.value,
      state: '진행중',
      corSeq: this.state.corSeq,
      corName: event.target.corName.value,  
      startDate: event.target.startDate.value,
      startTime: event.target.startTime.value,
    };

    axios({
          method: 'post',
          url: '/notices/upload',
          data: notices,
          headers: {           
        'Content-Type': 'application/json'
          },             
        }).then(res=>{
        alert("업로드 완료: "+this.state.title)
        window.location ="/noticeAdmin"
      }).catch(e => {});
    }
  
  handleClose = rowData => {
    if(typeof rowData.corSeq!=='undefined'){
      this.setState({tagLocation:rowData.city})     
      this.setState({corName:rowData.name}) 
      this.setState({corSeq:rowData.corSeq}) 
    }
    this.setState({open:false})
  };
      
  render(){
    const d = new Date()
    const nowDate = d.getFullYear().toString() + '-'
        + (d.getMonth()+1<10 ? '0':'') + (d.getMonth()+1).toString() + '-'
        + (d.getMonth()<10 ? '0':'') + d.getDate().toString()
    let style = {
      marginTop:"100px", 
    }    
    let btn = {   
      marginRight:"auto",
      marginLeft:"auto",
      marginBottom:"30px",          
      padding:"10px"      
    }
    let margin={
      margin:"70px"
    }
    let modal= {      
      position: 'absolute',
      width: 1000,   
      border: '2px solid #000',   
      outline: 'none',
      margin: '15%'
    }
    return(
      <React.Fragment>
        <form onSubmit={this.handleSubmit}>
        <Container style={style} maxWidth="md" >
          <Typography variant="h6" gutterBottom>
            공고 업로드
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} >
              <TextField            
                id="title"
                name="title"
                label="공고 제목"
                fullWidth
                autoComplete="title"
                onChange={this.handleChange}
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
                onChange={this.handleChange}
              />
            </Grid> 
            <Grid item xs={12} sm={4}>
              <TextField            
                id="area"
                name="area"
                label="직무"
                fullWidth
                autoComplete="area"
                onChange={this.handleChange}
              />
            </Grid> 
            <Grid item xs={12} sm={4}>
              <TextField            
                id="career"
                name="career"
                label="경력사항 (신입/경력/경력무관/인턴)"
                fullWidth
                autoComplete="career"
                onChange={this.handleChange}
              />
            </Grid>  
            <Grid item xs={12}>
              <CKEditor
                id="content"                    
                editor={ ClassicEditor }
                data="<p>모집 개요<p>"
                onInit={ editor => {
                }}
                onChange={ ( event, editor ) => {
                  const data = editor.getData();
                  this.changeTextData(data)
                }}
              />
            </Grid> 
            <Grid item xs={12} sm={4}>
              <TextField            
                id="tagLocation"
                name="tag_Location"
                label="#위치 태그"
                fullWidth
                autoComplete="tag_Location"
                value={this.state.tagLocation}
                onChange={this.handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField            
                id="tagAttribute"
                name="tag_attribute"
                label="#특성 태그"
                fullWidth
                autoComplete="tag_attribute"
                onChange={this.handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField            
                id="tagCareer"
                name="tag_career"
                label="#요구경력 태그"
                fullWidth
                autoComplete="tag_career"
                onChange={this.handleChange}
              />
            </Grid>

            <Grid item xs={4} sm={2}> 
              <TextField
                id="startDate"
                name="startDate"
                label="접수일"
                type="date"                                   
                defaultValue={nowDate}
                onChange={this.handleChange}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>        
            <Grid item xs={4} sm={2} > 
              <TextField
                id="startTime"
                name="startTime"
                label="접수시각"
                type="time"
                defaultValue="11:00"
                onChange={this.handleChange}
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  step: 300, 
                }}
              />
            </Grid> 
            <Grid container spacing={10}><p style={margin}></p></Grid>
            <Grid container spacing={3}>
              <Button size="large" style={btn} color="primary"  type="submit">Upload</Button>
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
            <div style={modal}>
              <NoticeModal callClose={this.handleClose} />
            </div>
        </Modal>
      </React.Fragment>
    )
  }
}
