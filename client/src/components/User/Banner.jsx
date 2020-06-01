import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";

import Edit from "./EditDetails";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2)
  },
  image: {
    [theme.breakpoints.down("xs")]: {
      width: "100%",
      height: "100%"
    },
    [theme.breakpoints.down("sm")]: {
      width: 300,
      height: 300
    },
    [theme.breakpoints.up("md")]: {
      width: 250,
      height: 250
    },
    [theme.breakpoints.up("lg")]: {
      width: 300,
      height: 300
    }
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%"
  }
}));

export default function UserBanner(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper square className={classes.paper}>
        <Grid container alignItems='center' spacing={2}
          justify="space-between">
          <Grid item>
            <div className={classes.image}>
              <Avatar
                alt={props.name}
                variant="rounded"
                src={props.avatar}
                style={Object.assign({}, { width: '100%', height: '100%' }, {
                  backgroundColor: "orange",
                  fontSize: "8rem"
                })}
              >
                {props.name[0]}
              </Avatar>
            </div>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="h4">
                  {props.name}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  {props.email} <br /> {props.classWithSection}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  ID: {props.id}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Type: {props.type}
                </Typography>
              </Grid>
            </Grid>
            <Grid item>
              <Edit />
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}
