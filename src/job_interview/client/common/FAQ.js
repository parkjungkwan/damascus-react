import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles(theme => ({
  root: {
    margin: '100px 100px',    
  },
  h1:{
    textAlign:'center',
    marginBottom:'50px'
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: 'bold',
      
  },
}));

export default function SimpleExpansionPanel() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
        <h1 className={classes.h1}>자주 묻는 질문</h1>
      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>JOB A LIVE는 어떤 사이트인가요?</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
            JOB A LIVE는 화상면접을 이용한 구인/구직사이트입니다. 
            블라인드 채용을 추구하여 구직자에게 최소한의 정보만 요청드리고 있습니다.
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>

      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography className={classes.heading}>면접 신청은 어떻게 하나요?</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
            'Notice'를 클릭하시면 구인공고를 확인하실 수 있습니다. 
            공고 확인 후 면접 신청기간에 맞추어 '지원하기'를 클릭해주세요. <br></br>
            지원자 접수 및 선정은 선착순으로 마감되며, 마이페이지의 '지원현황'에서 면접여부를 확인하실 수 있습니다.<br></br>
            면접여부 결정은 일주일정도 소요되며, 면접 신청기간은 공고별로 상이하니 공고내용을 참고해주시기 바랍니다.
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>

      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography className={classes.heading}>면접방에 어떻게 들어가나요?</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
            면접자로 결정이 되면 마이페이지:: 지원현황에서 해당 공고의 '접수상태'가 '승인'으로 전환됩니다.<br></br>
            면접시간 10분전부터 면접방에 입장이 가능하며 마이페이지:: 면접목록에서 해당 면접을 클릭하여 비밀번호를 꼭! 받아주세요. <br></br>
            비밀번호가 있어야만 면접방에 입장이 가능합니다. <br></br>
            면접방은 interview에서 해당하는 것을 찾아 비밀번호를 입력하시고 입장하시면 됩니다.
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>

      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography className={classes.heading}>화상면접을 위하여 특정하게 요구하는 사양이 있나요?</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
            특정하게 요구되는 화질이나 마이크 품질은 없으나 화상면접에서 사용할 카메라와 마이크는 필수입니다.<br></br>
            카메라와 마이크가 구비되지 않는다면 면접방에 입장할 수 없으니 유의하시기 바랍니다.
            노트북 이용을 권장드립니다.
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>

      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography className={classes.heading}>JOB A LIVE에 우리 회사 공고를 올리고 싶습니다.</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
            기업회원으로 가입하시고 아래 메일로 가입하신 아이디와 함께 문의 부탁드립니다.<br></br>
            help@jobalive.co.kr
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>

      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography className={classes.heading}>면접결과는 어떻게 알 수 있나요?</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
            면접자의 연락처 열람여부는 마이페이지:: 면접목록에서 확인가능하며 면접결과는 기업에서 개별적으로 연락드립니다.<br></br>
            JOB A LIVE에서는 면접결과를 알 수 없으니 양해부탁드립니다.
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
}