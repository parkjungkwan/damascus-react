import React, { Component } from "react";
import axios from "axios";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import StayCurrentPortraitIcon from "@material-ui/icons/StayCurrentPortrait";
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

export default class Main extends Component {
  constructor() {
    super();
    this.state = {     
      scrapSeq: '',
      corSeq: sessionStorage.getItem("authSeq"),
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
    //prdetail 데이터 불러옴      
    console.log("seq:"+this.state.prSeq)
    axios.get(`/prs/PrDetail/` + this.state.prSeq)
    .then(res=>{
       this.setState(res.data)
       console.log(res.data)      
    })
    .catch(e=>{           
       console.log(e.res)
      
    })


    // 만약 현재 기업 seq랑 현재 pr seq가 일치하는 데이터가 있으면
    //click을 true로 없으면 false로 셋팅함.
    axios
    .get(`/scraps/${this.state.corSeq}/${this.state.prSeq}`)
    .then(res => {
       this.setState({countNum : res.data }); 
       console.log("count:"+res.data.countNum)
       console.log("authseq:"+sessionStorage.authSeq)
       console.log("itvseq:"+this.state.itvSeq)
    })
    .catch(e => {});
  }
  
  SendScrap = () => {
    if (this.state.countNum < 1) {
      const data = {
        corSeq: this.state.corSeq,
        prSeq: this.state.prSeq
      };

      const headers = {
        "Content-Type": "application/json",
        Authorization: "JWT fefege.."
      };
      axios
        .post(`/scraps/`, JSON.stringify(data), {
          headers: headers
        })
        .then(res => {         
          this.setState({countNum : 1});
          alert("찜하기!");
        })
        .catch(e => {});

    } else {
        axios
        .get(`/scraps/getScrapSeq/${this.state.corSeq}/${this.state.prSeq}`)
        .then(res => {
           this.setState({scrapSeq : res.data }); 
           axios
           .delete(`/scraps/${this.state.scrapSeq}`)
           .then(e => {
             this.setState({countNum : 0});
             alert("찜하기 취소");
           })
           .catch(e => {});
        })
        .catch(e=>{
          alert("실패");
        }) 
      
  
    }
  };
 Phone=()=>{
  alert("이메일:"+ this.state.email+"    연락처: "+this.state.phone);
 }
 delete(){
   const seq = sessionStorage.prSeq;
   console.log("seq:"+seq)
   axios.delete('/prs/'+seq).then(res=>{
    window.open("/pr");
  }).catch(e => {});
};
 

  render() {
    let style = {
        marginTop:"100px",  
        marginBottom:"100px",  
    } 
    let margin={
      margin:"70px"
    }
    let align={
      marginLeft:"90%"
    }
    let btn={
      margin:"auto"
    }
   
    const itvSeq = this.state.itvSeq
    return (
        <React.Fragment> 
    

    {sessionStorage.getItem('authSeq') == itvSeq || sessionStorage.getItem('authType') === '2' ?
        
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
                  autoComplete="name"
                  value={this.state.name}                  
                />
              </Grid> 
             
              <Grid item xs={12} sm={4}>
                <TextField            
                  id="area"
                  name="area"
                  label="희망직무"
                  fullWidth
                  autoComplete="area"
                  value={this.state.area}  
                />
              </Grid> 
              <Grid item xs={12} sm={4}>
                <TextField            
                  id="prLocation"
                  name="pr_location"
                  label="희망지역"
                  fullWidth
                  autoComplete="prLocation"
                  value={this.state.prLocation}
                />
              </Grid>
              <Grid item xs={12} >
                <TextField            
                  id="phone"
                  name="phone"
                  label="연락처"
                  fullWidth
                  autoComplete="phone"
                  value='영상하단의 핸드폰 아이콘을 클릭하면 연락처를 확인할 수 있으며, 구직자에게 열람여부가 알려집니다.'                 
                />
              </Grid>  
              <Grid container spacing={10}><p style={margin}></p></Grid> 
              <Grid>                       
              <video width="900"  controls>
                  <source type="video/mp4" key={this.state.url} src={this.state.url}  /> 
              </video> 
              </Grid>
            {this.state.countNum >= 1 ?
              <Grid style={align}>             
                <FavoriteIcon
                  className="favorite_icon"
                  color="error"
                  fontSize="large"
                  onClick={this.SendScrap}
                /> 
                
               <StayCurrentPortraitIcon color="primary"
               fontSize="large"  onClick={this.Phone}/>
              </Grid>
              : 
              <Grid style={align}>   
              <FavoriteBorderIcon
                className="favorite_border_icon"
                color="error"
                fontSize="large"
                onClick={this.SendScrap} /> 
                
               <StayCurrentPortraitIcon color="primary"
                fontSize="large" onClick={this.Phone} />
              </Grid>
               }
               
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
                  autoComplete="tag_Location"
                  value={this.state.tagLocation}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField            
                  id="tagAttribute"
                  name="tag_attribute"
                  label="#특성 태그"
                  fullWidth
                  autoComplete="tag_attribute"
                  value={this.state.tagAttribute}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField            
                  id="tagCareer"
                  name="tag_career"
                  label="#요구경력 태그"
                  fullWidth
                  autoComplete="tag_career"
                  value={this.state.tagCareer}
                />
              </Grid>    
              <Grid container spacing={10}><p style={margin}></p></Grid>
              {sessionStorage.getItem('authSeq') == itvSeq ?
              <Button color="primary" variant="contained" style={btn} onClick={this.delete}>삭제</Button>
              : '' }
              <Grid container spacing={10}><p style={margin}></p></Grid>
        </Grid>
       
  </Container>    
    : '' }
      </React.Fragment>
    );
  }
}
