import React, { Component } from "react";
import { ResponsiveContext, Box, FormField, Button, Image, Text, TextArea, Form, RadioButton, MaskedInput } from "grommet";
import axios from "axios";
import NullPhoto from "../assets/null_photo.png"

class MemberDetail extends Component {
  constructor(props) {
    super(props);
    this.state={
      memberName: '',
      memberPw: '',
      memberHeight: '',
      memberPhoto: '',
      memberWeight: '',
      memberText: '',
      memberType:'',
      typeText: '',
      member: [],
    }

    this.coachFormExists = this.coachFormExists.bind(this)
    this.whichComp = this.whichComp.bind(this)

  }

  componentDidMount () {
    let self = this;
    let memberId = sessionStorage.getItem('memberId')
    axios
      .get(`http://52.79.235.166/members/find/${memberId}`)
      .then(res =>{
          const oneMember = res.data
          self.setState({
            memberName: oneMember.memberName,
            memberPw: oneMember.memberPw,
            memberHeight: oneMember.memberHeight,
            memberPhoto: oneMember.memberPhoto,
            memberWeight: oneMember.memberWeight,
            memberText: oneMember.memberText,
            memberType: oneMember.memberType
          })
          switch(this.state.memberType) {
            case 2:
              this.setState({
                typeText: "코치회원"
              })
              break
            default:
              this.setState({
                typeText: "운동회원"
              })
              break
          }
      })
      .catch(e=>{
        alert('didmount axios 실패')
      })
  }

  //수정하기 위한 데이터 onChange
  updateOnChange = (e) => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  typeOnChange = (e) => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    })

    switch(e.target.value) {
      case '코치회원':
        this.setState({
          memberType: 2
        })
        break
      default:
        this.setState({
          memberType: 1
        })
        break
    }
  }

  // 사진 업로드
  changePhoto = (e) => {
    let self = this

    this.setState({newPhoto: e.target.files[0]})

    let data = new FormData()
    data.append("file", e.target.files[0])

    let fileReader = new FileReader()
    fileReader.readAsDataURL(e.target.files[0])
    fileReader.onload = function(e){
      e.preventDefault()
      const headers = { "Content-Type": "multipart/form-data" }
      axios
        .post("http://52.79.235.166/upload",data,{headers: headers})
        .then(res => {
          alert("사진이 업로드 되었습니다.")
          document.getElementById("memberPhoto").src = e.target.result
          self.setState({memberPhoto: res.data})
        })
        .catch(e => {alert("업로드 실패")})
    }
  }

  //수정 입력
  updateMyPage = (e) => {
    e.preventDefault();

   let memberId = sessionStorage.getItem("memberId")
   let memberEmail = sessionStorage.getItem("memberEmail")

   //비밀번호를 변경하려면 새로운 값 입력, 아무것도 입력하지 않았을 때에는 기존의 비밀번호를 입력.
   //입력한 비밀번호가 null 값일 때 --> 기존의 입력 값 입력
   
    let data= {
        memberPw:this.state.memberPw,
        memberName:this.state.memberName,
        memberHeight:this.state.memberHeight,
        memberWeight:this.state.memberWeight,
        memberPhoto:this.state.memberPhoto,
        memberText: this.state.memberText,
        memberType: this.state.memberType,
        memberEmail: memberEmail
      }

    let headers= {
      'Content-type' : 'application/json',
      // 'Authorization' : 'JWT fefege...'
      'Access-Control-Allow-Origin': '*'
    }

    axios
      .put(`http://52.79.235.166/members/update/${memberId}`,JSON.stringify(data),{headers: headers})
      .then(res => {
        alert('수정 완료')
        sessionStorage.setItem("memberType", data.memberType)
        
        window.location.assign('/')
      })
      .catch(e =>{
        alert('연결 실패')
      })
  }

  // 탈퇴
  deleteAccout = (e) => {
    e.preventDefault();
    let memberId = sessionStorage.getItem("memberId") 
    axios 
      .delete(`http://52.79.235.166/members/delete/${memberId}`)
      .then(res => {
        alert('삭제 성공')
        sessionStorage.clear();
        window.location.assign("/")
      })
      .catch(e => {
        alert('삭제 axios 실패')
      })
  }

  coachFormExists() {
    console.log('접근')
    let memberId = sessionStorage.getItem('memberId')
    axios.get(`http://52.79.235.166/coaches/exists/${memberId}`)
      .then(res => {
        console.log(res.data)
        this.whichComp(res.data)
      })
  }

  whichComp = (nextComp) => {
    console.log(nextComp)
    nextComp ? this.props.history.push('/CoachInForm') : this.props.history.push('/CoachInsertForm')
  }

  render() {
    let memberPhoto = this.state.memberPhoto === null || this.state.memberPhoto === ""
      ? NullPhoto : "/user-image/" + this.state.memberPhoto
    return (
        <ResponsiveContext.Consumer>
        {size => (
          <Box direction="row" align="center" justify="center">
            <Box  flex align="center"  justify="center" overflow={{ vertical: "hidden" }}  >
              {/* 프로필 전체 영역 */}
              <Box direction="row-responsive" margin="medium">
                {/* 사진, 상태메시지 */}
                  {/* 사진 */}
                <Box border pad="medium" width="30%">
                  {/* 클래스네임으로 정해줘서 css파일을 만들어서 div 속성으로 round처리 해야 이미지가 안깨진다. 백그라운드로 처리하면/ or css in js를 사용해서 스타일을 주거나 하면 된다.  */}
                  {/* 사진은 컨트롤러 따로 업로드 버튼은 따로두어서 input하게 해야한다. */}
                  {/* 사진 위치는 옆에 */}
                    <Image name="memberPhoto" src={memberPhoto} alt="memberPhoto" id="memberPhoto" value={this.state.memberPhoto}  
                      fit="contain"></Image>

                    <input id="uploadButton" type="file" accept="image/*" onChange={this.changePhoto}></input>
                </Box>
               {/* 회원가입 폼 */}
               <Box width="70%" align="center" margin="medium" justify="center">
                 {/* Form  */}
                 <Form onSubmit={this.updateMyPage}>
                  <Box direction="column" width="medium">
                    <Text margin="small">상태 메시지</Text>
                    <TextArea name="memberText" placeholder="상태 메세지" 
                      value={this.state.memberText} onChange={this.updateOnChange}></TextArea>
                  </Box>
                  <Box justify="center" width="medium">
                    <FormField type="memberName" name="memberName" label="이름" value={this.state.memberName} placeholder={this.state.memberName} onChange={this.updateOnChange}/>
                  </Box>
                  <Box justify="center" width="medium">
                    <FormField name="memberPw" label="비밀번호" type="password" value={this.state.memberPw} placeholder="비밀번호를 변경하려면 새로 입력해주세요" onChange={this.updateOnChange}/>
                  </Box>
                  <Box justify="center" width="medium">
                    <FormField name="memberHeight" label="신장" value={this.state.memberHeight} placeholder={this.state.memberHeight} onChange={this.updateOnChange}/>
                  </Box>
                  <Box justify="center" width="medium">
                    <FormField name="memberWeight" label="몸무게" value={this.state.memberWeight} placeholder={this.state.memberWeight} onChange={this.updateOnChange}></FormField>
                  </Box>
                  <Box justify="center" width="medium">
                  <Box direction="column">
                      <Text margin="small">회원유형</Text>
                      <MaskedInput name="typeText" label="Type" value={this.state.typeText} onChange={this.typeOnChange}
                        placeholder={this.state.typeText} 
                        required validate={{regexp: /^(...){4}$/, message: '"운동회원" 또는 "코치회원"으로 입력하세요'}}
                        mask={[{
                          length:[4],
                          options: ["운동회원", "코치회원"]
                        }]} />
                      </Box>
                  </Box>
              
                  <Box align="center" justify="center" direction="row" margin="medium" width="medium">
                    <Box margin={{ horizontal: "medium" }}>
                      <Button type="submit" label="취    소" href="/" />
                    </Box>
                    <Box margin={{ horizontal: "medium" }}>
                      <Button type="submit" label="변경완료" />
                    </Box>
                  </Box>
                  <Box align="center" justify="center" direction="row" margin="medium" width="medium">
                  <Box margin={{ horizontal: "medium" }}>
                  {(this.state.memberType === 2) && 
                      <Box margin={{ horizontal: "medium" }}>
                        <Button label="코치 회원 Page" primary onClick={this.coachFormExists} />
                      </Box>
                    }
                  </Box>
                  <Box margin={{ horizontal: "medium" }}>
                    <Button type="submit" label="탈 퇴" primary onClick={this.deleteAccout}/>
                    </Box>
                  </Box>
                </Form>
                </Box>
              {/* 프로필 전체 영역 / */}
              </Box>
            </Box>
          </Box>
        )}
      </ResponsiveContext.Consumer>
    );
  }
}
export default MemberDetail;
