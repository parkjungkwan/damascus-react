import React, { Component } from "react";
import MaterialTable from "material-table";
import { Modal, withStyles } from '@material-ui/core';
import axios from "axios";

import AwaiterModal from './AwaiterModal'

const top = 50 + Math.round(Math.random() * 20) - 10;
const left = 50 + Math.round(Math.random() * 20) - 10;

const useStyles = theme => ({
  tableWrapper: {
      margin:"100px 50px"
  },
  modal: {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
      position: 'absolute',
      width: 900,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 4),
      outline: 'none',
  }
});

class Alive extends Component {
  constructor(){
    super()
    this.state = {
      alives: [],
      columns: [
        { title: "기업명", field: "corName" },
        { title: "진행상태", field: "state" },
        { title: "시작일시", field: "startDate" },
        { title: "모집 직군", field: "area" },
        { title: "경력사항", field: "career" },
        { field: 'awaiterList', emptyValue: '면접자목록' },
      ],
      open: false,
      liveSeq: ''
    };
  }

  componentDidMount=()=>{
    axios.get("/alives")
    .then(res=>{
      const alives = res.data;
      this.setState({alives})
    })
  }

  handleClick=(e, rowData)=>{
    if(e.target.innerHTML==='면접자목록'){
      this.setState({liveSeq: rowData.liveSeq})
      this.setState({open: true})
    }
  }

  handleClose=()=>{
    this.setState({open:false})
  };

  del=(id)=>{
    axios.delete("/alives/" + id)
    .then(res => {
      window.location.reload();
    })
  }

  createAlive=()=>{
    alert('면접방 생성');
    window.location = '/AliveCreate';
  }

  render() {
    const { classes } = this.props
    return (
      <div className={classes.tableWrapper}>
        <MaterialTable
          title="면접 관리"
          columns={this.state.columns}
          data={this.state.alives}
          onRowClick={this.handleClick}
          actions={[{
              icon: 'add',
              tooltip: '면접방 생성',
              isFreeAction: true,
              onClick: (event) => this.createAlive()
          }]}
          editable={{
            onRowDelete: oldData =>
              new Promise(resolve => {
                setTimeout(() => {
                  resolve();
                  this.del(oldData.liveSeq);
                }, 600);
              })
          }}
        />
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.open}
          onClose={this.handleClose}
        >
          <div className={classes.modal}>
              <AwaiterModal liveSeq={this.state.liveSeq}/>
          </div>
        </Modal>
      </div>
    );
  }
}

export default withStyles(useStyles)(Alive)