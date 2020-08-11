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

class NoticeModal extends React.Component {
  constructor(props){
      super(props)
      this.state={
          columns: [
            { title: '기업번호', field: 'corSeq', cellStyle: {width: 140}},
            { title: '기업명', field: 'name', cellStyle: {width: 200}},
            { title: '위치', field: 'city', cellStyle: {width: 140}},      
          ],
          data: []
      }
  }

  componentDidMount(){
    axios.get('/corporations')
      .then(res=>{
        this.setState({data: res.data});
      })
      .catch(e=>{
        alert('데이터를 불러오지 못했습니다.')
      })
  }

  handleClick=(e, rowData)=>{
    this.props.callClose(rowData)
  }

  render(){
      const { classes } = this.props
      return (
          <div className={classes.tableWrapper} >
              <MaterialTable
                  className={classes.table}
                  title="기업목록"
                  columns={this.state.columns}
                  data={this.state.data}
                  onRowClick={this.handleClick}
              />
          </div>
      );
  }
}

export default withStyles(useStyles)(NoticeModal);