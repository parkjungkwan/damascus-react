import React, { Component } from "react";
import {
  ResponsiveContext,
  Box,
  Button,
  Heading,
  Image
} from "grommet";
import commonChallengePhoto from '../assets/commonChallenge.jpg';
import axios from "axios";
import {Link} from "react-router-dom";

class MyChallengeList extends Component {
  constructor(props) {
    super(props);
    this.state= {
      myChallenges: [],
      myChallengeId:'',
      exerciseId:''
    }
  }

  componentDidMount(){
    let memberId = sessionStorage.getItem("memberId")
    const { myChallengeId, exerciseId } = this.props.match.params;
    axios
      .get(`http://52.79.235.166/myChallenges/findbymemberid/${memberId}`)
      .then(res => {
        const myChallenges = res.data
        this.setState({
          myChallenges,
          myChallengeId,
          exerciseId
        })
      })
      .catch( e =>{
        console.log('접근 실패')
      }
      )
  }

  render() {
    return (
      <ResponsiveContext.Consumer>
      {size => (
        <Box direction="row" align="center" justify="center">
         <Box flex align="center" justify="center" overflow={{ vertical: 'hidden' }}>
          {/* wrap */}
          {/* 헤딩 */}
          <Heading margin={{ top: "10%", bottom: "5%" }} >챌린지 목록</Heading>
          <Box wrap direction="row-responsive" align="center" gap="medium" justify="center">
           {this.state.myChallenges.map(myChallenge =>{
             return(
              <Box key={myChallenge.myChallengeId} direction="row-responsive" justify="center" align="center" margin={{bottom:"10%"}}>
                <Box direction="row" align="center" border="all" round="small" >  
                  <Box height="small" width="small" margin="small">
                    <Image src={commonChallengePhoto} alt={commonChallengePhoto} fit="cover" round="small"/>
                  </Box>
                  <Box direction="column" width="medium">
                    <Box>
                      <Link to = {{
                        pathname : `/MyChallengeExerciseList/${myChallenge.myChallengeId}/${myChallenge.myChallengeName}`}}>
                        <Button><Heading level="3">{myChallenge.myChallengeName}</Heading></Button>
                      </Link>
                    </Box>
                  </Box>
                </Box>
                </Box> 
             )
           })}
           </Box>
          </Box>
         </Box>
      )}
    </ResponsiveContext.Consumer>
    );
  }
}
export default MyChallengeList;
