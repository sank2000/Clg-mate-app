import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import { Table, Container } from "react-bootstrap";
import IconButton from "@material-ui/core/IconButton";

import { time, table } from "../../constants/Table";
import Schedule from "./Schedule2";
import { Typography } from "@material-ui/core";

const avatarImageStyle = {
  width: 40,
  height: 40
};

function tab(ind, day) {
  return (
    <tr key={ind}>
      <td> {time[ind].start}</td>
      <td> {table[day][ind]} </td>
      <td> {time[ind].end} </td>
    </tr>
  );
}

function Timetable(props) {
  return (
    <Container style={{ marginTop: "25px" }} >
      <Table striped bordered hover size="sm" style={{ backgroundColor: '#fff', textAlign: "center" }}   >
        <thead>
          <tr>
            <th><Typography variant="h6" component="span">START</Typography></th>
            <th><Typography variant="h6" component="span">SUBJECT</Typography></th>
            <th><Typography variant="h6" component="span">END</Typography></th>
          </tr>
        </thead>
        <tbody>
          {
            time.map((data, ind) => {
              return tab(ind, props.day);
            })
          }
        </tbody>
      </Table>
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

  function DayLabel(props) {
    return (
      <div>
        <IconButton style={{ outline: "none" }} onClick={() => setActiveStep(props.day)}>
          <Avatar style={
            getDay() === props.day ?
              Object.assign({}, avatarImageStyle, todayStyle) :
              activeStep === props.day ? Object.assign({}, avatarImageStyle, selectedStyle) :
                Object.assign({}, avatarImageStyle, defaultStyle)
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
      <Container style={{ position: "relative" }}>
        <hr style={{
          border: "0.5px solid #303030",
          position: "absolute",
          width: "80%",
          left: "10%",
          top: "20%"
        }} />
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
      <Timetable day={activeStep} />
    </>
  );
}
