import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import { time, table } from "../../constants/Table";
import Avatar from "@material-ui/core/Avatar";
import NavigationBar from '../navigation/AppBar'
var today = new Date();

const useStyles = makeStyles(theme => ({
  text: {
    padding: theme.spacing(2, 2, 0)
  },
  list: {
    marginBottom: theme.spacing(2)
  },
  subheader: {
    backgroundColor: theme.palette.background.paper
  },
  grow: {
    flexGrow: 1
  }
}));

export default function Schedule() {
  const [per, setPer] = useState([
    {
      id: 1,
      primary: "No schedule",
      secondary: "for this time ",
      per: 0
    },
    {
      id: 2,
      primary: table[0][0],
      secondary: time[0].start + " -- " + time[0].end,
      per: time[0].per
    },
    {
      id: 3,
      primary: table[0][1],
      secondary: time[1].start + " -- " + time[1].end,
      per: time[1].per
    }
  ]);
  let tym = Number(today.getHours() + "." + today.getMinutes());

  function find(value, ind) {
    if (today.getDay() === 0 || today.getDay() === 6) {
      return;
    } else if (tym < 9) {
      setPer([
        {
          id: 1,
          primary: "No schedule",
          secondary: "for this time ",
          per: 0
        },
        {
          id: 2,
          primary: table[today.getDay() - 1][0],
          secondary: time[0].start + " -- " + time[0].end,
          per: time[0].per
        },
        {
          id: 3,
          primary: table[today.getDay() - 1][1],
          secondary: time[1].start + " -- " + time[1].end,
          per: time[1].per
        }
      ]);
      return;
    } else if (tym > 16.3) {
      if (today.getDay() === 5) {
        return;
      }
      setPer([
        {
          id: 1,
          primary: "No schedule",
          secondary: "for this time ",
          per: 0
        },
        {
          id: 2,
          primary: table[today.getDay()][0],
          secondary: time[0].start + " -- " + time[0].end,
          per: time[0].per
        },
        {
          id: 3,
          primary: table[today.getDay()][1],
          secondary: time[1].start + " -- " + time[1].end,
          per: time[1].per
        }
      ]);
      return;
    }
    if (tym >= value.start && tym <= value.end) {
      setCrtPeriod(ind);
      return;
    }
  }

  function setCrtPeriod(ind) {
    if (ind === 7 && today.getDay() === 5) {
      setPer([
        {
          id: 1,
          primary: table[today.getDay() - 1][ind],
          secondary: time[ind].start + " -- " + time[ind].end,
          per: time[ind].per
        },
        {
          id: 2,
          primary: "No schedule",
          secondary: "for this time ",
          per: 0
        },
        {
          id: 3,
          primary: table[0][0],
          secondary: time[0].start + " -- " + time[0].end,
          per: time[0].per
        }
      ]);
    } else if (ind === 7) {
      setPer([
        {
          id: 1,
          primary: table[today.getDay() - 1][ind],
          secondary: time[ind].start + " -- " + time[ind].end,
          per: time[ind].per
        },
        {
          id: 2,
          primary: "No schedule",
          secondary: "for this time ",
          per: 0
        },
        {
          id: 3,
          primary: table[today.getDay()][0],
          secondary: time[0].start + " -- " + time[0].end,
          per: time[0].per
        }
      ]);
    } else if (ind === 6) {
      setPer([
        {
          id: 1,
          primary: table[today.getDay() - 1][ind],
          secondary: time[ind].start + " -- " + time[ind].end,
          per: time[ind].per
        },
        {
          id: 2,
          primary: table[today.getDay() - 1][ind + 1],
          secondary: time[ind + 1].start + " -- " + time[ind + 1].end,
          per: time[ind].per + 1
        },
        {
          id: 3,
          primary: "No schedule",
          secondary: "for this time",
          per: 0
        }
      ]);
    } else {
      setPer([
        {
          id: 1,
          primary: table[today.getDay() - 1][ind],
          secondary: time[ind].start + " -- " + time[ind].end,
          per: time[ind].per
        },
        {
          id: 2,
          primary: table[today.getDay() - 1][ind + 1],
          secondary: time[ind + 1].start + " -- " + time[ind + 1].end,
          per: time[ind].per + 1
        },
        {
          id: 3,
          primary: table[today.getDay() - 1][ind + 2],
          secondary: time[ind + 2].start + " -- " + time[ind + 2].end,
          per: time[ind].per + 2
        }
      ]);
    }
  }

  useEffect(() => {
    time.forEach(find);
    // eslint-disable-next-line
  }, []);

  const classes = useStyles();

  return (
    <React.Fragment>
      <NavigationBar title="Schedule" />
      <CssBaseline />
      <Paper square className={classes.paper}>
        <List className={classes.list}>
          {per.map(({ id, primary, secondary, per }) => (
            <React.Fragment key={id}>
              {id === 1 && (
                <ListSubheader className={classes.subheader}>Now</ListSubheader>
              )}
              {id === 2 && (
                <ListSubheader className={classes.subheader}>
                  Next
                </ListSubheader>
              )}
              {id === 3 && (
                <ListSubheader className={classes.subheader}>
                  Later
                </ListSubheader>
              )}
              <ListItem>
                <ListItemAvatar>
                  <Avatar>{per}</Avatar>
                </ListItemAvatar>
                <ListItemText primary={primary} secondary={secondary} />
              </ListItem>
            </React.Fragment>
          ))}
        </List>
      </Paper>
    </React.Fragment>
  );
}
