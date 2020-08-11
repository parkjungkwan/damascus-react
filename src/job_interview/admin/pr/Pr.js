import React, { Component } from "react";
import MaterialTable from "material-table";
import axios from "axios";

export default class Pr extends Component {
  state = {
    pr: [],
    columns: [
      //   { title: "No", field: "prSeq" },
      { title: "구직자ID", field: "itvId" },
      { title: "연락처", field: "phone" },
      { title: "제목", field: "title" },
      { title: "동영상", field: "content" },
      { title: "업로드일", field: "dateUpload" }
    ]
  };

  componentDidMount() {
    axios.get("/prs").then(res => {
      const pr = res.data;
      this.setState({ pr });
    });
  }

  delete(id) {
    axios.delete("/prs/" + id).then(res => {
      window.location.reload();
    });
  }
  goDetail = seq => {
    sessionStorage.prSeq=seq;
    window.location.replace("/PrAdminDetail");
  };

  render() {
    let state = this.state;
    let style = {
      margin: "100px 50px"
    };

    return (
      <div>
        <MaterialTable
          title="자기 PR 관리"
          columns={state.columns}          
          data={state.pr}
          style={style}
          onRowClick={(event, rowData) => {
            this.goDetail(rowData.prSeq);
          }}

          editable={{
            onRowDelete: oldData =>
              new Promise(resolve => {
                setTimeout(() => {
                  resolve();
                  this.delete(oldData.prSeq);
                }, 600);
              })
          }}
        />
      </div>
    );
  }
}
