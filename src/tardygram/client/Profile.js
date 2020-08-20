 
import React from "react";
import axios from 'axios'
import {Link } from "react-router-dom";
import ImageUpload from '../common/Upload/Upload'
// import Crown from '../../components/Upload/ProfileImage/crown.png'
import Moment from 'react-moment';
import 'moment-timezone';
// reactstrap components
// import 'https://fonts.googleapis.com/css?family=Oswald:700';

import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col,
  Table,
  Badge
} from "reactstrap";
// core components


function hostRedirect(target){
  window.location.href=target
}

class Profile extends React.Component {

  constructor(props){
    super(props)
     
    this.state={
      birthday:'',
      email:'',
      gender:'',
      memberid:'',
      money:'',
      name:'',
      profileimage:'',
      phone:'',
      pwd:'',
      hostProgressEx:[],
      MemberProgressEx:[],
      amount:'',
      hostCount:'',
      memberCount:'' 
    }   
    
  }


  componentDidMount(){
    

    
     const headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin':'*'
    }
   
    let id = localStorage.getItem("loginId");
    axios.get(`/member/mypage/${id}`,  {headers:headers})
        .then(res =>{
            //alert('통신성공  url:')
     
          
         let uInfo =res.data.uInfo
   
         this.setState({
           birthday:uInfo.birthday,
           email:uInfo.email,
           gender:uInfo.gender,
           memberid:uInfo.memberid,
           money:uInfo.money,
           name:uInfo.name,
           profileimage:uInfo.profileimage,
           phone:uInfo.phone,
           pwd:uInfo.pwd,
           hostCount: res.data.hostCount,
           memberCount : res.data.memberCount
         }) 
   
         res.data.hostProgressEx.map((item)=>{
             return this.setState({
               hostProgressEx:[...this.state.hostProgressEx,item] 
             })
         })
   
         res.data.MemberProgressEx.map((item)=>{
              return this.setState({
                MemberProgressEx:[...this.state.MemberProgressEx,item] 
              })
         })
    
        })
        .catch(res =>{
            alert('통신 실패')
        })
    
   }


   imageTag=()=>{
      if(this.state.profileimage){
        return ( 
          <img className="rounded-circle" src={this.state.profileimage} alt="" style={{minWidth:"140px",maxHeight:"220px"}} ></img>
       )
      }
    }

    reciveEmit=(type)=>{
     
      this.setState({
        profileimage:type
      })
      this.imageTag();
    }


    amount = e =>{
      e.preventDefault()
      this.setState({
        amount : e.target.value
      })
    }

   Kakaopay = e =>{
    e.preventDefault()
    //this.setState({submitted: true})
  
    const headers = {
        'Content-Type': 'application/json',
        'Authorization' : '44be8b0eacbaaed2af85aaf3c1a2b34a',
        'Access-Control-Allow-Origin': '*'
    }
  
    let data = {
        amount : this.state.amount,
        memberid : localStorage.getItem("loginId")
    }

 
    axios.post('kakaoPay', JSON.stringify(data), {headers:headers})
        .then(res =>{
            alert('kakaopay성공')
            hostRedirect(res.data);
            // location.href=res.data
        })
        .catch(res =>{
            alert('kakaopay실패')
        })
  }

  render() {
  
    return (
      <>
               <div
          className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
          style={{
            minHeight: "600px",
            backgroundImage:
              "url(" + require("assets/img/theme/profile-cover.jpg") + ")",
            backgroundSize: "cover",
            backgroundPosition: "center top"
          }}
        >
          {/* Mask */}
          <span className="mask bg-gradient-default opacity-8" />
          {/* Header container */}
          <Container className="d-flex align-items-center" fluid>
            <Row>
              <Col lg="7" md="10">
                <h1 className="display-2 text-white">Hello {this.state.name}</h1>
                <p className="text-white mt-0 mb-5">
                  This is your profile page. You can see the progress you've
                  made with your work and manage your projects or assigned tasks
                </p>
                {/* <Button
                  color="info"
                  href="#pablo"
                  onClick={e => e.preventDefault()}
                >
                  Edit profile
                </Button> */}
              </Col>
            </Row>
          </Container>
        </div>
        {/* Page content */}
        <Container className="mt--7" fluid>
          <Row>
            <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
              <Card className="card-profile shadow">
                <Row className="justify-content-center">
                  <Col className="order-lg-2" lg="3">
                    <div className="card-profile-image">
                      <a href="#pablo" onClick={e => e.preventDefault()}>
                        {/* <img
                          alt="..."
                          className="rounded-circle"
                          src={require("assets/img/theme/team-4-800x800.jpg")}
                        /> */}
                        {this.imageTag()}
                      </a>
                    </div>
                  </Col>
                </Row>
                <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                  <div className="d-flex justify-content-between">
                    
              
                  </div>
                </CardHeader>
                <CardBody className="pt-0 pt-md-4">
                  <Row>
                    <div className="col">
                      <div className="card-profile-stats d-flex justify-content-center mt-md-5">
                        <div>
                          <span className="heading">{this.state.hostCount}</span>
                          <span className="description">개설중인 모임방</span>
                        </div>
                        <div>
                          <span className="heading">{this.state.memberCount}</span>
                          <span className="description">참여중인 모임방</span>
                        </div>
                    
                      </div>
                    </div>
                  </Row>
                  <div className="text-center">
                    <h3>
                      {this.state.name}
                      <span className="font-weight-light">({this.state.gender})</span>
                    </h3>
                    <div className="h5 font-weight-450">                 
                    birthday : <Moment format="YYYY년 M월 DD일 H:MM">{this.state.birthday}</Moment><br/>
                      tardycash : {this.state.money}<br/>
                      <input type="text" placeholder="금액" onChange={this.amount}></input>                  
                      <Button color="warning" outline type="button" size="sm" onClick={this.Kakaopay}>충전</Button>
                    </div>
                    
                    <hr className="my-4" />
                      
                      <div>                      
                        이미지 업로드<br/>
   
                        <ImageUpload emit={this.reciveEmit}></ImageUpload>
                      </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col className="order-xl-1" xl="8">
              <Card className="bg-secondary shadow">
                <CardHeader className="bg-white border-0">
                  <Row className="align-items-center">
                    <Col xs="8">
                      <h3 className="mb-0">My account</h3>
                    </Col>
                    <Col className="text-right" xs="4">
            
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <Form>
                    <h6 className="heading-small text-muted mb-4">
                      User information
                    </h6>
                    <div className="pl-lg-4">
                      <Row>
                        
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-username"
                            >
                              Userid
                            </label>
                            <Input
                              className="form-control-alternative"             
                              id="input-userid"
                              placeholder="Userid"
                              type="text"
                              defaultValue={this.state.memberid}
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-email"
                            >
                              Email address
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-email"
                              placeholder="test@example.com"
                              type="email"
                              defaultValue={this.state.email}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-first-name"
                            >
                              Phone
                            </label>
                            <Input
                              className="form-control-alternative"
                              
                              id="input-first-name"
                              placeholder="01012341234"
                              type="text"
                              defaultValue={this.state.phone}
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-last-name"
                            >
                              Password
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-last-name"
                              defaultValue={this.state.pwd}
                              type="password"
                           
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                    </div>
                    <hr className="my-4" />
                    <h6 className="heading-small text-muted mb-4">
                      개설중인 모임방
                    </h6>


                      
                    

                    {/* ---------------------------------------------------------------------------------------------------------- */}
                  <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col" style={{width:"15%"}}>방장</th>
                      <th scope="col" style={{width:"15%"}}>카테고리</th>
                      <th scope="col" style={{width:"50%"}}>방타이틀</th>
                      <th scope="col" style={{width:"20%"}}>날짜</th>                 
                    </tr>
                  </thead>
                  <tbody>                         
                    
                    {this.state.hostProgressEx.map((contact,i)=>{
                      return(
                          <tr key={i}>
                              <td>{contact.roomhostid}</td>
                              <td>{contact.roomcategory}</td>
                              <td>                           
                                <Link to={"/admin/roomdetail/"+ contact.roomno}>
                                <Badge color="" className="badge-dot mr-4">
                                  <i className="bg-warning" />{contact.roomtitle}
                                </Badge>
                                </Link>  
                              </td>
                              <td>{contact.roomdate}</td>
                          </tr>
                      );
                    })} 
                   
                                            
                  </tbody>
                </Table>

                <hr className="my-4" />
                    <h6 className="heading-small text-muted mb-4">
                      참여중인 모임방
                    </h6>
                    <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col" style={{width:"15%"}}>방장</th>
                      <th scope="col" style={{width:"15%"}}>카테고리</th>
                      <th scope="col" style={{width:"50%"}}>방타이틀</th>
                      <th scope="col" style={{width:"20%"}}>날짜</th>                 
                    </tr>
                  </thead>
                  <tbody>                         
                
                    {this.state.MemberProgressEx.map((contact,i)=>{
                      return(
                          <tr key={i}>
                          <td>{contact.roomhostid}</td>
                          <td>{contact.roomcategory}</td>
                          <td>
                            <Link to={"/admin/roomdetail/"+ contact.roomno}>
                            <Badge color="" className="badge-dot mr-4">
                             <i className="bg-warning" />{contact.roomtitle}                          
                            </Badge>
                            </Link>             
                          </td>
                          <td>{contact.roomdate}</td>
                          </tr>
                      );
                    })} 
                   
                    
                             
                  </tbody>
                </Table>
                    
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default Profile;
