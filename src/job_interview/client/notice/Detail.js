import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import axios from 'axios'
import Button from '@material-ui/core/Button';

export default class NoticeDetail extends React.Component {

  constructor(props){
    super(props);
    this.state={ 
      noticeSeq:'', 
      title:'',
      area:'',
      career:'',
      content:'',
      tagLocation:'',
      tagAttribute:'',
      tagCareer:'',
      state:'',
      corName: '',
      startDate: '',
      startTime:'',
      itvSeq:'',
      
    };
   
  }
  componentWillMount=()=>{
    const seq = sessionStorage.noticeSeq;  
    axios.get(`/notices/${seq}`)
        .then(res=>{
            this.setState(res.data)
           console.log(res.data)
        })
        .catch(e=>{           
           console.log(e.res)
        })
}
apply=()=>{
const itv = sessionStorage.authSeq;
const notiSeq = sessionStorage.noticeSeq;

axios.post('/applicants/'+itv+'apply'+notiSeq,
 {
  itvSeq: ''
})
.then( response => {
   console.log(response)
   alert("지원 완료")
   
  } )
.catch( response => { console.log(response) } );
}

    render(){     
       

    let style = {
        marginTop:"100px",  
        marginBottom:"100px",  
    }    
    let btn = {   
      marginRight:"auto",
      marginLeft:"auto",
      marginBottom:"30px",       
      padding:"10px",
    }
    let margin={
      margin:"70px"
    } 
    let taggrid={
      fontWeight:'bold',
      letterSpacing: '2px',
      color:'#336699'
    }
   
    let codes = this.state.content
   return(
    <React.Fragment>
       
    <Container  style={style} maxWidth="md" >
          <Typography variant="h6" gutterBottom>
            공고 
          </Typography> 

          <Grid container spacing={3}>
            <Grid item xs={12} >
              <TextField 
                label="공고 제목"
                value={this.state.title}
                fullWidth  
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField 
                label="기업명"
                value={this.state.corName}
                fullWidth          
              />
            </Grid> 
            <Grid item xs={12} sm={4}>
              <TextField  
                label="직무"
                value={this.state.area}
                fullWidth                  
              />
            </Grid> 
            <Grid item xs={12} sm={4}>
              <TextField 
                label="요구경력 및 직급"
                value={this.state.career}
                fullWidth                               
              />
            </Grid>
            <Grid item xs={12}>   
            <Typography variant="h10" gutterBottom>모집개요</Typography>
              <div  dangerouslySetInnerHTML={ {__html: codes} }></div>           
            </Grid>     

            <Grid item xs={12}>   
            <Typography style={taggrid} >#{this.state.tagLocation} 
             #{this.state.tagAttribute} #{this.state.tagCareer} </Typography>
            </Grid>
           
            <Grid item xs={4} sm={2}> 
            <TextField                 
                label="접수일"                                               
                value={this.state.startDate} 
                />              
            </Grid>        
            <Grid item xs={4} sm={2} > 
            <TextField                
                label="접수시각"
                value={this.state.startTime}
                 />
            </Grid> 
          <Grid container spacing={10}><p style={margin}></p></Grid>
          {sessionStorage.getItem('authType') === '1' && this.state.state === '진행중' ?
          <Grid container spacing={3}>
            <Button size="large" variant="contained" color="primary" style={btn}  onClick={this.apply}>지원하기</Button>   
            </Grid>
            : ''}
          </Grid> 

         
          </Container>
         
          </React.Fragment>


      )
    }
}

