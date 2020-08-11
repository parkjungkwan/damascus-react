import React from 'react';
import MaterialTable from 'material-table';
import { withStyles } from "@material-ui/core/styles";
import axios from 'axios'
import Modal from '@material-ui/core/Modal';

import ApplicantModal from './ApplicantModal'

const top = 50 + Math.round(Math.random() * 20) - 10;
const left = 50 + Math.round(Math.random() * 20) - 10;

const useStyles = theme => ({
    
    tableWrapper: {
        margin:"100px 50px",
        marginBottom:"0"
    },
    modal: {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
        position: 'absolute',
        width: 600,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 4),
        outline: 'none',
    },
});

class CorNotice extends React.Component {
    constructor(){
        super()
        this.state = {
            columns: [
                { title: '공고명', field: 'title' },
                { title: '접수일', field: 'noticeStartDate', type: 'numeric' },
                { title: '접수시작시각', field: 'noticeStartTime', type: 'numeric' },
                { title: '면접일', field: 'aliveStartDate', type: 'numeric' },
                { title: '면접시작시각', field: 'aliveStartTime', type: 'numeric' },
                { title: '진행상태', field: 'state'},
                { title: '면접방', emptyValue: '이동'},
                { field: 'list2', emptyValue: '면접자목록' },
                { title: '면접자목록SEQ', field: 'liveSeq', hidden: true },
            ],
            data: [],
            open: false,
            liveSeq: ''
        }
    }
    
    componentDidMount=()=>{
        const corSeq = sessionStorage.getItem('authSeq')
        
        axios.get('/alives')
        .then(res=>{
            axios.get(`/notices/noticeLiveList/${corSeq}`)
            .then(res=>{
                this.setState({data: res.data})
            })
            .catch(e=>{
                alert('데이터를 불러오지 못했습니다.\n관리자에게 문의해 주세요')
            })
        })
    }

    handleClick=(e, rowData)=>{
        if(e.target.innerHTML==='면접자목록'){
            this.setState({liveSeq: rowData.liveSeq})
            this.setState({open: true})
        } else if(e.target.innerHTML==='이동') {
            if (rowData.state === '진행 예정') {
                alert('면접 진행 예정입니다.')
              } else if(rowData.state === '진행중') {
                if (rowData.url === null) {
                  alert('채팅방이 존재하지 않습니다.');
                } else {
                  let pwd = rowData.url.split('=');
                  alert('비밀번호: ' + pwd[1]);
                  let inputPwd = prompt("비밀번호를 입력하세요.");
              
                  if(inputPwd === pwd[1]) {
                    alert('화상면접은 aws문제로 사용이 불가합니다.');
                  } else {
                    if(inputPwd === '' || inputPwd === null) {
                      alert('비밀번호를 입력해주세요!');
                    } else {
                      alert('비밀번호가 다릅니다. 다시 입력해주세요.');
                    }
                  }
              
                }
              } else if(rowData.state === '종료'){
                alert('종료된 면접입니다.');
              }
        } else{
            sessionStorage.noticeSeq=rowData.noticeSeq;
            window.open("/NoticeDetail");
        }
    }

    handleClose = () => {
        this.setState({open:false})
    };

    render(){
        const { classes } = this.props
        
        return (
            <div className={classes.tableWrapper} >
            <MaterialTable               
                title="공고목록"
                columns={this.state.columns}
                data={this.state.data}
                onRowClick={this.handleClick}
            />
            <Modal
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            open={this.state.open}
            onClose={this.handleClose}
            >
                <div className={classes.modal}>
                    <ApplicantModal liveSeq={this.state.liveSeq} />
                </div>
            </Modal>
            </div>
        );
    }
}

export default withStyles(useStyles)(CorNotice)