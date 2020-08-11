import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import axios from 'axios'
import Pagination from "material-ui-flat-pagination";

export default class Alive extends React.Component{
  constructor(props) {
    super(props);
     this.state={
        alives:[],
        minValue: 0,
        maxValue: 6,          
        offset:0 
  } 
}
changePage=(pageNum,offset)=> {
  console.log(pageNum)
  this.setState({ minValue: (pageNum - 1)*6,
                  maxValue: pageNum * 6, 
                  offset});

}
  componentDidMount(){
    axios.get('/alives')
    .then(res=>{
      const alives = res.data;
      this.setState({alives});
      
  })
  }
  detail(url, state){
    // 현재 날짜와 DB 날짜 비교해서 같으면 시간 비교 > 같으면 진행중으로 , 날짜가 아직 안 됬으면 진행예정 , 날짜가 지났으면 종료    
 
    if (state === '진행 예정') {
      alert('면접 진행 예정입니다.')
    } else if(state === '진행중') {
      if (url === null) {
        alert('채팅방이 존재하지 않습니다.');
      } else {
        let pwd = url.split('=');
        let inputPwd = prompt("비밀번호를 입력하세요.");
    
        if(inputPwd === pwd[1]) {
          alert('화상면접은 aws문제로 사용이 불가합니다.');
        } else {
          if(inputPwd === '' || inputPwd === null) {
            alert('비밀번호를 입력해주세요!');
          } else {
            alert('비밀번호가 다릅니다. 마이페이지에서 확인해주세요.');
          }
        }
    
        console.log("url:"+url);
      }
    } else if(state === '종료'){
      alert('종료된 면접입니다.');
    }


} 
  render(){ 
    let cardGrid ={
      paddingTop: '3%',     
      marginBottom:"100px",  
    }
    let  card= {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: '#e3ecf4'
    }
    let cardContent= {
      flexGrow: 1,
    }
    let area ={
      color: '#404040',      
    }
    let date={
      fontSize: '25px',
      textAlign: 'center',
      color: '#3e4444 ',
      fontWeight: 'bold',
    }
    let time={
      fontSize: '25px',
      textAlign: 'center',
      color: '#3e4444 ',
      letterSpacing: '6px',
      fontWeight: 'bold',
    }
    let title ={
      fontSize: '35px',
      textAlign: 'center',
      color: '#336699 ',
      fontWeight: 'bold'
    }
    let state = {
      textAlign: 'right',
      color: '#ba3838',
      fontWeight: 'bold'
    }
    let page={
      textAlign:'center',
      margin:'3%'
    }
    let data = this.state.alives;
  return(  
    <React.Fragment>
       <Container style ={cardGrid}  maxWidth="md">
       <Grid container spacing={6} >
       {data && data.slice(this.state.minValue,this.state.maxValue).map(alive => 
       <Grid item key={alive} xs={12} sm={6} md={4} onClick={()=>this.detail(alive.url, alive.state)}>
            <Card style ={card} /* onClick={this.detail(id)} */>           
              <CardContent style ={cardContent}>                        
                <Typography style ={area} variant="h10" gutterBottom>
                  {alive.area} - {alive.career}
                </Typography> 
                <Typography><p /></Typography>      
                <Typography style={date}  gutterBottom>
                  {alive.startDate}
                </Typography>  
                <Typography style={time}  gutterBottom>
                  {alive.startTime}
                </Typography>        
                <Typography><p /></Typography>                    
                <Typography style={title} gutterBottom component="h2" >
                  {alive.corName}
                </Typography>        
                <Typography><p /></Typography>    
                <Typography style ={state} >
                {alive.state}
                </Typography>
              
              </CardContent>
          
            </Card>           
             </Grid>
              )}
              </Grid>
              <div style={page}>
             <Pagination
                  limit={6}
                  total={this.state.alives.length}
                  offset={this.state.offset}
                  onClick={(e, offset) =>this.changePage(offset/6+1, offset)}
                /> </div>
              </Container>
              </React.Fragment>

  )
}
}