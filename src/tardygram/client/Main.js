import React, {Component} from "react";
import axios from 'axios'

import MainHeader from "components/Headers/MainHeader.js";




// import './DevClock.css'
import './NewClock.css'

import 'moment-timezone';
// import Countdown from './CountDown'
import GoodClock from './GoodClock'

import ChartGraph from './ChartGraph'

import {
  Card,
  CardHeader,
  CardBody,
  Container,
  Row,
  Col,
} from "reactstrap";

var inc = 1000;

class Main extends Component {
  constructor(props){
    super(props)
    this.state = {
      memberid : localStorage.getItem('loginId'),
      roomdate:"",
      roomGmonth : "",
      roomGdate : "",
      roomGhours : "",
     
    }
   
  }
 

//시계 1  
  //  clock=()=> {
  //   const date = new Date();
  
  //   const hours = ((date.getHours() + 11) % 12 + 1);
  //   const minutes = date.getMinutes();
  //   const seconds = date.getSeconds();
    
  //   const hour = hours * 30;
  //   const minute = minutes * 6;
  //   const second = seconds * 6;
    
  //   document.querySelector('.hour').style.transform = `rotate(${hour}deg)`
  //   document.querySelector('.minute').style.transform = `rotate(${minute}deg)`
  //   document.querySelector('.second').style.transform = `rotate(${second}deg)`
  // }
  
//시계 2


      setDate=()=> {
        const now = new Date();
        const secondHand = document.querySelector('.second-hand');
        const minsHand = document.querySelector('.min-hand');
        const hourHand = document.querySelector('.hour-hand');
        
        const seconds = now.getSeconds();
        const secondsDegrees = ((seconds / 60) * 360) + 90;
        secondHand.style.transform = `rotate(${secondsDegrees}deg)`;

        const mins = now.getMinutes();
        const minsDegrees = ((mins / 60) * 360) + ((seconds/60)*6) + 90;
        minsHand.style.transform = `rotate(${minsDegrees}deg)`;

        const hour = now.getHours();
        const hourDegrees = ((hour / 12) * 360) + ((mins/60)*30) + 90;
        hourHand.style.transform = `rotate(${hourDegrees}deg)`;


      }

  
  
  componentDidMount(){

 
    if(localStorage.getItem("loginId")){
      window.timer = setInterval(this.setDate, inc);
      
  } 

    const headers = {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin':'*'
    }

    
    axios.get(`/member/mainchk/${this.state.memberid}`, {headers:headers})
        .then(res =>{

          let data = res.data;
          let date = new Date(data);

          let gmonth = date.getMonth()+1;
          
          let gdate = date.getDate();
          let ghours = date.getHours();
          if(gmonth<10){
            gmonth = "0"+gmonth;
          }
          if(gdate<10){
            gdate = "0"+gdate;
          }

          if(ghours<10){
            ghours = "0"+ghours;
          }

          this.setState({
            roomdate :date, 
            roomGmonth:gmonth,
            roomGdate:gdate,
            roomGtime:ghours,
            
          })

        })
        .catch(res =>{
          alert('실패')
        })

  }
 componentWillUnmount(){
   clearInterval(window.timer)
 }

  render() {
    const currentDate = new Date();
    const year = (currentDate.getMonth() === 11 && currentDate.getDate() > 23) ? currentDate.getFullYear() + 1 : currentDate.getFullYear();
    return (
<>
        <MainHeader />  

      <div className="main">

        <Container className="mt--7" fluid>
          <Row>
            <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
              <Card className="card-profile shadow">
                <Row className="justify-content-center">
                  <Col className="order-lg-2" lg="3">
                    <div className="card-profile-image">
                    </div>
                  </Col>
                </Row>
               
                <CardBody className="pt-0 pt-md-4">
                  <Row>
                    <div className="col">
                      <div className="card-profile-stats d-flex justify-content-center mt-md-5">
                      {/* <div className="devClock">
                        <div className="clock">
                          <div className="wrap">
                            <span className="hour"></span>
                            <span className="minute"></span>
                            <span className="second"></span>
                            <span className="dot"></span>
                          </div>
                        </div> 
                      </div>                         */}
                      <div className="clock">
                        <div className="outer-clock-face">
                          <div className="marking marking-one"></div>
                          <div className="marking marking-two"></div>
                          <div className="marking marking-three"></div>
                          <div className="marking marking-four"></div>
                          <div className="inner-clock-face">
                            <div className="hand hour-hand"></div>
                            <div className="hand min-hand"></div>
                            <div className="hand second-hand"></div>
                          </div>
                        </div>
                      </div>
                      </div>
                    </div>
                  </Row>
                  <div className="text-center">                    
               
                    <hr className="my-4" />    
                  </div>
                </CardBody>
              </Card>
            </Col>

            <Col className="order-xl-1" xl="8">
              <Card className="bg-secondary shadow">
                <CardHeader className="bg-white border-0">
                  <Row className="align-items-center">
                    <Col xs="12">
                     
                    </Col>               
                  </Row>
                </CardHeader>
                <CardBody>
                    <h4 className="text-muted mb-4">
                      {this.state.memberid} (님) 다음 모임까지
                      {/* <Moment fromNow>2019-07-31T14:00:00.000Z</Moment> */}
                      {/* <Countdown date={Date.now()+ 10000}>
                        alert("지각하셨습니다.")
                      </Countdown> */}
                    </h4>
                    {/* <Countdown timeTillDate="05 26 2019, 6:00 am" timeFormat="MM DD YYYY, h:mm a" /> */}

                    
                    <GoodClock date={`${year}-${this.state.roomGmonth}-${this.state.roomGdate}T${this.state.roomGtime}:00:00`} />
     

                    <hr className="my-4" />
                    <ChartGraph></ChartGraph>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      
      </div>
      </>
    );
  }
}

export default Main;
