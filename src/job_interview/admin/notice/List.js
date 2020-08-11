import React from 'react';
import MaterialTable from 'material-table';
import axios from 'axios'



export default class NoticeList extends React.Component{    

    constructor(props){
        super(props)        

    this.state={
        notices: [],
        columns: [
            { title: '접수상태', field: 'state'}, 
            { title: 'noticeseq', field: 'noticeSeq'}, 
            { title: '공고명', field: 'title' },            
            { title: '기업명', field: 'corName' },      
            { title: '모집부문', field: 'area'},
            { title: '요구경력', field: 'career'},
            { title: '접수일', field: 'startDate', type: 'numeric' },      
            { title: '접수시각', field: 'startTime', type: 'numeric'},                     
            ],
     
            
    }
}

    componentDidMount(){
        axios.get('/notices')
        .then(res=>{
            const notices = res.data;
            this.setState({notices});
        })
    }
    upload=(e)=>{
        window.location = '/NoticeUpload';

    }
    delete(id){       
        axios.delete('/notices/' + id)
        .then(res => {
            window.location.reload();
        })
    }
    goDetail=(seq)=>{   
    sessionStorage.noticeadminSeq=seq;    
    window.location = '/noticeDetail/'+sessionStorage.noticeadminSeq; 
    } 
     
   
       
    render(){        
        let state = this.state;
        let style = {
            margin:"100px 50px",
            marginBottom:"0"
        }
       
        return(
            <React.Fragment>
            <div>
                <MaterialTable title="공고 관리" 
                columns={state.columns} 
                data={state.notices}                                
                style={style}
                actions={[
                    {
                      icon: 'add',
                      tooltip: '공고 업로드',
                      isFreeAction: true,
                      onClick: (event) => this.upload()
                    }
                  ]}
                onRowClick={(event, rowData)=> {                   
                    this.goDetail(rowData.noticeSeq);                  
                  }}
                editable={{                   
                    onRowDelete: oldData =>
                        new Promise(resolve => {
                            setTimeout(() => {
                                resolve();
                                this.delete(oldData.noticeSeq);                                
                            }, 600);
                        }),
                 
                }}
                
                />                 
            </div>

            </React.Fragment>
        )
    }
}
