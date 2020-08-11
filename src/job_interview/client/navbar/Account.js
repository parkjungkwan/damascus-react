import React from 'react'
import { makeStyles, List, IconButton, ListItem, 
    ListItemText, MenuItem, Link, Menu, Collapse } 
    from "@material-ui/core";

import AccountCircle from '@material-ui/icons/AccountCircle';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles(theme => ({
  nested: {
      paddingLeft: theme.spacing(4),
  }
}));

const Account = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [subOnOff, setSubOnOff] = React.useState(false);
  const openEl = Boolean(anchorEl);

  function handleMenu(event) {
      setAnchorEl(event.currentTarget);
  }
    
  function handleClose() {
      setAnchorEl(null);
  }

  function handleSubOnOff(){
      setSubOnOff(!subOnOff)
  }

  return(
    <div>
      <IconButton
          aria-label="Account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleMenu}
          color="inherit"
      >
        <AccountCircle />
      </IconButton>
      <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={openEl}
          onClose={handleClose}
      >
        <MenuItem onClick={handleSubOnOff}>My account{subOnOff ? <ExpandLess /> : <ExpandMore />}</MenuItem>
        {sessionStorage.getItem('authType')==="1" ? 
        <Collapse in={subOnOff} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <Link href="/interviewerNotice" underline="none" color="inherit">
              <ListItem button className={classes.nested}>
                <ListItemText primary="지원현황"/>
              </ListItem></Link>
            <Link href="/interviewerAlive" underline="none" color="inherit">
              <ListItem button className={classes.nested}>
                <ListItemText primary="면접목록"/>
              </ListItem></Link>
            <Link href="/interviewerPr" underline="none" color="inherit">
              <ListItem button className={classes.nested}>
                <ListItemText primary="PR관리"/>
              </ListItem></Link>
            <Link href="/interviewerModify" underline="none" color="inherit">
              <ListItem button className={classes.nested}>
                <ListItemText primary="회원정보수정"/>
              </ListItem></Link>
          </List>
        </Collapse>
        :
        <Collapse in={subOnOff} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <Link href="/corporationNotice" underline="none" color="inherit">
              <ListItem button className={classes.nested}>
                <ListItemText primary="공고목록"/>
              </ListItem></Link>
            <Link href="/corporationPr" underline="none" color="inherit">
              <ListItem button className={classes.nested}>
                <ListItemText primary="PR스크랩"/>
              </ListItem></Link>
            <Link href="/corporationModify" underline="none" color="inherit">
              <ListItem button className={classes.nested}>
                <ListItemText primary="회원정보수정"/>
              </ListItem></Link>
          </List>
        </Collapse>
        }
      </Menu>
    </div>
  )
}

export default Account