import React, {Component} from 'react';
import ImageUploader from 'react-images-upload';
// import {
//   Button
// } from "reactstrap";
import axios from "axios"
 
import './RoomUpload.scss'

class RoomUpload extends Component{
    // constructor(props) {
    //     super(props);
    //     this.state = { 
    //       pictures: [],
    //       file:null,
    //       roomImage:''
    //     };
    //   }
    constructor(props) {
      super(props);
      this.state = { pictures: [] };
    
      // this.onDrop = this.onDrop.bind(this);
  }
  componentDidMount(){

  }
  onChangeHandler=event=>{
   
    // this.setState({
    //   file : URL.createObjectURL (event[event.length-1])
    // })
    const data = new FormData()
 
    data.append('file', event[event.length-1])

    
 
    const headers ={
      "Content-Type":'multipart/form-data',
      'Access-Control-Allow-Origin':'*'
    }
   
    let roomno = this.props.keyparams 
    axios.post(`/room/upload/${roomno}`, data ,{headers})
 
      .then(res => {
    

        this.props.emit(res.data);
      }).catch(err =>{
     
      })
    
  }


    
    render(){
      
        return (
          <div className="RoomUpload">
       
            <ImageUploader className="form-control-alternative"  type="file"name="file" onChange={this.onChangeHandler}/>   
          
           </div>
        );
        

  }

}

export default RoomUpload;