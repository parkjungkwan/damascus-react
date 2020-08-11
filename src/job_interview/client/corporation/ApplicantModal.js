import React from 'react';
import MaterialTable from 'material-table';
import { withStyles } from "@material-ui/core/styles";
import update from 'react-addons-update'
import axios from 'axios'

const useStyles = theme => ({
    table: {
        width: '100%',
        minWidth: 1500,
        margin: "100px 50px"
    },
    tableWrapper: {
        overflowX: 'auto',
    }
}); 

class ApplicantModal extends React.Component {
  constructor(props){
      super(props)
      this.state={
          columns: [
            { title: '면접자명', field: 'name' },
            { field: 'numOnOff', emptyValue: '연락처보기', cellStyle: {width: 250} },
            { title: '연락처', field: 'phone', hidden: true },
            { title: '면접자SEQ', field: 'itvSeq', hidden: true },
          ],
          data: []
      }
  }

  componentDidMount(){
    axios.get(`/awaiters/${this.props.liveSeq}`)
      .then(res=>{
        this.setState({data: res.data});
      })
      .catch(e=>{
        alert('데이터를 불러오지 못했습니다.\n관리자에게 문의해 주세요')
      })
  }

  handleClick=(e, rowData)=>{
    if(rowData.numOnOff==null){
      this.setState({
        data: update(this.state.data,{
          [e.currentTarget.rowIndex-1]:{
            numOnOff: {$set: rowData.phone}
          }
        })
      })
      const data = {
        liveSeq: this.props.liveSeq,
        itvSeq: rowData.itvSeq
      }
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'JWT fefege..'
      }
      axios.put(`/awaiters/lookphone`, JSON.stringify(data), {headers: headers})
        .then(res=>{
        })
        .catch(e=>{
          alert('서버연결에 실패하였습니다.\n관리자에게 문의해 주세요')
        })
    }else if(rowData.numOnOff!=null){
      this.setState({
        data: update(this.state.data,{
          [e.currentTarget.rowIndex-1]:{
            numOnOff: {$set: null}
          }
        })
      })
    }
  }

  render(){
      const { classes } = this.props
      return (
          <div className={classes.tableWrapper} >
              <MaterialTable
                  className={classes.table}
                  title="면접자 목록"
                  columns={this.state.columns}
                  data={this.state.data}
                  onRowClick={this.handleClick}
                  editable={{
                  }}
              />
          </div>
      );
  }
}

export default withStyles(useStyles)(ApplicantModal);