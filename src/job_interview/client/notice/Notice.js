import React from 'react';
import { Card, CardContent, Grid, Typography,
        Container, IconButton, Paper, InputBase,
        withStyles } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import axios from 'axios'
import Pagination from "material-ui-flat-pagination";

const useStyles = theme => ({
  cardGrid: {
    paddingTop: '3%',      
    paddingBottom: '3%',      
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#e3ecf4'
  },
  cardContent: {
    flexGrow: 1,
  },
  searching: {
    padding: '2px 4px',  
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    textAlign:'center',
    margin:'auto',
    marginTop: '30px',      
  },
  input: {
    marginLeft: 8,
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  area: {
    color: '#404040',
  },
  title: {  
    fontSize: '33px',
    textAlign: 'center',
    color: '#336699 ',
    fontWeight: 'bold'
  },
  state: {
    textAlign: 'right',
    color: '#ba3838',
    fontWeight: 'bold'
  },
  tags: {
    fontSize: '15px',
    fontWeight:'bold',
    textAlign: 'center',
    color: 'SteelBlue '
  },
  page: {
    textAlign:'center',
    margin:'3%'
  }
})

class Notice extends React.Component{
  constructor(props) {
    super(props);
     this.state={
        notices:[],
        minValue: 0,
        maxValue: 6,          
        offset:0 ,
        keyword:''
    } 
  }
  
  changePage=(pageNum,offset)=> {
    this.setState({ minValue: (pageNum - 1)*6,
                    maxValue: pageNum * 6, 
                    offset});
  }

  componentDidMount(){
    axios.get('/notices')
      .then(res=>{
        const notices = res.data;
        this.setState({notices});      
      })
      .catch(e => {});
  }

  detail(seq){
    sessionStorage.noticeSeq=seq;
    window.location = '/NoticeDetail/'+sessionStorage.noticeSeq;      
   /*  document.location.href = '/NoticeDetail'+sessionStorage.noticeSeq  */
  } 

  typing=(e)=>{
    this.setState({keyword: e.target.value})
  }

  searching=(e)=>{
    e.preventDefault();          
    const key =this.state.keyword;
    axios.get('/notices/search/'+key)
      .then(res=>{
        const notices = res.data;
        this.setState({notices});
      })
      .catch(e => {});
  }

  render(){
    const { classes } = this.props
    let data = this.state.notices; 

    return(  
      <React.Fragment>
        {/*검색 */}
        <form onSubmit={this.searching}>
        <Container  maxWidth="md">   
          <Paper className={classes.searching} >   
            <InputBase
              className={classes.input}
              placeholder="지역. 직무 등 키워드를 입력해주세요."
              inputProps={{ 'aria-label': '검색' }}
              onChange={this.typing}
            />
            <IconButton className={classes.iconButton} aria-label="Search" type="submit">
              <SearchIcon />
            </IconButton>
          </Paper>
        </Container>
        </form>

        <Container className={classes.cardGrid}  maxWidth="md">
        <Grid container spacing={6}  >
          {data && data.slice(this.state.minValue,this.state.maxValue).map(notice =>
            <Grid item key={notice} xs={12} sm={6} md={4}    onClick={()=>this.detail(notice.noticeSeq)} >
              <Card className={classes.card} >           
                <CardContent className={classes.cardContent} >                        
                  <Typography className={classes.area} variant="h10" gutterBottom>
                    {notice.area} - {notice.career}
                  </Typography> 
                  <Typography><p /></Typography>                       
                  <Typography className={classes.title} gutterBottom  component="h2" >
                    {notice.corName}
                  </Typography>
                  <Typography><p /></Typography>    
                  <Typography  className={classes.tags} gutterBottom  >
                    #{notice.tagLocation}  #{notice.tagAttribute}  #{notice.tagCareer}
                  </Typography>
                  <Typography><p/></Typography>
                  <Typography className={classes.state} >
                  {notice.state}
                  </Typography>
                </CardContent>
              </Card>       
            </Grid>    
          )}
        </Grid>
        <div className={classes.page}>
          <Pagination
              limit={6}
              total={this.state.notices.length}
              offset={this.state.offset}
              onClick={(e, offset) =>this.changePage(offset/6+1, offset)}
            /> 
        </div>
        </Container>
      </React.Fragment>
    )
  }
}

export default withStyles(useStyles)(Notice)