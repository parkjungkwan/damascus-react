import React from 'react';
import MaterialTable from 'material-table';
import { withStyles } from "@material-ui/core/styles";
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

class AwaiterModal extends React.Component {
  constructor(props){
      super(props)
      this.state={
          columns: [
            { title: '면접자ID', field: 'itvId' },
            { title: '면접자명', field: 'name' },
            { title: '연락처', field: 'phone' },
            { title: '이메일', field: 'email' },
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

  render(){
      const { classes } = this.props
      return (
          <div className={classes.tableWrapper} >
              <MaterialTable
                  className={classes.table}
                  title="면접자 목록"
                  columns={this.state.columns}
                  data={this.state.data}
              />
          </div>
      );
  }
}

export default withStyles(useStyles)(AwaiterModal);