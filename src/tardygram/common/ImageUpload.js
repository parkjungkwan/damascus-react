import React, {Component} from 'react';
import ImageUploader from 'react-images-upload';
import axios from "axios"
class ImageUpload extends Component{
    constructor(props) {
        super(props);
        this.state = { 
          pictures: [],
          file:null 
        };
        // this.onDrop = this.onDrop.bind(this);
      }

    // onDrop(pictureFiles, pictureDataURLs) {
    // this.setState({
    //         pictures: this.state.pictures.concat(pictureFiles),
    //     });
    //     console.log("어떤파일 : " + this.state.pictures)
    //     //여기 axios
    // }
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

      let id = localStorage.getItem("loginId")
      axios.post(`member/upload/${id}`, data ,{ headers
        })
        .then(res => {
        
          this.props.emit(res.data);
        }).catch(err =>{
        
        })
      
    }

    render(){
        return (
          <>
              <ImageUploader className="form-control-alternative"  type="file"name="file" onChange={this.onChangeHandler}/>   
          </>
        );

  }

}

export default ImageUpload;