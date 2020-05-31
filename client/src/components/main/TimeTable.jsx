import React, { useState } from "react";

import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper";
import Container from '@material-ui/core/Container';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { withStyles, makeStyles } from '@material-ui/core/styles';

import { time, table } from "../../constants/Table";
import Schedule from "./Schedule";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles(theme => ({
  ava: {
    border: "0.5px solid #303030",
    position: "absolute",
    width: "80%",
    left: "10%",
    top: "20%"
  },
  ava2: {
    border: "0.5px solid white",
    position: "absolute",
    width: "80%",
    left: "10%",
    top: "20%",
  },
  avatarImage: {
    width: 40,
    height: 40,
    backgroundColor: theme.palette.background.paper
  }
}));

const avatarImageStyle = {
  width: 40,
  height: 40
};

function tab(ind, day) {
  return (
    <StyledTableRow key={ind}>
      <StyledTableCell align="center"> {time[ind].start}</StyledTableCell>
      <StyledTableCell align="center"> {table[day][ind]} </StyledTableCell>
      <StyledTableCell align="center"> {time[ind].end} </StyledTableCell>
    </StyledTableRow>
  );
}

function Timetable(props) {
  return (
    <Container maxWidth="xl" style={{ marginTop: "25px", marginBottom: "25px" }} >
      <TableContainer component={Paper}>
        <Table size="small" aria-label="a dense table">
          <TableHead>
            <StyledTableRow>
              <StyledTableCell align="center">START</StyledTableCell>
              <StyledTableCell align="center">SUBJECT</StyledTableCell>
              <StyledTableCell align="center">END</StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {
              time.map((data, ind) => {
                return tab(ind, props.day);
              })
            }
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

function getDay() {
  let d = new Date();
  return d.getDay() - 1;
}

const defaultStyle = {
  fontSize: "15px",
  border: "4px solid white",
  backgroundColor: "#757575",
};

const selectedStyle = {
  fontSize: "15px",
  border: "4px solid white",
  backgroundColor: "#2196f3",
};

const todayStyle = {
  fontSize: "15px",
  border: "4px solid white",
  backgroundColor: "#f50057",
};

const todayLabel = {
  display: "inline", color: "#fff",
  backgroundColor: "#f50057",
  padding: "3px 5px",
  borderRadius: '150px',
};

const selectedLabel = {
  display: "inline", color: "#fff",
  backgroundColor: "#2196f3",
  padding: "3px 5px",
  borderRadius: '150px'
};

export default function () {
  const [activeStep, setActiveStep] = useState(getDay());
  const classes = useStyles();

  function DayLabel(props) {
    return (
      <div>
        <IconButton style={{ outline: "none" }} onClick={() => setActiveStep(props.day)}>
          <Avatar className={classes.avatarImage} style={
            getDay() === props.day ?
              Object.assign({}, todayStyle) :
              activeStep === props.day ? Object.assign({}, selectedStyle) :
                Object.assign({}, defaultStyle)
          }>
            {props.ico}
          </Avatar>
        </IconButton> <br />
        <p style={
          getDay() === props.day ? todayLabel : activeStep === props.day ? selectedLabel : {
            display: "inline"
          }} >
          {props.title}
        </p>
      </div>
    );
  }

  return (
    <>
      <Schedule />
      <Container maxWidth="xl" style={{ position: "relative" }}>
        <hr className={window.localStorage.getItem("dark") === 'true' ? classes.ava2 : classes.ava} />
        <Grid container direction="row"
          justify="space-around"
          alignItems="center"
          style={{ textAlign: 'center' }}>
          <Grid item style={{ flexShrink: "3" }}    >
            <DayLabel ico={"M"} title={"Monday"} day={0} />
          </Grid>
          <Grid item>
            <DayLabel ico={"Tu"} title={"Tuesday"} day={1} />
          </Grid>
          <Grid item>
            <DayLabel ico={"W"} title={"Wednesday"} day={2}
            /> </Grid>
          <Grid item>
            <DayLabel ico={"Th"} title={"Thursday"} day={3} />
          </Grid>
          <Grid item>
            <DayLabel ico={"F"} title={"Friday"} day={4} />
          </Grid>
        </Grid>
      </Container>
      {activeStep === 5 || activeStep === -1 ? <Timetable day={0} /> : <Timetable day={activeStep} />}
    </>
  );
}
