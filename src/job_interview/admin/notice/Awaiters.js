import React from 'react'
import axios from 'axios'
import MaterialTable from 'material-table';
import update from 'react-addons-update'

class Awaiters extends React.Component{
    constructor(){
        super();
        this.state={
            appcolumns: [
                { title: '이름', field: 'name'},
                { title: '생년월일', field: 'birth' },
                { title: '연락처', field: 'phone' },
                { title: '이메일', field: 'email'},
                { title: '희망직무', field: 'area'},
                { title: '희망지역', field: 'location'},
                { title: '지원상태', field: 'appState'},
            ],
            applicants:[]
        };
    }

    componentDidMount=()=>{
        axios.get(`/applicants/${this.props.noticeSeq}`)
            .then(res =>{
                this.setState({applicants: res.data})
            })
            .catch(e=>{
            })   
    }

    changeAppState=(e, rowData)=>{
        const appState = rowData.appState==='승인'? '대기':'승인'
        const data = {
            applicantSeq: rowData.applicantSeq,
            appState: appState,
        }
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'JWT fefege..'
        }
        axios.put(`/applicants`,JSON.stringify(data),{headers:headers})
            .then(res=>{
            })
            .catch(e=>{
            })
        this.setState({
            applicants: update(this.state.applicants,{
                [e.currentTarget.rowIndex-1]:{
                appState: {$set: appState}
                }
            })
        })
    }
            

    render(){
        return (
            <MaterialTable title="지원자 관리" 
                columns={this.state.appcolumns}
                data={this.state.applicants}
                onRowClick={this.changeAppState}
            />
        )
    }
}

export default Awaiters