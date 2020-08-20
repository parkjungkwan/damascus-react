import React, {Component, createRef} from "react";
import axios from 'axios'
import ReactDatetime from "react-datetime";
import 'react-times/css/material/default.css';
import 'react-times/css/classic/default.css';

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

import SearchMap from './SearchMap'
import Header from "components/Headers/Header.js";



class CreateHost extends Component {
    
    constructor(props){
        super(props)
        this.state={
            calender:false,
            inputVal:'',
            pageIndex:0,
            query:['roomtitle','roomcategory','roomdate','roomdetail','roomcharge','roompwd','roomplace'],
            roomcategory:'',
            roomhostid:localStorage.getItem('loginId'),
            roomtitle:'',
            room:'',
            roomdate:'',
            roomdetail:'',
            roomplace:'',
            roomcharge:'',
            progressNum:0,
            address:'',
            roomlongitude:'',
            roomlatitude:'',
            roompwd:'',
            paneltyState:false               
        }
       
    }
    
      email = createRef();
      handleIncrease=()=>{

          this.setState({
            progressNum : this.state.progressNum + 1
          })
       
      }

    //   imageTag=()=>{
    //     if(this.state.roomphoto){
    //       return ( 
    //         <img className="rounded-circle" src={this.state.roomphoto} style={{display:"block",minWidth:"300px",maxWidth:"300px",maxHeight:"200px", minHeight:"200px", margin:"0 auto"}} ></img>
    //      )
    //     }
    //   }
  
    //   reciveEmit=(type)=>{
    //     console.log(type)
    //     this.setState({
    //         roomphoto:type
    //     })
    //     this.imageTag();
    //   }


      onChangeHandler=event=>{
         var fileContainer = document.getElementsByClassName("fileContainer")[0];
         var input = fileContainer.children.file;

         if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                document.getElementById("image_section").setAttribute("src",e.target.result)
            }
            reader.readAsDataURL(input.files[0]);
        }

      }
  

      Dialog = (e) => {
        switch(e) {
            case 0:
                return (
                <div>
                        <h1>타이틀</h1>
		                <h2>모임의 제목을 입력해 주세요</h2>
                       <input type="text" className="form-control" 
                                                        placeholder={this.state.query[this.state.pageIndex]} 
                                                        ref={ref => { this.mydiv = ref }}
                                                    required
                        />
                         <Button style={{marginTop:"15px"}} type="button" className="btn btn-success" onClick={this.clickHandler}>Success</Button>
                </div>
                    );
            case 1:
                return (
                    <div>
                            <h1>카테고리</h1>
                            <h2>모임의 카테고리를 입력해 주세요</h2>
                            <input type="text" className="form-control" 
                                                        placeholder={this.state.query[this.state.pageIndex]} 
                                                        ref={ref => { this.mydiv = ref }}
                                                    />
                            <Button style={{marginTop:"15px"}} type="button" className="btn btn-success" onClick={this.clickHandler}>Success</Button> 
                    </div>
                        );
            case 2:
                return (
                    <div>

                            <h1>날짜</h1>
                            <h2>Set Group's timly room Date and time. </h2>
                            <FormGroup>
                                <InputGroup className="input-group-alternative">
                                <InputGroupAddon addonType="prepend">
                                
                                <InputGroupText >
                                    <i className="ni ni-calendar-grid-58" />
                                </InputGroupText>
                                </InputGroupAddon>
                            <ReactDatetime
                            inputProps={{
                                placeholder: "Date Picker Here"
                            }}

                            ref={ref=>{this.datepicker=ref}}
                            onChange={e=>{
                                    if(!this.state.calender){
                                      
                                        document.getElementsByClassName("rdtTimeToggle")[0].click()
                                        this.setState({
                                            calender:!this.state.calender,
                                            roomdate:e._d
                                        })
                                    }else{
                                 
                                        var that = this;
                                        
                                        document.getElementsByClassName("rdtSwitch")[0].addEventListener("click",()=>{
                                            that.setState({
                                                calender:!this.state.calender,
                                                roomdate:e._d
                                            })
                                        })
                                    }

                                }
                            }
                            onBlur={e=>{

                                this.setState({
                                    calender:!this.state.calender,
                                    roomdate:e._d
                                })

                              
                            }}
                            timeFormat={true}
                            />
                        </InputGroup>

                        </FormGroup>

                        <input type="text" className="form-control" 
                                                    placeholder={this.state.query[this.state.pageIndex]} 
                                                    style={{display:"none"}}
                                                    ref={ref => { this.mydiv = ref }}
                                                    />
                            <Button style={{marginTop:"15px"}} type="button" className="btn btn-success" onClick={this.clickHandler}>Success</Button>



                    </div>
                
                        );

            case 3:
                return (
                    <div>
                            <h1>모임설명</h1>
                            <h2>모임에 대한 상세내용을 입력해 주세요</h2>
                            <input type="text" className="form-control" 
                                                    placeholder={this.state.query[this.state.pageIndex]} 
                                                    ref={ref => { this.mydiv = ref }}
                                                    />
                            <Button style={{marginTop:"15px"}} type="button" className="btn btn-success" onClick={this.clickHandler}>Success</Button>
                    </div>
                    
                        );    
        
            case 4:
                return (
                    <div>
                            <h1>벌금</h1>
                            <span style={{color:"red", fontSize:"12px"}}>* 숫자로 입력해주세요</span>
                            <input type="text" className="form-control" 
                                                         placeholder={this.state.query[this.state.pageIndex]} 
                                                         ref={ref => { this.mydiv = ref }}
                                                         onChange={this.paneltyCharge}
                                                    />

                                                {this.paneltyBtn()}
                             
                    </div>
                        ); 
            case 5:
                return (
                    <div>
                            <h1>방비번</h1>
                            <input type="text" className="form-control" 
                                                        placeholder={this.state.query[this.state.pageIndex]} 
                                                        ref={ref => { this.mydiv = ref }}
                                                    />
                            <Button style={{marginTop:"15px"}} type="button" className="btn btn-success" onClick={this.clickHandler}>Success</Button>
                    </div>
                        );             
            case 6:
                return (
                    <div>
                            <h1>장소</h1>
                            <h2>Group's meet locally and in person. We’ll connect you with people who live in and around your area.</h2>
                            <SearchMap 
                            height="500px"
                            emit={
                                this.reciveEmit
                                }
                                ></SearchMap>
                            <Button style={{marginTop:"15px"}} type="button" className="btn btn-success" onClick={this.clickHandler}>Success</Button>
                    </div>
                        );
            default :
                return ( 
                    <div></div>
                )
                        
        }
    };

    paneltyBtn=()=>{
      
            if (this.state.paneltyState) {
              return (
                <Button style={{marginTop:"15px"}} type="button" 
                className="btn btn-success" 
                onClick={this.clickHandler}
                
                >Success</Button>
              )
            } 
            return (

                 <Button style={{marginTop:"15px"}} type="button" 
                 className="btn btn-success"
                 disabled 
                 onClick={this.clickHandler}
                 
                 >Success</Button>
        
            )
         

    }
    paneltyCharge=(e)=>{
      
        if(e.target.value.match(/[^0-9]/)) {
            alert("문자가 섞여있습니다") 
        }else{
            this.setState({
                paneltyState:true
            })
        }
    }
    clickHandler=(e)=>{
        e.preventDefault();
        this.handleIncrease()
        if(this.state.pageIndex<this.state.query.length-1){
           
            this.setState({
                pageIndex:this.state.pageIndex+1,
                [this.state.query[this.state.pageIndex]]:this.mydiv.value,
                roomdate:this.state.roomdate,
                inputVal:"",
            })
            this.mydiv.value="";
        }else{
               
                if(this.state.pageIndex===this.state.query.length-1){
                    this.axiosRequest();
                }
        }
      }

   

        axiosRequest=()=>{
          
            const headers = {
             'Content-Type': 'application/json;charset=utf-8',
             'Access-Control-Allow-Origin':'*'
             }
           
             console.log(JSON.stringify(this.state))

             axios.post("room/create",
                 JSON.stringify(this.state),
                {headers: headers})
                .then(res=>{
                

                    if(res.data.status === "00") {
                        alert('방이 생성되었습니다.')
                        this.props.history.push("/admin/roomdetail/"+res.data.roomno)
                    }else{
                        alert(res.data.msg )
                        this.props.history.push("/admin/user-profile")

                    }
                 })
                .catch(e=>{
                    alert('방만들기 실패')
                })
             }
      

        reciveEmit=(chilstate)=>{
        
            this.setState({
                roomplace:chilstate.address,
                roomlongitude:chilstate.roomlongitude,
                roomlatitude:chilstate.roomlatitude
            })
    
        }


        render() {
            console.clear()
        return (
            <>
            <Header/>
            {/* Page content */}
            <Container className=" mt--7" fluid>
                {/* Table */}
                <Row>
                    <Col lg="12" md="12">
                    <Card className=" shadow">
                        <CardHeader className=" bg-transparent">
                            <div className="progress-wrapper">
                                <div className="progress-info">
                                    <div className="progress-label">
                                    <span>Make Host Progress</span>
                                    </div>
                                    <div className="progress-percentage">
                                    </div>
                                </div>
                                <div className="progress">
                                    <div className="progress-bar bg-primary" role="progressbar"  aria-valuenow={(100/this.state.query.length)*this.state.pageIndex} aria-valuemin="0" aria-valuemax="100" style={{
                                    background:"#fd5f00",
                                    width:(100/this.state.query.length)*this.state.pageIndex+"%"}}/>
                                </div>
                            </div>
                        </CardHeader>
                                <CardBody>
                              
                                    <form className="subscribe-form" onSubmit={(e)=>{e.preventDefault()}}>
                                    {this.Dialog(this.state.progressNum)}
                                       
                                    </form>
                                </CardBody>
                        </Card>
                    </Col>
                </Row>  
                </Container>    
            </>
        )
    }
}

export default CreateHost;
