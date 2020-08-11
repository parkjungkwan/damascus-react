import React, { Component } from "react";
import MaterialTable from "material-table";
import axios from "axios";

export default class corporations extends Component {
  state = {
    corporations: [],
    columns: [
      { title: "기업id", field: "corId" },
      { title: "기업명", field: "name" },
      { title: "사업자등록번호", field: "corRegNo" },
      { title: "산업/직군", field: "area" },
      { title: "인사담당자명", field: "pmName" },
      { title: "전화번호", field: "pmPhone" },
      { title: "회사위치", field: "city" },
      { title: "가입일", field: "dateJoin" }
    ]
  };

  componentDidMount() {
    axios.get(`/corporations`).then(res => {
      const corporations = res.data;
      this.setState({ corporations });
    });
  }

  delete(seq) {
    axios.delete("/corporations/" + seq).then(res => {
      window.location.reload();
    });
  }

  render() {
    let state = this.state;
    let style = {
      margin: "100px 50px"
    };
    return (
      <div>
        <MaterialTable
          title="기업회원 관리"
          columns={state.columns}
          data={state.corporations}
          style={style}
          editable={{
            onRowDelete: oldData =>
              new Promise(resolve => {
                setTimeout(() => {
                  resolve();
                  this.delete(oldData.corSeq);
                }, 600);
              })
          }}
        />
      </div>
    );
  }
}
