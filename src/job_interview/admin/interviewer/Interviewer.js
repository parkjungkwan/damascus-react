import React, { Component } from "react";
import MaterialTable from "material-table";
import axios from "axios";

export default class Interviewer extends Component {
  state = {
    interviewers: [],
    columns: [
      { title: "구직자ID", field: "itvId" },
      { title: "구직자명", field: "name" },
      { title: "생년월일", field: "birth" },
      { title: "전화번호", field: "phone" },
      { title: "이메일", field: "email" },
      { title: "희망산업/직군", field: "area" },
      { title: "희망근무지역", field: "location" },
      { title: "가입일", field: "dateJoin" }
    ]
  };

  componentDidMount() {
    axios.get("/interviewers").then(res => {
      const interviewers = res.data;
      this.setState({ interviewers });
    });
  }

  delete(id) {
    axios.delete("/interviewers/" + id).then(res => {
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
          title="개인회원 관리"
          columns={state.columns}
          data={state.interviewers}
          style={style}
          editable={{
            onRowDelete: oldData =>
              new Promise(resolve => {
                setTimeout(() => {
                  resolve();
                  this.delete(oldData.itvSeq);
                }, 600);
              })
          }}
        />
      </div>
    );
  }
}
