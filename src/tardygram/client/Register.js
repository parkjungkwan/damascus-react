 
import React from "react";
import axios from "axios";
import ReactDatetime from "react-datetime";

// reactstrap components
import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
  Label,
  } from "reactstrap";

class Register extends React.Component {
  state = {
    birthday:"",
    gender:"man",
    nameEntered: '',
    isNameValid: false,
    emailEntered: '',
    isEmailValid: false,
    phoneNumberEntered: '',
    isPhoneNumberValid: false,

  };
  validateName = nameEntered => {
    if (nameEntered.length > 1) {
      this.setState({
        isNameValid: true,
        nameEntered
      });
    } else {
      this.setState({
        isNameValid: false,
        nameEntered
      });
    }
  };
  isEnteredNameValid = () => {
    const { nameEntered, isNameValid } = this.state;
  
    if (nameEntered) return isNameValid;
  };
  
  inputClassNameHelper = boolean => {
    switch (boolean) {
      case true:
        return 'is-valid';
      case false:
        return 'is-invalid';
      default:
        return '';
    }
  };
  validateEmail = emailEntered => {
    const emailRegExp = /^[\w-]+(\.[\w-]+)*@([a-z0-9-]+(\.[a-z0-9-]+)*?\.[a-z]{2,6}|(\d{1,3}\.){3}\d{1,3})(:\d{4})?$/;
  
    if (emailEntered.match(emailRegExp)) {
      this.setState({
        isEmailValid: true,
        emailEntered
      });
    } else {
 
      this.setState({
        isEmailValid: false,
        emailEntered
      });

    }
  };
  isEnteredEmailValid = () => {
    const { emailEntered, isEmailValid } = this.state;
  
    if (emailEntered) return isEmailValid;
  };
  validatePhoneNumber = uphone => {
    const phoneNumberRegExp = /^\d{3}-\d{3,4}-\d{4}$/;
  
    if (uphone.match(phoneNumberRegExp)) {
      this.setState({
        isPhoneNumberValid: true,
        phoneNumberEntered: uphone
      });
    } else {
      this.setState({
        isPhoneNumberValid: false,
        phoneNumberEntered: uphone
      });

    }
  };

  isEnteredPhoneNumberValid = () => {
    const { phoneNumberEntered, isPhoneNumberValid } = this.state;
  
    if (phoneNumberEntered) return isPhoneNumberValid;
  };
  isEveryFieldValid = () => {
    const { isNameValid, isEmailValid, isPhoneNumberValid } = this.state;
    return isNameValid && isEmailValid && isPhoneNumberValid;
  }
  renderSubmitBtn = () => {
    if (this.isEveryFieldValid()) {
      return (
        <div className="text-center">
                  <Button className="mt-4" color="primary" type="button" onClick={this.submitHandler}>
                    Create account
                  </Button>
                </div>
      )
    } 
    return (
      <div className="text-center">
          <Button className="mt-4 btn-block" color="primary" type="button" disabled>
            Create account
          </Button>
      </div>

    )
  }




  submitHandler=()=>{
      
      var data ={
          memberid: document.getElementById("uid").value,
          pwd: document.getElementById("upwd").value,
          name: document.getElementById("uname").value,
          birthday: this.state.birthday,
          gender: this.state.gender,
          phone: document.getElementById("uphone").value,
          email: document.getElementById("uemail").value
      }
    
      let headers= {
        "Content-type":"application/json",
        'Access-Control-Allow-Origin':'*'
      }

      axios.post("/member/join" ,data ,{headers})
      .then(res=>{
        alert('회원가입 성공')
        this.props.history.push("/")
      }).catch(e=>{
        alert('회원가입 실패')
      })

  

  }
  birthdaySet(value){
   
      this.setState({
        birthday: value
      })
  }
  genderSet(value){
 
    this.setState({
      gender: value
    })
  }

  render() {
    return (
      <>
        <Col lg="6" md="8">
          <Card className="bg-secondary shadow border-0">
       
            
            {/* <CardHeader className="bg-transparent pb-5">
              <div className="text-muted text-center mt-2 mb-4">
                <small>Sign up with</small>
              </div>
              <div className="text-center">
                <Button
                  className="btn-neutral btn-icon mr-4"
                  color="default"
                  href="#pablo"
                  onClick={e => e.preventDefault()}
                >
                  <span className="btn-inner--icon">
                    <img
                      alt="..."
                      src={require("assets/img/icons/common/github.svg")}
                    />
                  </span>
                  <span className="btn-inner--text">Github</span>
                </Button>
                <Button
                  className="btn-neutral btn-icon"
                  color="default"
                  href="#pablo"
                  onClick={e => e.preventDefault()}
                >
                  <span className="btn-inner--icon">
                    <img
                      alt="..."
                      src={require("assets/img/icons/common/google.svg")}
                    />
                  </span>
                  <span className="btn-inner--text">Google</span>
                </Button>
              </div>
            </CardHeader> */}
            <CardBody className="px-lg-5 py-lg-5">
              <div className="text-center text-muted mb-4">
                <small> sign up with credentials</small>
              </div>
              <Form role="form">
                
                <FormGroup>
                  <InputGroup className="Validatior input-group-alternative mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-hat-3" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input 
                      type="text" 
                      className={` ${this.inputClassNameHelper(this.isEnteredNameValid())}`}
                      id="uid"
                      placeholder="Id" 
                      onChange={e => this.validateName(e.target.value)}
                      required
                      />
                   
                  </InputGroup>
                </FormGroup>

                <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Pwd" type="password" id="upwd"/>
                  </InputGroup>
                </FormGroup>

                <FormGroup>
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                      <i className="ni ni-badge" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Name" type="name" id="uname" />
                  </InputGroup>
                </FormGroup>

                <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                            <InputGroup className="input-group-alternative">
                                <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                    <i className="ni ni-calendar-grid-58" />
                                </InputGroupText>
                                </InputGroupAddon>
                                <ReactDatetime id="ubirthday"
                                inputProps={{
                                    placeholder: "Birth Picker Here"
                                }}
                                onChange={e=> this.birthdaySet(e._d)}
                                // onChange={(e)=>{
                                //   console.log(e)
                                //   console.log(e._d)
                                // }}
                                timeFormat={false}
                                />
                            </InputGroup>
                            {/* <TimePickerWrapper timeMode="12"/> */}
                    {/* <Input placeholder="Birthday" type="text" id="ubirthday"/> */}
                  </InputGroup>
                </FormGroup>

                <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-user-run" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <div className="custom-control custom-radio mr-3"  style={{marginTop:"11px", marginBottom:"11px"}}>
                      <Input
                        className="custom-control-input"
                        id="Man"
                        name="gender"
                        type="radio"
                        value='Man'
                        onChange={e=> this.genderSet(e.target.value)}
                        // onChange={(e) => this.setState({ selected: e.target.value})}
                      />
                      <Label className="custom-control-label" htmlFor="Man">
                        Man
                      </Label>
                   </div>
                    <div className="custom-control custom-radio "  style={{marginTop:"11px", marginBottom:"11px"}}>
                      <Input
                        className="custom-control-input"
                        id="Woman"
                        name="gender"
                        type="radio"
                        value='Woman'
                        // checked={this.state.selected === 'woman'} 
                        onChange={e=> this.genderSet(e.target.value)}

                        // onChange={(e) => this.setState({ selected: e.target.value })}
                      />
                      <Label className="custom-control-label" htmlFor="Woman">
                      Woman
                      </Label>
                    </div>

                    {/* <Input placeholder="Gender" type="radio" id="ugender"/> */}
                  </InputGroup>
                </FormGroup>

                <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-mobile-button" />
                      </InputGroupText>
                    </InputGroupAddon>
                    {/* <Input placeholder="Phone" type="number" id="uphone"/> */}
                    <Input 
                      type="text"
                      className={`${this.inputClassNameHelper(this.isEnteredPhoneNumberValid())}`}
                      id="uphone"
                      placeholder="010-1234-1234"
                      onChange={e => this.validatePhoneNumber(e.target.value)}
                      required
                      />
                  </InputGroup>
                </FormGroup>

                <FormGroup>
                  <InputGroup className="input-group-alternative mb-3 ">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                      <i className="ni ni-email-83" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input 
                    type="email"
                    className={`${this.inputClassNameHelper(this.isEnteredEmailValid())}`}
                    id="uemail"
                    aria-describedby="emailHelp"
                    placeholder="abc@gmail.com"
                    onChange={e => this.validateEmail(e.target.value)}
                    required
                    />
                    
                  </InputGroup>
                </FormGroup>

                <div className="text-muted font-italic">
                 
                </div>
                <Row className="my-4">
                  <Col xs="12">
                    {/* <div className="custom-control custom-control-alternative custom-checkbox">
                      <input
                        className="custom-control-input"
                        id="customCheckRegister"
                        type="checkbox"
                        required
                      />
                      <label
                        className="custom-control-label"
                        htmlFor="customCheckRegister"
                      >
                        <span className="text-muted">
                          I agree with the{" "}
                          <a href="#pablo" onClick={e => e.preventDefault()}>
                            Privacy Policy
                          </a>
                        </span>
                      </label>
                    </div> */}
                  </Col>
                </Row>
                
                {this.renderSubmitBtn()}

              </Form>
            </CardBody>
          </Card>
        </Col>
      </>
    );
  }
}

export default Register;
