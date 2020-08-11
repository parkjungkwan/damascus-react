import React, { Component } from "react";
import axios from "axios";
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

export default class Main extends Component {
  constructor() {
    super();
    this.state = {    
      prSeq: sessionStorage.prSeq,
      countNum: '',
      phone:'',
      title:'',
      content:'',
      area:'',
      tagLocation:'',
      tagAttribute:'',
      tagCareer:'',
      name:'',
      prLocation:'',
      itvSeq:'',
      url: '',
      dateUpload:'',
      email:''
    };
  }

  
  componentDidMount() {    
    console.log("seq:"+this.state.prSeq)
    axios.get(`/prs/PrDetail/` + this.state.prSeq)
    .then(res=>{
       this.setState(res.data)
       console.log(res.data)
    })
    .catch(e=>{           
       console.log(e.res)
      
    })
  }

 delete(){
   const seq = sessionStorage.prSeq;
   console.log("seq:"+seq)
   axios.delete('/prs/'+seq).then(res=>{
   window.location.replace("/prAdmin");
  }).catch(e => {});
}
 
  render() {
    let style = {    
        marginTop:"100px",  
    } 
    let margin={
      margin:"70px"
    }   
    let btn={
      margin:"auto"
    }
   
    return (
        <React.Fragment> 
         <Container  style={style} maxWidth="md" >
         <Typography variant="h6" gutterBottom>
         {this.state.title}  
            </Typography>
          
           <Grid container spacing={3}>      
              <Grid item xs={12} sm={4}>
                <TextField            
                  id="name"
                  name="name"
                  label="이름"
                  fullWidth                  
                  value={this.state.name}                  
                />
              </Grid> 
             
              <Grid item xs={12} sm={4}>
                <TextField            
                  id="area"
                  name="area"
                  label="희망직무"
                  fullWidth                  
                  value={this.state.area}  
                />
              </Grid> 
              <Grid item xs={12} sm={4}>
                <TextField            
                  id="prLocation"
                  name="pr_location"
                  label="희망지역"
                  fullWidth                 
                  value={this.state.prLocation}
                />
              </Grid>
              <Grid item xs={6} >
                <TextField            
                  id="phone"
                  name="phone"
                  label="연락처"
                  fullWidth                 
                  value={this.state.phone}               
                />
              </Grid>  
              <Grid item xs={6} >
                <TextField            
                  id="email"
                  name="email"
                  label="이메일"
                  fullWidth                  
                  value={this.state.email}                 
                />
              </Grid>
              <Grid container spacing={10}><p style={margin}></p></Grid> 
              <Grid>                       
              <video width="900"  controls>
                  <source type="video/mp4" key={this.state.url} src={this.state.url}  /> 
              </video> 
              </Grid>          
               
              <Grid item xs={12}>   
              <Typography variant="h10" gutterBottom>자기소개</Typography>
                <div  dangerouslySetInnerHTML={ {__html: this.state.content} }></div>           
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField            
                  id="tagLocation"
                  name="tag_Location"
                  label="#위치 태그"
                  fullWidth                 
                  value={this.state.tagLocation}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField            
                  id="tagAttribute"
                  name="tag_attribute"
                  label="#특성 태그"
                  fullWidth                
                  value={this.state.tagAttribute}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField            
                  id="tagCareer"
                  name="tag_career"
                  label="#요구경력 태그"
                  fullWidth                 
                  value={this.state.tagCareer}
                />
              </Grid>    
              <Grid container spacing={10}><p style={margin}></p></Grid>             
              <Button color="primary" variant="contained" style={btn} onClick={this.delete}>삭제</Button>
              
              <Grid container spacing={10}><p style={margin}></p></Grid>
          </Grid>       
        </Container>      
      </React.Fragment>
    );
  }
}
