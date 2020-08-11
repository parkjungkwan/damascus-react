import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import axios from 'axios'
import Pagination from "material-ui-flat-pagination";
import Button from '@material-ui/core/Button';


export default class PR extends React.Component{
  constructor(props) {
    super(props);
     this.state={
        prs:[],
        minValue: 0,
        maxValue: 6,          
        offset:0 ,
        keyword:'',
        seq:''
  } 
}

changePage=(pageNum,offset)=> {
  console.log(pageNum)
  this.setState({ minValue: (pageNum - 1)*6,
                  maxValue: pageNum * 6, 
                  offset});

}
componentDidMount(){
    axios.get('/prs')
    .then(res=>{
      const prs = res.data;
      this.setState({prs});          
  })
  }
  
detail=(seq,itvSeq)=>{    
    if(sessionStorage.authSeq == itvSeq || sessionStorage.authType === '2'){   
    sessionStorage.prSeq=seq;
    window.location = '/PRDetail'  
  }else{
    alert('권한이 없습니다')
  }  

} 
upload=()=>{
  window.location = '/PRUpload'   
}
typing=(e)=>{
  this.setState({keyword: e.target.value})
  console.log(this.state.keyword);
  }

searching=(e)=>{
    e.preventDefault();          
    const key =this.state.keyword;
    console.log("key:"+key)
    axios.get('/prs/search/'+key)
    .then(res=>{
      const prs = res.data;
      this.setState({prs});
      console.log("data:"+res.data)
  })

} 

  render(){    
 
    let cardGrid ={
      paddingTop: '3%',      
      paddingBottom: '3%',      
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
    let searching= {
      padding: '2px 4px',  
      display: 'flex',
      alignItems: 'center',
      width: '100%',
      textAlign:'center',
      margin:'auto',
      marginTop: '30px',      
    }
    let input= {
      marginLeft: 8,
      flex: 1,
    }
    let iconButton= {
      padding: 10,
    } 

    let name={
      fontSize: '33px',
        textAlign: 'center',
        letterSpacing: '8px',
        color: '#336699 ',
        fontWeight: 'bold'
    }
    let title ={          
      color: '#3e4444 ',
      fontWeight: 'bold',
      paddingLeft: '8px'
    }
    let state = {
      textAlign: 'right',
      color: '#ba3838',
      fontWeight: 'bold'
    }
    let tags= {     
      fontSize: '15px',
      color: 'SteelBlue ',
      fontWeight: 'bold',
      letterSpacing: '1.5px',
      paddingLeft: '10%',           
    }
    let page={
      textAlign:'center',
      margin:'3%'
    }
    let btn={
      width : '100%',
      marginTop: '10px',
      marginBottom: '30px'
    }
  let data = this.state.prs;

  return(  
   
    <React.Fragment>
       {/*검색 */}
       <form onSubmit={this.searching}>
       <Container  maxWidth="md">   
          <Paper style={searching} >   
             
          <InputBase
            style={input}
            placeholder="지역. 직무 등 키워드를 입력해주세요."
            inputProps={{ 'aria-label': '검색' }}
            onChange={this.typing}
          />
          <IconButton style={iconButton} aria-label="Search" type="submit">
            <SearchIcon />
          </IconButton>
        </Paper>
       </Container>
          </form>


       <Container style ={cardGrid}  maxWidth="md">       
       <Grid container spacing={6} >
        {data && data.slice(this.state.minValue,this.state.maxValue).map(pr => 
        <Grid item key={pr} xs={12} sm={6} md={4} onClick={()=>this.detail(pr.prSeq,pr.itvSeq)}>
            <Card style ={card} >           
              <CardContent style ={cardContent}>  
                <Typography><p /></Typography>                       
                <Typography style={name} gutterBottom component="h2" >
                  {pr.name}
                </Typography>
                <Typography><p /></Typography>  
                <Typography style={title} gutterBottom variant="h6" >
                {pr.title}
                </Typography>
                <Typography><p /></Typography> 
                <Typography  style ={tags} gutterBottom >
                  #{pr.tagLocation}  #{pr.tagAttribute}  #{pr.area}
                </Typography>
                <Typography><p /></Typography>    
                <Typography style ={state} >
                {pr.state}
                </Typography>
              
              </CardContent>
          
            </Card>           
             </Grid>
              )}
              </Grid>
            <div style={page}>
             <Pagination
                  limit={6}
                  total={this.state.prs.length}
                  offset={this.state.offset}
                  onClick={(e, offset) =>this.changePage(offset/6+1, offset)}
                /> </div>
                  {sessionStorage.getItem('authType') === '1' ?
                <Button color="primary" size="large" variant="contained" style={btn} onClick={this.upload}>내 PR올리기</Button>  
                :''}
              </Container>
              </React.Fragment>
            

  )
}
}