import React, {Component} from "react";
import {Link} from 'react-router-dom'
import RoomList from './RoomList'
// import {
//     Button,
//     Card,
//     CardHeader,
//     CardBody,
//     FormGroup,
//     Form,
//     Input,
//     InputGroupAddon,
//     InputGroupText,
//     InputGroup,
//     Row,
//     Col
//   } from "reactstrap";
  
class DoneHost extends Component {
    render() {
        return (
            <div>		<h1>Congratulation! You can Check</h1>
            <Link to={{RoomList}}>Here</Link>
            </div>
        )
    }
}

export default DoneHost;