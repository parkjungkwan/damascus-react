import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { grey } from '@material-ui/core/colors';

const useStyles = makeStyles(theme => ({
  footer: {
    position: "absolute",
    bottom: "0",
    width: "100%",
    padding: theme.spacing(0.2),
    backgroundColor: grey[200],
    textAlign: 'center',
  },
  p: {
    fontSize: '11px'
  },
}));

const Footer = () => {
  const classes = useStyles();

  return (
    
    <footer className={classes.footer}>
        <p className={classes.p}><b>(주) JOB A LIVE </b> 사업자등록번호: 111-22-34567</p>
        <p className={classes.p}>고객센터: 02-1234-5678 | 이메일: help@jobalive.co.kr | Fax: 02-5252-0808</p>
    </footer>
  );
}

export default Footer;