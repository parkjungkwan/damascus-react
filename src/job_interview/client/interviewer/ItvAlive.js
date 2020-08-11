import React from "react";
import MaterialTable from "material-table";

import axios from "axios";

export default class ItvAlive extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        { title: "회사명", field: "corName" },
        { title: "면접일", field: "startDate", type: "numeric" },
        { title: "면접시작시간", field: "startTime", type: "numeric" },
        { title: "진행 상태", field: "state" },
        { title: "면접결과", field: "result" }
      ],
      data: []
    };
  }

  componentDidMount() {
    const itvSeq = sessionStorage.getItem("authSeq");

    axios.get("/alives")
      .then(res => {
        axios.get(`/awaiters/aliveList/${itvSeq}`)
          .then(res => {
            this.setState({ data: res.data });
          })
          .catch(e => {
            alert("데이터를 불러오지 못했습니다.");
          });
    });
  }

  handleClick = (e, rowData) => {
    if (rowData.state === "진행 예정") {
      alert("면접 진행 예정입니다.");
    } else if (rowData.state === "진행중") {
      if (rowData.url === null) {
        alert("채팅방이 존재하지 않습니다.");
      } else {
        let pwd = rowData.url.split("=");
        alert("비밀번호: " + pwd[1]);
        let inputPwd = prompt("비밀번호를 입력하세요.");

        if (inputPwd === pwd[1]) {
          alert('화상면접은 aws문제로 사용이 불가합니다.')
        } else {
          if (inputPwd === "" || inputPwd === null) {
            alert("비밀번호를 입력해주세요!");
          } else {
            alert("비밀번호가 다릅니다. 다시 입력해주세요.");
          }
        }
      }
    } else if (rowData.state === "종료") {
      alert("종료된 면접입니다.");
    }
  };

  render() {
    let style = {
      margin: "100px 50px",
      marginBottom: "0"
    };
    return (
      <MaterialTable
        style={style}
        title="면접목록"
        columns={this.state.columns}
        data={this.state.data}
        onRowClick={this.handleClick}
      />
    );
  }
}
