import React from "react";
import clsx from "clsx";
import { makeStyles, useTheme, Drawer, CssBaseline, AppBar, 
        List, Typography, Divider, IconButton, ListItem, 
        ListItemText, ListItemIcon, Button, Toolbar, Link } 
        from "@material-ui/core";
import {blue} from "@material-ui/core/colors";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

import VoiceChatIcon from "@material-ui/icons/VoiceChat"; /* ALIVE */
import PanToolIcon from "@material-ui/icons/PanTool"; /* PR */
import NotificationsActiveIcon from "@material-ui/icons/NotificationsActive"; /* 공고 */
import HomeIcon from "@material-ui/icons/Home"; /* Home */
import QuestionAnswerIcon from "@material-ui/icons/QuestionAnswer"; /* FAQ */

import Account from './Account'

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {   
    flexGrow: 1,
  },

  title: {
    flexGrow: 1,
  },

  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    backgroundColor: blue[800]
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  hide: {
    display: "none"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
    ...theme.mixins.toolbar,
    justifyContent: "flex-end"
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: -drawerWidth
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  list_item: {
    paddingTop: 20,
    paddingBottom: 20
  }
}));

const Navbar = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  function handleDrawerOpen() {
    setOpen(true);
  }

  function handleDrawerClose() {
    setOpen(false);
  }
  
  function handleLogout(){
    sessionStorage.removeItem('authSeq')
    sessionStorage.removeItem('authId')
    sessionStorage.removeItem('authType')
    //this.props.history.push('/')
    document.location.href = '/'
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="static"   //fixed에서 변경
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="Open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title} noWrap>
            <Link href="/home" underline="none" color="inherit">JOB A LIVE</Link>
          </Typography>
          {sessionStorage.getItem('authSeq') ? 
            <Button color="inherit" onClick={handleLogout}>Logout</Button>
            : <p><Button color="inherit" href="/login">Login</Button><Button color="inherit" href="/join">Join</Button></p>}
          {sessionStorage.getItem('authId') && (
            <Account></Account>
          )}
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          {["Home", "Notice", "Interview", "PR"].map((text, index) => (
            <ListItem button component="a" key={index} href={'/' + text} className={classes.list_item}>
                  <ListItemIcon>
                  {index === 0 ? <HomeIcon /> : index === 1 ? <NotificationsActiveIcon /> : index === 2 ? <VoiceChatIcon /> :  <PanToolIcon />}
                  </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {["FAQ"].map((text, index) => (
            <ListItem button component="a" key={index} href={'/' + text} className={classes.list_item}>
              <ListItemIcon>
              <QuestionAnswerIcon />
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
      </Drawer>
    </div>
  );
};

export default Navbar;
