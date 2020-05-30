import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";

import MenuIcon from "@material-ui/icons/Menu";
import HomeWorkOutlinedIcon from "@material-ui/icons/HomeWorkOutlined";
import TodayOutlinedIcon from "@material-ui/icons/TodayOutlined";
import AlarmOffOutlinedIcon from '@material-ui/icons/AlarmOffOutlined';
import LibraryBooksOutlinedIcon from '@material-ui/icons/LibraryBooksOutlined';
import AssignmentOutlinedIcon from '@material-ui/icons/AssignmentOutlined';
import FeedbackOutlinedIcon from "@material-ui/icons/FeedbackOutlined";
import ContactSupportOutlinedIcon from "@material-ui/icons/ContactSupportOutlined";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";

const useStyles = makeStyles({
  list: {
    width: 250
  },
  appBanner: { padding: '15px', color: '#1e88e5', fontWeight: 'bold', opacity: '1' },
  fullList: {
    width: "auto"
  },
  selected: {
    background: 'rgba(0, 134, 244, 0.1)', borderTopRightRadius: '150px', borderBottomRightRadius: '150px', color: "#1976d2"
  },
  selectedIcon: {
    color: "#1976d2"
  }
});

export default function HamburgerMenu(props) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    left: false
  });

  const toggleDrawer = (anchor, open) => event => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ state, left: open });
  };

  const list = anchor => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom"
      })}
      style={{ textDecoration: "none" }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <ListItem className={classes.appBanner}>
          <ListItemIcon>
            <img src="images/logo.png" width="45" alt="logo" />
          </ListItemIcon>
          <ListItemText >
            <Typography variant="h5">Collegemate</Typography>
          </ListItemText>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem onClick={() => window.open('/', '_self')} button className={props.selected === "Collegemate" ? classes.selected : null} >
          <ListItemIcon>
            <HomeWorkOutlinedIcon className={(props.selected === "Collegemate") ? classes.selectedIcon : null} />
          </ListItemIcon>
          <ListItemText primary={"Home"} />
        </ListItem>
        <ListItem onClick={() => window.open('/timetable', '_self')} button className={props.selected === "Time Table" ? classes.selected : null}>
          <ListItemIcon>
            <TodayOutlinedIcon className={(props.selected === "Time Table") ? classes.selectedIcon : null} />
          </ListItemIcon>
          <ListItemText primary={"Time Table"} />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem onClick={() => window.open('/fullpost', '_self')} button className={props.selected === "All Posts" ? classes.selected : null}>
          <ListItemIcon>
            <AssignmentOutlinedIcon className={(props.selected === "All Posts") ? classes.selectedIcon : null} />
          </ListItemIcon>
          <ListItemText primary="All Posts" />
        </ListItem>
        <ListItem onClick={() => window.open('/fullmaterial', '_self')} button className={props.selected === "All materials" ? classes.selected : null}>
          <ListItemIcon>
            <LibraryBooksOutlinedIcon className={(props.selected === "All materials") ? classes.selectedIcon : null} />
          </ListItemIcon>
          <ListItemText primary="All Materials" />
        </ListItem>
        <ListItem onClick={() => window.open('/expiredpost', '_self')} button className={props.selected === "Expired posts" ? classes.selected : null}>
          <ListItemIcon>
            <AlarmOffOutlinedIcon className={(props.selected === "Expired posts") ? classes.selectedIcon : null} />
          </ListItemIcon>
          <ListItemText primary="Expired Posts" />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem onClick={() => window.open('/feedback', '_self')} button className={props.selected === "Feedback" ? classes.selected : null}>
          <ListItemIcon>
            <FeedbackOutlinedIcon className={(props.selected === "Feedback") ? classes.selectedIcon : null} />
          </ListItemIcon>
          <ListItemText primary="Send Feedback" />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem onClick={() => window.open('/help', '_self')} button className={props.selected === "Help" ? classes.selected : null}>
          <ListItemIcon>
            <ContactSupportOutlinedIcon className={(props.selected === "Help") ? classes.selectedIcon : null} />
          </ListItemIcon>
          <ListItemText primary="Help" />
        </ListItem>
        <ListItem onClick={() => window.open('/about', '_self')} button className={props.selected === "About" ? classes.selected : null}>
          <ListItemIcon>
            <InfoOutlinedIcon className={(props.selected === "About") ? classes.selectedIcon : null} />
          </ListItemIcon>
          <ListItemText primary="About" />
        </ListItem>
      </List>
    </div >
  );

  return (
    <div>
      <React.Fragment key={"left"}>
        <IconButton
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="open drawer"
          onClick={toggleDrawer("left", true)}
        >
          <MenuIcon />
        </IconButton>
        <SwipeableDrawer
          anchor={"left"}
          open={state["left"]}
          onClose={toggleDrawer("left", false)}
          onOpen={toggleDrawer("left", true)}
        >
          {list("left")}
        </SwipeableDrawer>
      </React.Fragment>
    </div>
  );
}
