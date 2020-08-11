import React, {Component} from 'react';
import './Upload.css'
import axios from 'axios'
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

export default class PRtest2 extends Component {
    constructor(props) {
        super(props);
          this.state = {
            phone:'',
            title:'',
            content:'',
            area:'',
            tagLocation:'',
            tagAttribute:'',
            tagCareer:'',
            name:'',
            prLocation:'',
            itvSeq:'',           
            email: '',
            selectedFile: null,    
            url:''       
          }
       
      }
    handleChange=(e)=>{
        this.setState({[e.target.name]: e.target.value})
       /*  console.log(e) */
      }
  
    changeTextData = (text) => {
        this.setState({content: text})
        /* console.log(text);    */  
      }
    
    handleSubmit = async(event) =>{
  
        /*  const data = new FormData() 
         data.append('file', this.state.selectedFile)  
        
        await axios.post("http://localhost:8000/upload",data,{})
         .then(res => {
             console.log(res.statusText);  
             console.log("filename:"+res.data.filename)  
             sessionStorage.url=res.data.filename            
             this.setState({url:res.data.filename})            
             alert("url2: "+this.state.url)
         }).catch(e => {});      
       */
         const prs = {
          phone:this.state.phone,
          title:event.target.title.value,
          content:this.state.content,
          area:event.target.area.value,
          tagLocation:event.target.tagLocation.value,
          tagAttribute:event.target.tagAttribute.value,
          tagCareer:event.target.tagCareer.value,
          name:this.state.name,
          prLocation:event.target.prLocation.value,
          itvSeq:sessionStorage.authSeq,
          url: this.state.url,
          email: event.target.email.value      
         };
         
          axios.post("/prs/upload", prs,{})
         .then(res=>{  
          alert("업로드 완료: "+this.state.title) 
           window.location.replace("/pr");
       }).catch(e => {});

      }   

    onChangeHandler=event=>{     
        console.log(event.target.files[0]);
        this.setState({
            selectedFile: event.target.files[0],
            loaded: 0,
          });    
}
   onClickHandler = () => {      
        const data = new FormData() 
        data.append('file', this.state.selectedFile)      
   /*      console.log(this.state.selectedFile.type); */     

       axios.post("http://localhost:8000/upload",data,{})
        .then(res => {
          /*   console.log(res.statusText);           
            console.log(res.data.filename);  */
           /*  sessionStorage.url = res.data.filename */
            this.setState({url:res.data.filename})
           alert("동영상 업로드")
        }).catch(e => {});  
}

componentWillMount=()=>{
    const seq = sessionStorage.authSeq;
    axios.get(`/interviewers/pr/${seq}`)
        .then(res=>{
           this.setState(res.data)          
        })
        .catch(e=>{                   
        })
}
    render(){
        let style = {
            marginTop:"100px",                   
            marginBottom:"100px",                   
        }        
        let btn = {   
          margin:"auto",     
          padding:"10px"      
        }
        let margin={
          margin:"30px"
        }
        let margin2={
          margin:"40px"
        }
        let margin3={
          margin:"50px"
        }
        let btn_up={
          marginLeft:"80%"
        }
    return (        
        <React.Fragment>
         <form onSubmit={this.handleSubmit}>
         <Container  style={style} maxWidth="md" >
         <Typography variant="h6" gutterBottom>
             PR동영상 업로드
            </Typography>
            <Grid container spacing={10}><p style={margin3}></p></Grid>
            <Grid className="offset-md-3 col-md-6">               
                    <div className="form-group files">
                        <label>** PR 동영상을 첨부 후 동영상 업로드버튼을 꼭 클릭해주세요  </label>
                        <input type="file" name="file" onChange={this.onChangeHandler}/>
                     </div>
                     <Button  color="primary" variant="contained" type="button" style={btn_up}  onClick={this.onClickHandler}>동영상 업로드(*필수)</Button>
                </Grid>
                <Grid container spacing={10}><p style={margin2}></p></Grid>
           <Grid container spacing={3}>
              <Grid item xs={12} >
                <TextField            
                  id="title"
                  name="title"
                  label="제목"
                  fullWidth
                  autoComplete="title"
                  onChange={this.handleChange}
                />
                </Grid>
              <Grid item xs={12} sm={4}>
                <TextField            
                  id="name"
                  name="name"
                  label="이름(변경불가)"
                  fullWidth
                  autoComplete="name"
                  value={this.state.name}                  
                />
              </Grid> 
              <Grid item xs={12} sm={4}>
                <TextField            
                  id="phone"
                  name="phone"
                  label="핸드폰(변경불가)"
                  fullWidth
                  autoComplete="phone"
                  value={this.state.phone}                 
                />
              </Grid> 
              <Grid item xs={12} sm={4}>
                <TextField            
                  id="email"
                  name="email"
                  label="이메일"
                  fullWidth
                  autoComplete="email"
                  value={this.state.email}  
                  onChange={this.handleChange}               
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField            
                  id="area"
                  name="area"
                  label="희망직무"
                  fullWidth
                  autoComplete="area"
                  onChange={this.handleChange}
                />
              </Grid> 
              <Grid item xs={12} sm={6}>
                <TextField            
                  id="prLocation"
                  name="pr_location"
                  label="희망지역"
                  fullWidth
                  autoComplete="prLocation"
                  onChange={this.handleChange}
                />
              </Grid>  
              <Grid item xs={12}>                             
              <CKEditor
                    id="content"                    
                    editor={ ClassicEditor }
                    data="<p>자기소개를 간략하게 적어주세요.<p>"
                    onInit={ editor => {                        
                        console.log( 'Editor is ready to use!', editor );
                    } }
                    onChange={ ( event, editor ) => {
                        const data = editor.getData();
                      /*   console.log( { event, editor, data } ); */
                        this.changeTextData(data)
                    } }
                />
              </Grid> 
              <Grid item xs={12} sm={4}>
                <TextField            
                  id="tagLocation"
                  name="tag_Location"
                  label="#위치 태그 ex)서울"
                  fullWidth
                  autoComplete="tag_Location"
                  onChange={this.handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField            
                  id="tagAttribute"
                  name="tag_attribute"
                  label="#특성 태그 ex)성실한"
                  fullWidth
                  autoComplete="tag_attribute"
                  onChange={this.handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField            
                  id="tagCareer"
                  name="tag_career"
                  label="#요구경력 태그 ex)신입"
                  fullWidth
                  autoComplete="tag_career"
                  onChange={this.handleChange}
                />
              </Grid>    
            <Grid container><p style={margin}></p></Grid>
          <Grid container spacing={3}>
            <Button color="primary" size="large"  variant="contained" style={btn} type="submit">게시물 업로드</Button>   </Grid>
             </Grid>
             <Grid container><p style={margin}></p></Grid>
        </Container>
        </form>
  </React.Fragment>
    );
};
}
