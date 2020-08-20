 
import React from "react";
import { Link } from "react-router-dom";
import axios from "axios"
// reactstrap components
import {
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Navbar,
  Nav,
  Container,
  Media
} from "reactstrap";


class AdminNavbar extends React.Component {

  constructor(props){
    super(props)
    this.state={
      profileimage:null
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
        })
  }
  
  
  render() {
    return (
      <>
      
        <Navbar className="navbar-top navbar-dark" expand="md" id="navbar-main">
          <Container fluid>
            <Link
              className="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block"
              to="/"
            >
              {this.props.brandText}
            </Link>
           
            <Nav className="align-items-center d-none d-md-flex" navbar>
              <UncontrolledDropdown nav>
                <DropdownToggle className="pr-0" nav>
                  <Media className="align-items-center">
                    <span className="avatar avatar-sm rounded-circle">
                      <img
                        alt="..."
                        src={this.state.profileimage}
                      />
                      
                    </span>
                    <Media className="ml-2 d-none d-lg-block">
                      <span className="mb-0 text-sm font-weight-bold">
                        {localStorage.getItem("loginId")}
                      </span>
                    </Media>
                  </Media>
                </DropdownToggle>
                <DropdownMenu className="dropdown-menu-arrow" right>
                  <DropdownItem className="noti-title" header tag="div">
                    <h6 className="text-overflow m-0">Welcome!</h6>
                  </DropdownItem>
                  <DropdownItem to="/admin/user-profile" tag={Link}>
                    <i className="ni ni-single-02" />
                    <span>My profile</span>
                  </DropdownItem>

                  <DropdownItem to="/admin/makeroom" tag={Link}>
                    <i className="ni ni-calendar-grid-58" />
                    <span>Make Room</span>
                  </DropdownItem>
                  <DropdownItem to="/admin/roomlist" tag={Link}>
                    <i className="ni ni-support-16" />
                    <span>Room List</span>
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem onClick={e => {
                    e.preventDefault();
                    localStorage.removeItem("loginId")
                    this.props.history.push("/auth/login")
                    clearInterval(window.timer)
                  }}>
                    <i className="ni ni-user-run" />
                    <span>Logout</span>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Container>
        </Navbar>
      </>
    );
  }
}

export default AdminNavbar;
