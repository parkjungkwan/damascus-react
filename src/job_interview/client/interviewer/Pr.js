import React from 'react';
import PropTypes from 'prop-types';
import MaterialTable from 'material-table';
import { withStyles } from "@material-ui/core/styles";
import axios from 'axios'

const useStyles = theme => ({
    table: {
        margin:"100px 50px",
        marginBottom:"0"
    }
}); 

class Pr extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            prs: [],
            columns: [
                { title: "제목", field: "title" },
                { title: "스크랩 수", field: "count"},      
                { title: "업로드일자", field: "dateUpload"},
            ],
            itvSeq: sessionStorage.getItem('authSeq')
        };
    }

    componentDidMount(){
        const itvId = sessionStorage.getItem('authSeq')
        axios.get(`/prs/${itvId}`)
        .then(res=>{
            const prs = res.data;
            this.setState({prs});
        })
        .catch(e=>{
            alert('데이터를 불러오지 못했습니다.')
        })
    }

    delete(id) {
        axios.delete("/prs/" + id).then(res => {
          alert('삭제완료')
          window.location.reload();
        });
      }

    goDetail = prSeq => {  
        sessionStorage.authSeq = this.state.itvSeq         
        sessionStorage.prSeq=prSeq;
        window.open("/prDetail");
      };

    render(){
        let state = this.state;
        const { classes } = this.props
        return (
            <div className={classes.table} >
            <MaterialTable
            title="자기 PR 목록"
            columns={state.columns}
            data={state.prs}
            editable={{
                onRowDelete: oldData =>
                new Promise(resolve => {
                    setTimeout(() => {
                    resolve();
                    this.delete(oldData.prSeq);
                    }, 600);
                }),
            }}
            onRowClick={(event, rowData) => {                   
                this.goDetail(rowData.prSeq);
              }}
            />
            </div>
        );
    }
}

Pr.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(useStyles)(Pr)