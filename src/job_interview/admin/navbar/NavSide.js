import React from 'react'

import { makeStyles, List, ListItem, ListItemText, ListItemIcon } from "@material-ui/core";
import BusinessIcon from "@material-ui/icons/Business";
import PersonIcon from "@material-ui/icons/Person";
import VoiceChatIcon from "@material-ui/icons/VoiceChat"; //ALIVE
import PanToolIcon from "@material-ui/icons/PanTool"; //PR
import NotificationsActiveIcon from "@material-ui/icons/NotificationsActive"; //공고
import HomeIcon from "@material-ui/icons/Home"; 


const useStyles = makeStyles(theme => ({
    list_item: {
        paddingTop: 20,
        paddingBottom: 20
    }
}));

const NavSide = () =>{
    const classes = useStyles();
    return (
        <List>
          {[ "PR", "Alive", "Corporation", "Interviewer", "Notice"].map(
            (text, index) => (
              <ListItem
                key={index}
                button
                component="a"
                href={'/' +text + "Admin"}
                className={classes.list_item}
              >
                {
                  <ListItemIcon>
                    {index === 1 ? (
                      <PanToolIcon />
                    ) : index === 2 ? (
                      <VoiceChatIcon />
                    ) : index === 3 ? (
                      <BusinessIcon />
                    ) : index === 4 ? (
                      <PersonIcon />
                    ) : (
                      <NotificationsActiveIcon />
                    )}
                  </ListItemIcon>
                }
                <ListItemText primary={text} />
              </ListItem>
            )
          )}
        </List>
    )
}

export default NavSide