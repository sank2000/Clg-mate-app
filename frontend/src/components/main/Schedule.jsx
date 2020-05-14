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
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import { time, table } from "../../constants/Table";

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

export default function BottomAppBar() {
  const [per, setPer] = useState([
    {
      id: 1,
      primary: "No schedule",
      secondary: "for this time "
    },
    {
      id: 2,
      primary: "No schedule",
      secondary: "for this time "
    },
    {
      id: 3,
      primary: "No schedule",
      secondary: "for this time"
    }
  ]);
  var today = new Date();
  let tym = Number(today.getHours() + "." + today.getMinutes());

  function find(value, ind) {
    if (tym < 9 || tym > 17) return;
    if (tym >= value.start && tym <= value.end) {
      setCrtPeriod(ind);
      return;
    }
  }

  function setCrtPeriod(ind) {
    if (ind === 7) {
      setPer([
        {
          id: 1,
          primary: table[today.getDay() - 1][time[ind].per],
          secondary: time[ind].start + " -- " + time[ind].end
        },
        {
          id: 2,
          primary: "No schedule",
          secondary: "for this time "
        },
        {
          id: 3,
          primary: "No schedule",
          secondary: "for this time"
        }
      ]);
    } else if (ind === 6) {
      setPer([
        {
          id: 1,
          primary: table[today.getDay() - 1][time[ind].per],
          secondary: time[ind].start + " -- " + time[ind].end
        },
        {
          id: 2,
          primary: table[today.getDay() - 1][time[ind].per + 1],
          secondary: time[ind + 1].start + " -- " + time[ind + 1].end
        },
        {
          id: 3,
          primary: "No schedule",
          secondary: "for this time"
        }
      ]);
    } else {
      setPer([
        {
          id: 1,
          primary: table[today.getDay() - 1][time[ind].per],
          secondary: time[ind].start + " -- " + time[ind].end
        },
        {
          id: 2,
          primary: table[today.getDay() - 1][time[ind].per + 1],
          secondary: time[ind + 1].start + " -- " + time[ind + 1].end
        },
        {
          id: 3,
          primary: table[today.getDay() - 1][time[ind].per + 2],
          secondary: time[ind + 2].start + " -- " + time[ind + 2].end
        }
      ]);
    }
  }

  useEffect(() => {
    time.forEach(find);
  }, []);

  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <Paper square className={classes.paper}>
        <Typography className={classes.text} variant="h5" gutterBottom>
          Schedule
        </Typography>
        <List className={classes.list}>
          {per.map(({ id, primary, secondary, person }) => (
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
              <ListItem button>
                <ListItemAvatar>
                  <AccessTimeIcon />
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
