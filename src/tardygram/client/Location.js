import React from "react";
import ReactDOM from "react-dom";
import Moment from 'react-moment';
import 'moment-timezone';
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col
  } from "reactstrap";
  let latitude = 0;
  let longitude = 0;

  let rtn = 0;
  class Location extends React.Component {
  constructor(props) {
    super(props);

    this.state={
      latitude : "",
      longitude : "",
      distance : false,
      dist:100,
      }
  }
  

  calcDistance=()=>{
  
    let that = this
    var startPos;
    var geoOptions = {
      enableHighAccuracy: true
    }
    
    var geoError = function(error) {
     
      // error.code can be:
      //   0: unknown error
      //   1: permission denied
      //   2: position unavailable (error response from location provider)
      //   3: timed out
    };
    if (navigator.geolocation) {
      // GeoLocation을 이용해서 접속 위치를 얻어옵니다
      navigator.geolocation.getCurrentPosition(function(position) {
        startPos = position;
        that.setState({
          latitude: startPos.coords.latitude,
          longitude: startPos.coords.longitude
        })
       
  
        var EARTH_R, Rad, radLat1, radLat2, radDist; 
        var distance, ret;
    
        EARTH_R = 6371000.0;
        Rad 	= Math.PI/180;
        radLat1 = Rad * that.state.longitude;
   
        radLat2 = Rad * 126.95633090000005;   
        //목적지 경도
        radDist = Rad * (that.state.latitude - 37.563398);
        //목적지 위도
        distance = Math.sin(radLat1) * Math.sin(radLat2);
        distance = distance + Math.cos(radLat1) * Math.cos(radLat2) * Math.cos(radDist);
        ret 	= EARTH_R * Math.acos(distance);
    
        var rtn = Math.round(Math.round(ret) / 1000);
         if(rtn <= 0)
         {
           rtn = Math.round(ret);
          //  +" m"
         }
        //  else
        //  {
        //    rtn = rtn + " km";
        // }
        // ${place_name}
       
        that.setState({
          dist : rtn,
        })
        that.CheckTardy()

      }, geoError, geoOptions)
      //목적지와 현위치랑 거리비교
    }  
   
}
CheckTardy = () =>{
  // this.getLocation();
  // this.calcDistance()


  // 1. 거리 확인


  if(this.state.dist < 50){
  this.distance  =	true
  let gotTime = new Date ("2019-07-29T19:40+0900")
  //약속시간
  let nowTime = new Date();
  //현재시간

  let myTime = gotTime.getTime() - nowTime.getTime()
    if(myTime > 1){
      alert("도착하셨습니다.")
    }else{
      alert("지각이에요.")
    }
  }else{
    alert("도착 후에 눌러주세요")
  }
}




  //  <Location />
  render() {
 
    return (
      <div className="App">
           약속 시간은
          <Moment fromNow>2019-07-27T15:40+0900</Moment>
          <br></br>
          <Button 
          onClick={this.calcDistance}>
            도착!                
          </Button>      
        </div>
      
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<Location />, rootElement);

export default Location
