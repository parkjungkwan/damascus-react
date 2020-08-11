import React, {Component} from 'react'
import background from '../video/background_video.mp4'
import { textAlign } from '@material-ui/system';

  
export default class Home extends Component {
    
    render () {
        let body={
            margin : '0',
            padding : '0',            
            zIndex: '1000',
           /*  position: 'fixed', */
            width: '100%', height: '100%', 
            left: '0', top: '0',   
           /*   overflowX: 'hidden',   */
        }
        
        let video={     
            position: 'fixed',       
            width:'100%',
           /*  height: '100%', */            
            background: 'rgba(0, 0, 0, 0.8)' ,
            /* height: '100vh',
            backgroundSize: 'cover' */
        }
        let cover={
            position: 'fixed',
            bottom: '40%',
            height: '30%',
            width: '35%',           
            marginLeft: '33%',            
            background: 'rgba(5, 5, 25, 0.7)',
            
            
        }
      let font={
        color:'white',
        textAlign: 'Center',
        fontSize: '70px',
        lineHeight:'0.3em'
      }
      let font2={
        color:'white',
        textAlign: 'Center',
        fontSize: '50px',
        lineHeight:'0.3em'
      }
        return (
            <div style={body}>
            
            <video  style={video} autoPlay loop muted>
                <source src={background} type='video/mp4' />
            </video>
            <div style={cover}>
                 <h1 style={font}>GET A JOB </h1> 
                 <p style={font2}>with</p>                
                <h1 style={font}>JOB A LIVE</h1>
                </div> 
            </div>
        )
    }
}

